/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

//! Salida esperada
//! Colocar colores de log según el nivel
//* [INFO:2025-10-21:07] Aplicación iniciada correctamente.
//* [WARNING:2025-10-21:07] El uso de memoria está alto.
//* [ERROR:2025-10-21:07] Error de conexión a la base de datos.

import { COLORS } from "../helpers/colors.ts";

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

type LogLevel = "info" | "warn" | "error";

const LogsDictionary: Record<
  LogLevel,
  {
    description: Uppercase<string>;
    color: string;
    logMethod: (...info: any[]) => void;
  }
> = {
  info: { description: "INFO", color: COLORS.green, logMethod: console.info },
  warn: {
    description: "WARNING",
    color: COLORS.yellow,
    logMethod: console.warn,
  },
  error: { description: "ERROR", color: COLORS.red, logMethod: console.error },
};

function createLogger(level: LogLevel) {
  return (message: string) => {
    const { color, description, logMethod } = LogsDictionary[level];
    const fullText = `%c[${description}:${formatDate(new Date())}] ${message}`;
    logMethod(fullText, color);
  };
}

function main() {
  const infoLogger = createLogger("info");
  const warnLogger = createLogger("warn");
  const errorLogger = createLogger("error");

  infoLogger("Aplicación iniciada correctamente.");
  warnLogger("El uso de memoria está alto.");
  errorLogger("Error de conexión a la base de datos.");
}

main();
