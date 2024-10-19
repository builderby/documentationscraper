export interface ScraperStats {
  totalPages: number;
  totalLinks: number;
  totalImages: number;
  totalCodeBlocks: number;
  startTime: Date;
  endTime?: Date;
  elapsedTime?: string;
}

class StatsTracker {
  private stats: ScraperStats = {
    totalPages: 0,
    totalLinks: 0,
    totalImages: 0,
    totalCodeBlocks: 0,
    startTime: new Date(),
  };

  incrementPages() {
    this.stats.totalPages++;
  }

  incrementLinks(count: number) {
    this.stats.totalLinks += count;
  }

  incrementImages(count: number) {
    this.stats.totalImages += count;
  }

  incrementCodeBlocks(count: number) {
    this.stats.totalCodeBlocks += count;
  }

  finish() {
    this.stats.endTime = new Date();
    const elapsedMs = this.stats.endTime.getTime() - this.stats.startTime.getTime();
    this.stats.elapsedTime = this.formatElapsedTime(elapsedMs);
  }

  getStats(): ScraperStats {
    return { ...this.stats };
  }

  private formatElapsedTime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  }

  logStats() {
    console.log('Scraping completed! Here are the stats:');
    console.log(`Total pages scraped: ${this.stats.totalPages}`);
    console.log(`Total links found: ${this.stats.totalLinks}`);
    console.log(`Total images found: ${this.stats.totalImages}`);
    console.log(`Total code blocks found: ${this.stats.totalCodeBlocks}`);
    console.log(`Total time elapsed: ${this.stats.elapsedTime}`);
  }
}

export const statsTracker = new StatsTracker();
