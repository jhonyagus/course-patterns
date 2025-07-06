/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

/**
 * 1.	Clase ControlTower:
	•	Actúa como el Mediador entre los aviones. 
    La torre de control coordina las comunicaciones entre los aviones 
    para evitar colisiones y recibir sus solicitudes de despegue 
    o aterrizaje.

	2.	Clase Airplane:
	•	Representa a un avión que puede enviar y recibir mensajes 
    a través de la torre de control. 
    Los aviones no se comunican directamente entre sí, 
    sino a través de la torre de control, que gestiona la información.

	3.	Interacciones:
	•	Los aviones pueden solicitar permiso para aterrizar o despegar, 
    y la torre de control enviará mensajes a los demás aviones 
    notificándoles de la actividad de cada avión.
 */

import { COLORS } from "../helpers/colors.ts";

// Clase Mediador - ControlTower
class ControlTower {
  private airplanes: Airplane[] = [];

  // Registrar un avión en la torre de control
  // TODO: Implementar el método registerAirplane
  // registerAirplane(airplane: Airplane)

  registerAirplane(airplane: Airplane): void {
    if (this.airplanes.includes(airplane)) return;

    console.log(
      `%cControl Tower: %cAirplane ${airplane.id} registered.`,
      COLORS.orange,
      COLORS.yellow
    );

    this.airplanes.push(airplane);
  }

  sendMessage(sender: Airplane, message: string): void {
    const otherAirplanes = this.airplanes.filter(
      (airplane) => airplane !== sender
    );

    otherAirplanes.forEach((airplane) => {
      airplane.receiveMessage(sender, message);
    });
  }

  // Coordinación de aterrizaje
  requestLanding(sender: Airplane): void {
    console.log(
      `\n%cTorre de Control: %cPermiso de aterrizaje concedido a ${sender.id}`,
      COLORS.green,
      COLORS.white
    );

    this.sendMessage(sender, `${sender.id} está aterrizando.`);
  }

  // Coordinación de despegue
  requestTakeoff(sender: Airplane): void {
    console.log(
      `\n%cTorre de Control: %cPermiso de despegue concedido a ${sender.id}`,
      COLORS.green,
      COLORS.white
    );

    this.sendMessage(sender, `${sender.id} está despegando.`);
  }
}

// Clase Colega - Airplane
class Airplane {
  private _id: string;
  private controlTower: ControlTower;

  constructor(_id: string, controlTower: ControlTower) {
    this._id = _id;
    this.controlTower = controlTower;

    this.controlTower.registerAirplane(this);
  }

  get id(): string {
    return this._id;
  }

  // Solicitar aterrizaje a la torre de control
  requestLanding(): void {
    console.log(`${this.id} solicita permiso para aterrizar.`);
    this.controlTower.requestLanding(this);
  }

  // Solicitar despegue a la torre de control
  requestTakeoff(): void {
    console.log(`${this.id} solicita permiso para despegar.`);
    this.controlTower.requestTakeoff(this);
  }

  // Recibir mensaje de otros aviones
  receiveMessage(sender: Airplane, message: string): void {
    console.log(
      `%c${this.id} %crecibe mensaje de %c${sender.id}: %c"${message}"`,
      COLORS.violet,
      COLORS.white,
      COLORS.pink,
      COLORS.white
    );
  }
}

// Código Cliente para probar el patrón Mediator
// ! Aquí no hay nada que modificar en este bloque
function main(): void {
  const controlTower = new ControlTower();

  const airplane1 = new Airplane("Vuelo 101", controlTower);
  const airplane2 = new Airplane("Vuelo 202", controlTower);
  const airplane3 = new Airplane("Vuelo 303", controlTower);

  // Ejemplo de interacciones
  airplane1.requestLanding();
  airplane2.requestTakeoff();
  airplane3.requestLanding();
}

main();
