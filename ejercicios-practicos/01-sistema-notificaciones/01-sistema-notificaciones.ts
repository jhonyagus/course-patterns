/**
 * EJERCICIO 1: Sistema de Notificaciones Push
 *
 * Contexto: Estás desarrollando una aplicación de e-commerce en React Native
 * que necesita manejar diferentes tipos de notificaciones push (promociones,
 * pedidos, chat, sistema) con diferentes comportamientos y prioridades.
 *
 * Requerimientos:
 * - Cada tipo de notificación tiene un formato específico
 * - Algunas notificaciones necesitan ser almacenadas en caché
 * - Otras requieren logging especial
 * - Ciertas notificaciones necesitan vibración o sonido
 * - El sistema debe poder combinar múltiples comportamientos
 *
 * Implementa un sistema que permita:
 * 1. Crear notificaciones de diferentes tipos
 * 2. Añadir comportamientos adicionales de forma dinámica
 * 3. Procesar las notificaciones según su tipo y comportamientos
 *
 * Datos de ejemplo:
 */

import { COLORS } from "../../helpers/colors.ts";
import {
  LoggingDecorator,
  SoundDecorator,
  VibrationDecorator,
} from "./decorator/notification-decorator.ts";
import { NotificationManager } from "./factory/notification-manager.ts";
import { ENotificationType } from "./models/enums/notification-types.ts";
import { INotificationData } from "./models/interfaces/notification-data.ts";
import { NotificationProcessor } from "./strategy/notification-strategy.ts";

// Datos de prueba
const testNotifications: INotificationData[] = [
  {
    id: "1",
    title: "¡Oferta especial!",
    message: "50% de descuento en productos seleccionados",
    timestamp: Date.now(),
    priority: "medium",
    data: { discountPercentage: 50, category: "electronics" },
  },
  {
    id: "2",
    title: "Pedido enviado",
    message: "Tu pedido #12345 ha sido enviado",
    timestamp: Date.now(),
    priority: "high",
    data: { orderId: "12345", trackingNumber: "TRK123456" },
  },
  {
    id: "3",
    title: "Nuevo mensaje",
    message: "Tienes un nuevo mensaje de soporte",
    timestamp: Date.now(),
    priority: "urgent",
    data: { chatId: "chat_789", senderId: "support_001" },
  },
  {
    id: "4",
    title: "Actualización del sistema",
    message: "Nueva versión disponible",
    timestamp: Date.now(),
    priority: "low",
    data: { version: "2.1.0", updateSize: "45MB" },
  },
];

const typeRecord: Record<string, ENotificationType> = {
  "1": ENotificationType.PROMOTION,
  "2": ENotificationType.ORDER,
  "3": ENotificationType.CHAT,
  "4": ENotificationType.SYSTEM,
};

function main() {
  console.log("Sistema de notificaciones iniciado");
  console.log("Notificaciones de prueba:", testNotifications);

  const option =
    prompt(`
      Seleccione el tipo de notificación a crear:
      1. Promoción
      2. Pedido
      3. Chat
      4. Sistema
      Ingrese el número del tipo de notificación: `) ?? "";

  const type = typeRecord[option];

  let notification = NotificationManager.createNotification(type, {
    id: "5",
    title: "Notificación de prueba",
    message: "Este es un mensaje de prueba",
    timestamp: Date.now(),
    priority: "medium",
    data: { testData: "data" },
  });

  console.log("Notificación creada:", notification);

  NotificationProcessor.process(notification, type);
  notification.send?.();

  console.log("%cEnviando notificación con estrategia...", COLORS.magenta);

  //Aplicar decoradores
  notification = new VibrationDecorator(notification);
  notification.send?.();

  notification = new LoggingDecorator(new SoundDecorator(notification));
  notification.send?.();
}

main();
