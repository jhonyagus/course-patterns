import { INotificationData } from "../models/interfaces/notification-data.ts";
import { NotificationFactory } from "./notification-factory-abstract.ts";
import {
  ChatNotification,
  OrderNotification,
  PromotionNotification,
  SystemNotification,
  TNotificationInput,
} from "./notifications.ts";

export class ChatNotificationFactory extends NotificationFactory {
  override createNotification(data: TNotificationInput): INotificationData {
    return new ChatNotification(data);
  }
}

export class OrderNotificationFactory extends NotificationFactory {
  override createNotification(data: TNotificationInput): INotificationData {
    return new OrderNotification(data);
  }
}

export class PromotionNotificationFactory extends NotificationFactory {
  override createNotification(data: TNotificationInput): INotificationData {
    return new PromotionNotification(data);
  }
}

export class SystemNotificationFactory extends NotificationFactory {
  override createNotification(data: TNotificationInput): INotificationData {
    return new SystemNotification(data);
  }
}
