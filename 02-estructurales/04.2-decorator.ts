/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

type TStats = {
  attack: number;
  defense: number;
};

// 1. Interfaz Character
interface Character {
  getDescription(): string;
  getStats(): TStats;
}

// 2. Clase BasicCharacter
// Representa un personaje básico sin accesorios
// TODO: Implementar la interfaz Character
class BasicCharacter implements Character {
  constructor(public stats: TStats = { attack: 10, defense: 10 }) {}

  getDescription(): string {
    return "Basic Character";
  }
  getStats(): TStats {
    return this.stats;
  }
}

// 3. Clase Decoradora CharacterDecorator
// Actúa como base para los decoradores específicos
abstract class CharacterDecorator implements Character {
  constructor(protected character: Character) {}

  abstract getDescription(): string;

  abstract getStats(): TStats;
}

// 4. Decorador Concreto HelmetDecorator
// Añade un casco que aumenta la defensa en +5
class HelmetDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * with Helmet";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 5 };
  }
}

// 5. Decorador Concreto ShieldDecorator
// Añade un escudo que aumenta la defensa en +10
class ShieldDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * with Shield";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 10 };
  }
}

// 6. Decorador Concreto SwordDecorator
// Añade una espada que aumenta el ataque en +7
class SwordDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * with Sword";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 7, defense: stats.defense };
  }
}

class RingDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * with Ring";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 3, defense: stats.defense };
  }
}

// 7. Código Cliente para Probar el Decorador

function main() {
  // Crear un personaje básico
  const basic: Character = new BasicCharacter();
  let character: Character = basic;
  console.log("\nPersonaje inicial:", character.getDescription());
  console.log("Estadísticas:", character.getStats());

  // Añadir un casco al personaje
  const helmetCharacter = new HelmetDecorator(character);
  console.log("\nCon Casco:", helmetCharacter.getDescription());
  console.log("Estadísticas:", helmetCharacter.getStats());

  // Añadir un escudo al personaje
  // character = new ShieldDecorator(character);
  // console.log("\nCon Escudo:", character.getDescription());
  // console.log("Estadísticas:", character.getStats());

  // Añadir una espada al personaje
  character = new SwordDecorator(helmetCharacter);
  console.log("\nCon Espada:", character.getDescription());
  console.log("Estadísticas:", character.getStats());

  character = new RingDecorator(character);
  console.log("\nCon Anillo:", character.getDescription());
  console.log("Estadísticas:", character.getStats());

  console.log("\n\n");
  console.log("Final Basic: ", basic.getDescription(), basic.getStats());
  console.log("Final Helmet: ", helmetCharacter.getDescription(), helmetCharacter.getStats());
}

main();
