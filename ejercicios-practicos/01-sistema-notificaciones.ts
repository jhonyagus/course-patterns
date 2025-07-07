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

interface NotificationData {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  data?: Record<string, any>;
}

// Tipos de notificaciones
const NOTIFICATION_TYPES = {
  PROMOTION: 'promotion',
  ORDER: 'order',
  CHAT: 'chat',
  SYSTEM: 'system'
} as const;

// Datos de prueba
const testNotifications: NotificationData[] = [
  {
    id: '1',
    title: '¡Oferta especial!',
    message: '50% de descuento en productos seleccionados',
    timestamp: Date.now(),
    priority: 'medium',
    data: { discountPercentage: 50, category: 'electronics' }
  },
  {
    id: '2',
    title: 'Pedido enviado',
    message: 'Tu pedido #12345 ha sido enviado',
    timestamp: Date.now(),
    priority: 'high',
    data: { orderId: '12345', trackingNumber: 'TRK123456' }
  },
  {
    id: '3',
    title: 'Nuevo mensaje',
    message: 'Tienes un nuevo mensaje de soporte',
    timestamp: Date.now(),
    priority: 'urgent',
    data: { chatId: 'chat_789', senderId: 'support_001' }
  },
  {
    id: '4',
    title: 'Actualización del sistema',
    message: 'Nueva versión disponible',
    timestamp: Date.now(),
    priority: 'low',
    data: { version: '2.1.0', updateSize: '45MB' }
  }
];

// TODO: Implementar el sistema de notificaciones
// Pista: Piensa en cómo estructurar el código para que sea flexible
// y permita añadir nuevos tipos de notificaciones y comportamientos

console.log('Sistema de notificaciones iniciado');
console.log('Notificaciones de prueba:', testNotifications);
