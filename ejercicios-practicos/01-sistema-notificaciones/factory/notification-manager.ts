import { ENotificationType } from "../models/enums/notification-types.ts";
import { INotificationData } from "../models/interfaces/notification-data.ts";
import {
  ChatNotificationFactory,
  OrderNotificationFactory,
  PromotionNotificationFactory,
  SystemNotificationFactory,
} from "./notification-factories.ts";
import { NotificationFactory } from "./notification-factory-abstract.ts";
import { TNotificationInput } from "./notifications.ts";

export class NotificationManager {
  private static readonly factories: Record<
    ENotificationType,
    NotificationFactory
  > = {
    [ENotificationType.PROMOTION]: new PromotionNotificationFactory(),
    [ENotificationType.ORDER]: new OrderNotificationFactory(),
    [ENotificationType.CHAT]: new ChatNotificationFactory(),
    [ENotificationType.SYSTEM]: new SystemNotificationFactory(),
  };

  public static createNotification(
    type: ENotificationType,
    data: TNotificationInput
  ): INotificationData {
    const factory = this.factories[type];
    if (!factory) {
      throw new Error(`No factory found for notification type: ${type}`);
    }
    return factory.createNotification(data);
  }
}
