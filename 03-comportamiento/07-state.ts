/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
  name: string;
  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private _name: string = "Vending Machine";
  private state: State;

  constructor() {
    this.state = new WaitingForMoneyState(this);
    console.log(`Initial state: %c${this.state.name}`, COLORS.cyan);
  }

  get name(): string {
    return this._name;
  }

  get stateName(): string {
    return this.state.name;
  }

  setState(newState: State): void {
    this.state = newState;
    console.log(`Changing to new state: %c${newState.name}`, COLORS.green);
  }

  insertMoney(): void {
    this.state.insertMoney();
  }

  selectProduct(): void {
    this.state.selectProduct();
  }

  dispenseProduct(): void {
    this.state.dispenseProduct();
  }
}

class WaitingForMoneyState implements State {
  private _name = "Waiting for Money STATE";

  constructor(private machine: VendingMachine) {}

  get name(): string {
    return this._name;
  }

  insertMoney(): void {
    console.log("%cMoney inserted", COLORS.green);
    this.machine.setState(new SelectProductState(this.machine));
  }

  selectProduct(): void {
    console.log("%cPlease insert money first", COLORS.red);
  }

  dispenseProduct(): void {
    console.log("%cPlease insert money first", COLORS.red);
  }
}

class SelectProductState implements State {
  private _name = "Select Product STATE";

  constructor(private machine: VendingMachine) {}

  get name(): string {
    return this._name;
  }

  insertMoney(): void {
    console.log("%cMoney already inserted", COLORS.yellow);
  }

  selectProduct(): void {
    console.log("%cProduct selected!", COLORS.orange);
    this.machine.setState(new DispensingProductState(this.machine));
  }

  dispenseProduct(): void {
    console.log("%cPlease select a product first", COLORS.red);
  }
}

class DispensingProductState implements State {
  private _name = "Dispensing product STATE";

  constructor(private machine: VendingMachine) {}

  get name(): string {
    return this._name;
  }

  insertMoney(): void {
    console.log("%cMoney already inserted", COLORS.red);
  }

  selectProduct(): void {
    console.log("%cProduct already selected!", COLORS.red);
  }

  dispenseProduct(): void {
    console.log("%cDispatching product", COLORS.green);
    this.machine.setState(new WaitingForMoneyState(this.machine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = "4";

  do {
    console.clear();
    console.log(
      `Select an option %c ${vendingMachine.name},%c current state: %c${vendingMachine.stateName}`,
      COLORS.cyan,
      COLORS.white,
      COLORS.green
    );

    selectedOption = prompt(`
        1. Insert Money
        2. Select Product
        3. Dispense Product
        4. Exit

        Please enter your choice:  
    `);

    switch (selectedOption) {
      case "1":
        vendingMachine.insertMoney();
        break;
      case "2":
        vendingMachine.selectProduct();
        break;
      case "3":
        vendingMachine.dispenseProduct();
        break;
      case "4":
        console.log("%cExiting...", COLORS.red);
        break;
      default:
        console.log("%cInvalid option, please try again.", COLORS.red);
    }

    await sleep(3000);
  } while (selectedOption !== "4");
}

main();
