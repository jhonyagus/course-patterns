import { INotificationData } from "../models/interfaces/notification-data.ts";

export abstract class NotificationDecorator implements INotificationData {
  private readonly notification: INotificationData;

  constructor(notification: INotificationData) {
    this.notification = notification;
  }

  get id(): string {
    return this.notification.id;
  }

  get title(): string {
    return this.notification.title;
  }

  get message(): string {
    return this.notification.message;
  }

  get timestamp(): number {
    return this.notification.timestamp;
  }

  get priority(): "medium" | "low" | "high" | "urgent" {
    return this.notification.priority;
  }

  get data(): Record<string, any> | undefined {
    return this.notification.data;
  }

  send(): void {
    this.notification.send?.();
  }
}

export class VibrationDecorator extends NotificationDecorator {
  send(): void {
    super.send();
    this.vibrateDevice();
  }

  private vibrateDevice(): void {
    console.log("Vibrating the device... while sending notification");
  }
}

export class SoundDecorator extends NotificationDecorator {
  send(): void {
    super.send();
    this.playSound();
  }

  private playSound(): void {
    console.log("Playing notification sound...");
  }
}

export class LoggingDecorator extends NotificationDecorator {
  send(): void {
    super.send();
    this.logNotification();
  }

  private logNotification(): void {
    console.log("Logging notification to the database...");
  }
}

export class CacheDecorator extends NotificationDecorator {
  override send(): void {
    super.send();
    this.cacheNotification();
  }

  private cacheNotification(): void {
    console.log("Caching notification for future reference...");
  }
}
