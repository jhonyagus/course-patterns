/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

import { COLORS } from "../helpers/colors.ts";

type Language = "en" | "es" | "fr";

function createGreeter(lan: Language) {
  return function (name: string) {
    const messages = {
      en: `%cHello ${name}!`,
      es: `%cHola ${name}!`,
      fr: `%cBonjour ${name}!`,
    };

    console.log(messages[lan], COLORS.green);
  };
}

function main() {
  const spanishGreeter = createGreeter("es");
  spanishGreeter("Jhony");
  const englishGreeter = createGreeter("en");
  englishGreeter("Jhony");
  const frenchGreeter = createGreeter("fr");
  frenchGreeter("Jhony");
}

main();
