import { INotificationData } from "../models/interfaces/notification-data.ts";
import { TNotificationInput } from "./notifications.ts";

export abstract class NotificationFactory {
  abstract createNotification(data: TNotificationInput): INotificationData;

  prepareNotification(data: TNotificationInput): void {
    const notification = this.createNotification(data);
    notification.send?.();
  }
}
