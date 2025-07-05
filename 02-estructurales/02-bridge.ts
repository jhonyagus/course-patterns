/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

interface Ability {
  use: () => void;
}

class SwordAttack implements Ability {
  use(): void {
    console.log("%cUsing sword attack!", COLORS.cyan);
  }
}

class MagicSpell implements Ability {
  use(): void {
    console.log("%cCasting magic spell!", COLORS.pink);
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log("%cUsing axe attack!", COLORS.green);
  }
}

class FireballSpell implements Ability {
  use(): void {
    console.log("%cUsing fireball spell!", COLORS.orange);
  }
}

abstract class Character {
  protected ability: Ability;
  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility(ability: Ability): void {
    this.ability = ability;
  }

  abstract performAbility(): void;
}

class Warrior extends Character {
  performAbility(): void {
    console.log("\nWarrior performing ability:");
    this.ability.use();
  }
}

class Mage extends Character {
  performAbility(): void {
    console.log("\nMage performing ability:");
    this.ability.use();
  }
}

function main() {
  const warrior = new Warrior(new SwordAttack());
  warrior.performAbility();

  warrior.setAbility(new AxeAttack());
  warrior.performAbility();

  const mage = new Mage(new MagicSpell());
  mage.performAbility();

  mage.setAbility(new FireballSpell());
  mage.performAbility();
}

main();
