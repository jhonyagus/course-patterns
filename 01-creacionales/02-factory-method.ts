/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
  prepare(): void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing Hamburger: %cChicken", COLORS.green);
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing Hamburger: %cBeef", COLORS.red);
  }
}

class BeanHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing Hamburger: %cBean", COLORS.brown);
  }
}

abstract class HamburgerFactory {
  ingredients: string[] = ["bun", "lettuce", "tomato", "onion", "sauce"];
  protected abstract createHamburger(): Hamburger;

  prepareHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenHamburgerFactory extends HamburgerFactory {
  override createHamburger(): Hamburger {
    this.validateIngredients();
    return new ChickenHamburger();
  }

  private validateIngredients(): void {
    if (!this.ingredients.includes("chicken")) {
      throw new Error("Chicken ingredient is missing");
    }
  }
}

class BeefHamburgerFactory extends HamburgerFactory {
  override createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

class BeanHamburgerFactory extends HamburgerFactory {
  override createHamburger(): Hamburger {
    return new BeanHamburger();
  }
}

class Restaurant {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  private getFactory(type: string | null): HamburgerFactory {
    switch (type) {
      case "chicken":
        return new ChickenHamburgerFactory();
      case "beef":
        return new BeefHamburgerFactory();
      case "bean":
        return new BeanHamburgerFactory();
      default:
        throw new Error(`Unknown hamburger type: ${type}`);
    }
  }

  public orderHamburger(type: string | null): void {
    console.log(`%cOrdering hamburger at ${this.name}`, COLORS.gray);
    const factory = this.getFactory(type);
    factory.prepareHamburger();
  }
}

function main() {
  try {
    const restaurant = new Restaurant("Burger Place");
    const type = prompt("Enter hamburger type (chicken/beef/bean):");
    restaurant.orderHamburger(type);
  } catch (error: any) {
    console.error(`%cError: ${error.message}`, COLORS.red);
  }
}

main();
