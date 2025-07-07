import { ENotificationType } from "../models/enums/notification-types.ts";
import { INotificationData } from "../models/interfaces/notification-data.ts";

// Clases Strategy separadas
interface INotificationProcessingStrategy {
  process(notification: INotificationData): void;
}

class PromotionProcessingStrategy implements INotificationProcessingStrategy {
  process(notification: INotificationData): void {
    // Lógica específica de promociones
    console.log("Processing promotion: validate discounts, track analytics...");
  }
}

class OrderProcessingStrategy implements INotificationProcessingStrategy {
  process(notification: INotificationData): void {
    // Lógica específica de pedidos
    console.log("Processing order: update inventory, send tracking...");
  }
}

class ChatProcessingStrategy implements INotificationProcessingStrategy {
  process(notification: INotificationData): void {
    // Lógica específica de chat
    console.log("Processing chat: notify users, update chat history...");
  }
}

class SystemProcessingStrategy implements INotificationProcessingStrategy {
  process(notification: INotificationData): void {
    // Lógica específica de sistema
    console.log("Processing system: log events, monitor performance...");
  }
}

export class NotificationProcessor {
  private static readonly strategies: Record<
    ENotificationType,
    INotificationProcessingStrategy
  > = {
    [ENotificationType.PROMOTION]: new PromotionProcessingStrategy(),
    [ENotificationType.ORDER]: new OrderProcessingStrategy(),
    [ENotificationType.CHAT]: new ChatProcessingStrategy(),
    [ENotificationType.SYSTEM]: new SystemProcessingStrategy(),
  };

  static process(
    notification: INotificationData,
    type: ENotificationType
  ): void {
    this.strategies[type].process(notification);
  }
}
