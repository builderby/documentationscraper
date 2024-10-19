import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';
import { config } from '../config/config';
import sanitize from 'sanitize-filename';

export async function saveMarkdown(title: string, markdown: string, url: string): Promise<void> {
  try {
    // Parse the URL to extract hostname and path
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const urlPath = parsedUrl.pathname;

    // Create the folder path based on the URL structure
    const folderPath = path.join(
      config.outputDir,
      sanitize(hostname),
      ...urlPath.split('/').filter(Boolean).map(segment => sanitize(segment))
    );
    
    // Sanitize and truncate the title for use as a filename
    const safeTitle = sanitize(title).substring(0, 100);
    const fileName = `${safeTitle || 'Untitled'}.md`;
    const filePath = path.join(folderPath, fileName);

    // Ensure the folder exists and write the Markdown content
    await fs.ensureDir(folderPath);
    await fs.writeFile(filePath, markdown);
    console.log(`Saved: ${filePath}`);
  } catch (error) {
    console.error('Error saving markdown:', error);
    throw error;
  }
}

export async function generateTableOfContents(): Promise<void> {
  // Find all Markdown files in the output directory
  const files = await glob(`${config.outputDir}/**/*.md`);
  
  // Generate main table of contents
  const toc = files.map(file => {
    const relativePath = path.relative(config.outputDir, file);
    return `- [${path.basename(file, '.md')}](${relativePath})`;
  }).join('\n');

  // Group files by directory
  const filesByDir = files.reduce((acc, file) => {
    const dir = path.dirname(file);
    if (!acc[dir]) {
      acc[dir] = [];
    }
    acc[dir].push(file);
    return acc;
  }, {} as Record<string, string[]>);

  // Generate table of contents for each directory
  for (const [dir, dirFiles] of Object.entries(filesByDir)) {
    const dirToc = dirFiles.map(file => {
      const relativePath = path.relative(dir, file);
      return `- [${path.basename(file, '.md')}](${relativePath})`;
    }).join('\n');

    const tocPath = path.join(dir, 'table_of_contents.md');
    await fs.writeFile(tocPath, `# Table of Contents\n\n${dirToc}`);
    console.log(`Table of Contents generated: ${tocPath}`);
  }
}

// Function to get the current user agent from the config
export function getCurrentUserAgent(): string {
  return config.userAgent;
}
