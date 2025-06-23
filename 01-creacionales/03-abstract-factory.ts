/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

import { COLORS } from "../helpers/colors.ts";

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

interface Hamburger {
  prepare(): void;
}

interface Drink {
  pour: () => void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing Hamburger: %cChicken", COLORS.green);
  }
}
class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing Hamburger: %cBeef", COLORS.orange);
  }
}

class Water implements Drink {
  pour(): void {
    console.log("Pouring %cWater", COLORS.blue);
  }
}

class Soda implements Drink {
  pour(): void {
    console.log("Pouring %cSoda", COLORS.red);
  }
}

abstract class RestaurantFactory {
  abstract createHamburger(): Hamburger;
  abstract createDrink(): Drink;

  prepareMeal(): void {
    const hamburger = this.createHamburger();
    const drink = this.createDrink();
    hamburger.prepare();
    drink.pour();
  }
}

class FastFoodRestaurantFactory extends RestaurantFactory {
  createHamburger(): Hamburger {
    return new BeefHamburger();
  }

  createDrink(): Drink {
    return new Soda();
  }
}

class HealthyRestaurantFactory extends RestaurantFactory {
  createHamburger(): Hamburger {
    return new ChickenHamburger();
  }

  createDrink(): Drink {
    return new Water();
  }
}

function main(restaurantFactory: RestaurantFactory) {
  //   const hamburger = restaurantFactory.createHamburger();
  //   const drink = restaurantFactory.createDrink();

  //   console.log("Preparing meal:");
  //   hamburger.prepare();
  //   drink.pour();
  //   console.log("Meal prepared successfully!");

  restaurantFactory.prepareMeal();
}

console.log("%cFast Food Restaurant", COLORS.yellow);
main(new FastFoodRestaurantFactory());

console.log("%cHealthy Restaurant", COLORS.green);
main(new HealthyRestaurantFactory());
