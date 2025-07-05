/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from "../helpers/colors.ts";

interface INotification {
  send(message: string): void;
}

class BasicNotification implements INotification {
  send(message: string): void {
    console.log(`%cSend a basic notification: ${message}`, COLORS.gray);
  }
}

abstract class NotificationDecorator implements INotification {
  constructor(protected notification: INotification) {}

  send(message: string): void {
    this.notification.send(message);
  }
}

class EmailNotificationDecorator extends NotificationDecorator {
  private sendEmailNotification(message: string): void {
    console.log(`%cSend an email notification: ${message}`, COLORS.yellow);
  }

  override send(message: string): void {
    super.send(message);
    this.sendEmailNotification(message);
  }
}

class SMSNotificationDecorator extends NotificationDecorator {
  private sendSMSNotification(message: string): void {
    console.log(`%cSend an SMS notification: ${message}`, COLORS.green);
  }

  override send(message: string): void {
    super.send(message);
    this.sendSMSNotification(message);
  }
}

function main() {
  let notification = new BasicNotification();
  notification = new EmailNotificationDecorator(notification);
  notification = new SMSNotificationDecorator(notification);
  notification.send("Notification testing!");
}

main();
