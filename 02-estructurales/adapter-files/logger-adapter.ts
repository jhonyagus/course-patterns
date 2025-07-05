import { Logger } from "jsr:@deno-library/logger";

export interface ILoggerAdapter {
  file: string;
  writeLog: (message: string) => void;
  writeError: (message: string) => void;
  writeWarning: (message: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  public file: string;
  private logger = new Logger();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(msg: string): void {
    this.logger.info(`[${this.file} log] ${msg}`);
  }

  writeWarning(msg: string) {
    this.logger.warn(`[${this.file} warning] ${msg}`);
  }

  writeError(msg: string) {
    this.logger.error(`[${this.file} error] ${msg}`);
  }
}
