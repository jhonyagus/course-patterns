export interface INotificationData {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  priority: "low" | "medium" | "high" | "urgent";
  data?: Record<string, any>;

  send?: () => void;
}
