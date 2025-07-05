import { COLORS } from "../../helpers/colors.ts";
import { ILoggerAdapter } from "./logger-adapter.ts";

export class LocalLogger implements ILoggerAdapter {
  constructor(public file: string) {}

  writeLog(message: string): void {
    console.log(`[${this.file} log] ${message}`);
  }

  writeError(message: string): void {
    console.error(`[${this.file} error] %c${message}`, COLORS.red);
  }

  writeWarning(message: string): void {
    console.warn(`[${this.file} warning] %c${message}`, COLORS.yellow);
  }
}
