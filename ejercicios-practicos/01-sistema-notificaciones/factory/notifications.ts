import { INotificationData } from "../models/interfaces/notification-data.ts";

export type TNotificationInput = {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  priority: "medium" | "low" | "high" | "urgent";
  data?: Record<string, any>;
};

export class BasicNotification implements INotificationData {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  priority: "medium" | "low" | "high" | "urgent";
  data?: Record<string, any>;

  constructor({
    id,
    message,
    priority,
    timestamp,
    title,
    data,
  }: TNotificationInput) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.timestamp = timestamp;
    this.priority = priority;
    this.data = data;
  }

  send(): void {
    console.log("Sending basic notification...");
  }
}

export class ChatNotification
  extends BasicNotification
  implements INotificationData
{
  send(): void {
    console.log(`Processing chat notification: ${this.title}`);
  }
}

export class OrderNotification
  extends BasicNotification
  implements INotificationData
{
  send(): void {
    console.log(`Processing order notification: ${this.title}`);
  }
}

export class PromotionNotification
  extends BasicNotification
  implements INotificationData
{
  send(): void {
    console.log(`Processing promotion notification: ${this.title}`);
  }
}

export class SystemNotification
  extends BasicNotification
  implements INotificationData
{
  send(): void {
    console.log(`Processing system notification: ${this.title}`);
  }
}
