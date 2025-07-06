/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../helpers/colors.ts";

interface Observer {
  name: string;
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  constructor(private channelName: string) {}
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
    console.log(
      `New subscriber %c${observer.name}%c added to channel: %c${this.channelName}`,
      COLORS.green,
      COLORS.white,
      COLORS.orange
    );
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
    console.log(
      `Subscriber ${observer.name} removed from channel: %c${this.channelName}`,
      COLORS.red
    );
  }

  notifyObservers(videoTitle: string): void {
    for (const observer of this.observers) {
      observer.notify(videoTitle);
    }
  }

  uploadVideo(videoTitle: string): void {
    console.log(
      `%cNew video uploaded to channel: %c${this.channelName} - ${videoTitle}`,
      COLORS.orange,
      COLORS.yellow
    );
    this.notifyObservers(videoTitle);
  }
}

class Subscriber implements Observer {
  constructor(private _name: string) {}

  get name(): string {
    return this._name;
  }

  notify(videoTitle: string): void {
    console.log(
      `%c${this.name} has been notified of new video: %c${videoTitle}`,
      COLORS.cyan,
      COLORS.white
    );
  }
}

function main() {
  const channel = new YouTubeChannel("Tech Insights");

  const alice = new Subscriber("Alice");
  const bob = new Subscriber("Bob");
  const charlie = new Subscriber("Charlie");

  channel.subscribe(alice);
  channel.subscribe(bob);

  channel.uploadVideo("Understanding Design Patterns in JavaScript");

  channel.subscribe(charlie);
  channel.uploadVideo("JavaScript ES2023 Features");

  channel.unsubscribe(alice);
  channel.uploadVideo("Advanced JavaScript Techniques");

  channel.unsubscribe(bob);
  channel.uploadVideo("JavaScript Design Patterns Explained");

  channel.unsubscribe(charlie);
  channel.uploadVideo("JavaScript Best Practices");

  channel.unsubscribe(charlie); // Trying to unsubscribe again
}

main();
