/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface IMovementStrategy {
  move(): void;
}

//* Strategy fast but costly
class SwimFast implements IMovementStrategy {
  move(): void {
    console.log("%cSwimming fast!", COLORS.yellow);
  }
}

// * Strategy not fast but not more costly
class FlyOverWater implements IMovementStrategy {
  move(): void {
    console.log("%cFlying over the water!", COLORS.orange);
  }
}

// * Strategy slow but cheap
class WalkOnLand implements IMovementStrategy {
  move(): void {
    console.log("%cWalking on land!", COLORS.red);
  }
}

class Duck {
  private name: string;
  private movementStrategy: IMovementStrategy;

  constructor(name: string, movementStrategy: IMovementStrategy) {
    this.name = name;
    this.movementStrategy = movementStrategy;

    console.log(`%cDuck ${this.name} is ready `, COLORS.green);
  }

  performMovement(): void {
    console.log(`%cDuck ${this.name} is ready for move...`, COLORS.pink);
    this.movementStrategy.move();
  }

  setMovementStrategy(strategy: IMovementStrategy): void {
    this.movementStrategy = strategy;
    console.log(`%cDuck ${this.name} changed movement strategy`, COLORS.purple);
  }
}

function main(): void {
  const duck1 = new Duck("Ducky", new SwimFast());
  const duck2 = new Duck("Flappy", new FlyOverWater());
  const duck3 = new Duck("Waddles", new WalkOnLand());

  duck1.performMovement();
  duck2.performMovement();
  duck3.performMovement();

  console.log("\nChanging movement strategies...\n");
  duck1.setMovementStrategy(new WalkOnLand());
  duck2.setMovementStrategy(new SwimFast());
  duck3.setMovementStrategy(new FlyOverWater());
  duck1.performMovement();
  duck2.performMovement();
  duck3.performMovement();
  console.log("\nAll ducks have changed their movement strategies!");
}

main();
