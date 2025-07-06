/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  name: string;
  accept(visitor: Visitor): void;
  getPrice(): number;
}

class RollerCoaster implements Attraction {
  private _name: string = "Roller Coaster";
  private price: number = 40;

  accept(visitor: Visitor): void {
    visitor.visitRollerCoaster(this);
  }

  getPrice(): number {
    return this.price;
  }

  get name(): string {
    return this._name;
  }
}

class HauntedHouse implements Attraction {
  private _name: string = "Haunted House";
  private price: number = 30;

  accept(visitor: Visitor): void {
    visitor.visitHauntedHouse(this);
  }

  getPrice(): number {
    return this.price;
  }

  get name(): string {
    return this._name;
  }
}

class FerrisWheel implements Attraction {
  private _name: string = "Ferris Wheel";
  private price: number = 20;

  accept(visitor: Visitor): void {
    visitor.visitFerrisWheel(this);
  }

  getPrice(): number {
    return this.price;
  }

  get name(): string {
    return this._name;
  }
}

class ChildVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster) {
    const discountedPrice = rollerCoaster.getPrice() * 0.7;
    const finalPrice = rollerCoaster.getPrice() - discountedPrice;

    console.log(
      `Child discount for Roller Coaster: $${discountedPrice} (Final Price: $${finalPrice})`
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    const discountedPrice = hauntedHouse.getPrice() * 0.8;
    const finalPrice = hauntedHouse.getPrice() - discountedPrice;
    console.log(
      `Child discount for Haunted House: $${discountedPrice} (Final Price: $${finalPrice})`
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    const discountedPrice = ferrisWheel.getPrice() * 0.5;
    const finalPrice = ferrisWheel.getPrice() - discountedPrice;
    console.log(
      `Child discount for Ferris Wheel: $${discountedPrice} (Final Price: $${finalPrice})`
    );
  }
}

class AdultVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(`Adult price for Roller Coaster: $${rollerCoaster.getPrice()}`);
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(`Adult price for Haunted House: $${hauntedHouse.getPrice()}`);
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(`Adult price for Ferris Wheel: $${ferrisWheel.getPrice()}`);
  }
}

class SeniorVisitor implements Visitor {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    const discountedPrice = rollerCoaster.getPrice() * 0.5;
    const finalPrice = rollerCoaster.getPrice() - discountedPrice;

    console.log(
      `Senior discount for Roller Coaster: $${discountedPrice} (Final Price: $${finalPrice})`
    );
  }

  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    const discountedPrice = hauntedHouse.getPrice() * 0.5;
    const finalPrice = hauntedHouse.getPrice() - discountedPrice;
    console.log(
      `Senior discount for Haunted House: $${discountedPrice} (Final Price: $${finalPrice})`
    );
  }

  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    const discountedPrice = ferrisWheel.getPrice() * 0.5;
    const finalPrice = ferrisWheel.getPrice() - discountedPrice;
    console.log(
      `Senior discount for Ferris Wheel: $${discountedPrice} (Final Price: $${finalPrice})`
    );
  }
}

function main() {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  attractions.forEach((attraction) =>
    console.log(
      `Attraction %c${attraction.name}: ${attraction.getPrice()}`,
      COLORS.orange
    )
  );

  console.log("%cChild Visitor", COLORS.green);
  const childVisitor = new ChildVisitor();

  attractions.forEach((attraction) => {
    attraction.accept(childVisitor);
  });

  console.log("\n\n%cAdult Visitor", COLORS.purple);
  const adultVisitor = new AdultVisitor();

  attractions.forEach((attraction) => {
    attraction.accept(adultVisitor);
  });
  console.log("\n\n%cSenior Visitor", COLORS.yellow);
  const seniorVisitor = new SeniorVisitor();

  attractions.forEach((attraction) => {
    attraction.accept(seniorVisitor);
  });
}

main();
