/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log("%cLight is ON", COLORS.yellow);
  }

  turnOff(): void {
    console.log("%cLight is OFF", COLORS.yellow);
  }
}

class Fan {
  on(): void {
    console.log("%cFan is ON", COLORS.green);
  }
  off(): void {
    console.log("%cFan is OFF", COLORS.green);
  }
}

//* Commands

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}
  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}
  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    const command = this.commands[button];
    if (command) {
      command.execute();
    } else {
      console.log(`%cNo command assigned to button: ${button}`, COLORS.red);
    }
  }
}

function main() {
  const remoteControl = new RemoteControl();

  const light = new Light();
  const fan = new Fan();

  //* Create commands for the devices
  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);
  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  //* Assign actions to buttons on the remote control
  remoteControl.setCommand("1", lightOnCommand);
  remoteControl.setCommand("2", lightOffCommand);
  remoteControl.setCommand("3", fanOnCommand);
  remoteControl.setCommand("4", fanOffCommand);

  let continueProgram = true;

  do {
    console.clear();
    const pressedButton =
      prompt(
        "Press a button (1-4) to control the devices:\n1: Turn ON Light\n2: Turn OFF Light\n3: Turn ON Fan\n4: Turn OFF Fan\n0: Exit"
      ) ?? "";

    remoteControl.pressButton(pressedButton);

    const continueProgramResponse =
      prompt("Do you want to continue? (yes/no)")?.toLowerCase() ?? "yes";

    continueProgram =
      continueProgramResponse === "yes" || continueProgramResponse === "y";
  } while (continueProgram);
}

main();
