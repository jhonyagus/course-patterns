class ConfigManager {
  private config: Record<string, string> = {};

  setConfig(key: string, value: string) {
    this.config[key] = value;
  }

  getConfig(key: string): string | null {
    return this.config[key];
  }

  getAllConfig() {
    return this.config;
  }
}

export const configManager = new ConfigManager();
