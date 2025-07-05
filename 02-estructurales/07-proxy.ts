/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
  constructor(public name: string, public level: number) {}
}

interface IRoom {
  readonly name: string;
  enter(player: Player): void;
}

class SecretRoom implements IRoom {
  private _name = "Secret Room";
  enter(player: Player): void {
    console.log(`Welcome to the secret room, ${player.name}! `);
  }

  get name(): string {
    return this._name;
  }
}

class GamingRoom implements IRoom {
  readonly name = "Gaming Room";
  enter(player: Player): void {
    console.log(`Welcome to the gaming room, ${player.name}!`);
  }
}

class MagicPortal implements IRoom {
  readonly name = "Magic Portal";
  constructor(private room: IRoom) {}

  enter(player: Player): void {
    if (player.level < 10) {
      console.log(
        `%cSorry ${player.name}, you need to be at least level 10 to enter the room: ${this.room.name}`,
        COLORS.red
      );
    } else {
      this.room.enter(player);
    }
  }
}

class GamingRoomProxy implements IRoom {
  readonly name = "Gaming Room Proxy";
  constructor(private room: IRoom) {}
  enter(player: Player): void {
    if (player.level < 5) {
      console.log(
        `%cSorry ${player.name}, you need to be at least level 5 to enter the room: ${this.room.name}`,
        COLORS.red
      );
    } else {
      this.room.enter(player);
    }
  }
}

function main() {
  let portal: IRoom = new MagicPortal(new SecretRoom()); // *This is the Proxy

  const player1 = new Player("Alice", 5);
  const player2 = new Player("Bob", 15);

  portal.enter(player1); // Alice tries to enter, but is too low level
  portal.enter(player2); // Bob enters successfully

  portal = new GamingRoomProxy(new GamingRoom()); // *This is the Proxy
  portal.enter(player1); // Alice enters the gaming room
  portal.enter(player2); // Bob enters the gaming room
}

main();
