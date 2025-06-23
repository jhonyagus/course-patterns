/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

import { COLORS } from "../helpers/colors.ts";

class Characteristics {
  constructor(public height: number, public weight: number) {}

  clone(): Characteristics {
    return new Characteristics(this.height, this.weight);
  }

  display(): string {
    return `Altura: ${this.height} m, Peso: ${this.weight} kg`;
  }
}

class Pokemon {
  constructor(
    public name: string,
    public type: string,
    public level: number,
    public attacks: string[],
    public characteristics: Characteristics
  ) {}

  // * This is a important on the pattern
  clone(): Pokemon {
    return new Pokemon(
      this.name,
      this.type,
      this.level,
      [...this.attacks],
      this.characteristics.clone()
    );
  }

  displayInfo(): void {
    console.log(
      `Nombre: ${this.name}
Tipo: ${this.type}
Nivel: ${this.level}
Ataques: ${this.attacks.join(", ")}
Características: ${this.characteristics.display()}`
    );
  }
}

// Tarea:
// 1. Crear un Pokémon base.
// 2. Clonar el Pokémon base y modificar algunos atributos en los clones.
// 3. Llamar a displayInfo en cada Pokémon para mostrar sus detalles.

function main() {
  const basePokemon = new Pokemon(
    "Charmander",
    "Fuego",
    1,
    ["Llamarada", "Arañazo"],
    new Characteristics(0.6, 8.5)
  );
  const clone1 = basePokemon.clone();
  clone1.name = "Charmeleon";
  clone1.level = 16;
  clone1.attacks.push("Lanzallamas");
  clone1.characteristics.height = 1.1;
  clone1.characteristics.weight = 19.0;

  console.log("%cBase Pokémon", COLORS.green);
  basePokemon.displayInfo(); // Aquí no debe de aparecer "Lanzallamas"
  console.log("%cClone Pokémon", COLORS.brown);
  clone1.displayInfo();

  console.log({ basePokemon, clone1 });
}

main();
