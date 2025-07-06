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

import { COLORS } from "../helpers/colors.ts";

class ChatRoom {
  private users: User[] = [];

  constructor(private title: string) {}

  addUser(user: User): void {
    if (this.users.includes(user)) return;
    console.log(
      `%cUser ${user.userName} has joined the chat room: ${this.title}`,
      COLORS.yellow
    );
    this.users.push(user);
  }

  removeUser(user: User): void {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      console.log(
        `%cUser ${user.userName} has left the chat room: ${this.title}`,
        COLORS.red
      );
      this.users.splice(index, 1);
    }
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((u) => u !== sender);
    usersToSend.forEach((user) => user.receiveMessage(sender, message));
  }
}

class User {
  constructor(public userName: string, public chatRoom: ChatRoom) {}

  sendMessage(message: string): void {
    console.log(
      `%c\n${this.userName} sends message: ${message}\n`,
      COLORS.green
    );
    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string): void {
    console.log(
      `%cMessage from ${sender.userName} to ${this.userName}: ${message}`,
      COLORS.orange
    );
  }
}

function main() {
  const chatRoom = new ChatRoom("General Chat");

  const aliceUser = new User("Alice", chatRoom);
  const bobUser = new User("Bob", chatRoom);
  const charlieUser = new User("Charlie", chatRoom);

  chatRoom.addUser(aliceUser);
  chatRoom.addUser(bobUser);
  chatRoom.addUser(charlieUser);

  aliceUser.sendMessage("Hello everyone!");
  bobUser.sendMessage("Hi Alice!");
  charlieUser.sendMessage("Hey Alice and Bob!");
}

main();
