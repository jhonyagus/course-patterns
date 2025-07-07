/**
 * EJEMPLO DE USO DEL BUILDER PATTERN
 * 
 * Este archivo muestra cómo usar el NotificationBuilder para crear
 * notificaciones de forma más fluida y legible
 */

import { NotificationBuilder, NotificationBuilderExamples } from "./builder/notification-builder.ts";
import { ENotificationType } from "./models/enums/notification-types.ts";

//! Generado por Copilot

function demonstrateBuilder() {
  console.log("🏗️ DEMOSTRACIÓN DEL BUILDER PATTERN");
  console.log("=====================================\n");

  // Ejemplo 1: Uso básico del builder
  console.log("📝 1. COMPARACIÓN: Sin Builder vs Con Builder");
  
  // Sin Builder (código anterior)
  console.log("\n❌ SIN BUILDER (más verboso):");
  console.log(`
  let notification = NotificationManager.createNotification(type, data);
  NotificationProcessor.process(notification, type);
  notification = new VibrationDecorator(notification);
  notification = new SoundDecorator(notification);
  notification = new LoggingDecorator(notification);
  notification.send();
  `);

  // Con Builder (nuevo)
  console.log("\n✅ CON BUILDER (más limpio):");
  const builderNotification = NotificationBuilder
    .create(ENotificationType.PROMOTION, {
      id: 'builder-demo',
      title: 'Demo Builder',
      message: 'Ejemplo de uso del Builder',
      timestamp: Date.now(),
      priority: 'medium',
      data: { demo: true }
    })
    .withVibration()
    .withSound()
    .withLogging()
    .buildAndSend();

  console.log("✅ Notificación creada con Builder:", builderNotification.constructor.name);

  // Ejemplo 2: Configuraciones predefinidas
  console.log("\n📋 2. CONFIGURACIONES PREDEFINIDAS");
  
  console.log("\n🔥 Comportamientos Urgentes:");
  NotificationBuilder
    .create(ENotificationType.ORDER, {
      id: 'urgent-order',
      title: 'Pedido Urgente',
      message: 'Tu pedido necesita atención',
      timestamp: Date.now(),
      priority: 'urgent',
      data: { orderId: 'ORD-001' }
    })
    .withUrgentBehaviors()  // vibration + sound + logging
    .buildAndSend();

  console.log("\n🔇 Comportamientos Silenciosos:");
  NotificationBuilder
    .create(ENotificationType.SYSTEM, {
      id: 'silent-update',
      title: 'Actualización Silenciosa',
      message: 'Sistema actualizado en segundo plano',
      timestamp: Date.now(),
      priority: 'low',
      data: { version: '1.2.3' }
    })
    .withSilentBehaviors()  // cache + logging solamente
    .buildAndSend();

  // Ejemplo 3: Flexibilidad del builder
  console.log("\n🎨 3. FLEXIBILIDAD Y REUTILIZACIÓN");
  
  const baseBuilder = NotificationBuilder
    .create(ENotificationType.CHAT, {
      id: 'chat-base',
      title: 'Chat Base',
      message: 'Mensaje base',
      timestamp: Date.now(),
      priority: 'medium',
      data: { chatRoom: 'general' }
    })
    .withLogging()
    .withCache();

  // Crear variaciones a partir de la base
  console.log("\n💬 Chat Normal:");
  const normalChat = baseBuilder
    .withSound()
    .buildAndSend();

  console.log("\n🚨 Chat Urgente:");
  const urgentChat = NotificationBuilder
    .create(ENotificationType.CHAT, {
      id: 'urgent-chat',
      title: 'Chat Urgente',
      message: 'Mensaje urgente',
      timestamp: Date.now(),
      priority: 'urgent',
      data: { chatRoom: 'support' }
    })
    .withLogging()
    .withCache()
    .withVibration()
    .withSound()
    .buildAndSend();

  // Ejemplo 4: Configuración avanzada
  console.log("\n⚙️ 4. CONFIGURACIÓN AVANZADA");
  
  const advancedBuilder = NotificationBuilder
    .create(ENotificationType.PROMOTION, {
      id: 'advanced-promo',
      title: 'Promoción Avanzada',
      message: 'Oferta con configuración compleja',
      timestamp: Date.now(),
      priority: 'high',
      data: { 
        discount: 50, 
        category: 'electronics',
        validUntil: new Date(Date.now() + 86400000) // 24 horas
      }
    })
    .withDecorators(['vibration', 'sound', 'logging', 'cache'])
    .withAutoProcess(false);  // No procesar automáticamente

  // Inspeccionar configuración antes de construir
  console.log("\n🔍 Configuración del builder:", advancedBuilder.inspect());

  // Construir sin enviar
  const advancedNotification = advancedBuilder.build();
  console.log("🏗️ Notificación construida (sin enviar):", advancedNotification.constructor.name);

  // Enviar manualmente
  advancedNotification.send?.();
}

function runExamples() {
  console.log("\n🎯 EJEMPLOS ESPECÍFICOS POR TIPO");
  console.log("==================================");

  NotificationBuilderExamples.promotionExample();
  NotificationBuilderExamples.orderExample();
  NotificationBuilderExamples.chatExample();
  NotificationBuilderExamples.systemExample();
  NotificationBuilderExamples.customExample();
}

function showBuilderAdvantages() {
  console.log("\n🚀 VENTAJAS DEL BUILDER PATTERN");
  console.log("===============================");
  
  console.log(`
  ✅ LEGIBILIDAD: Código más fácil de leer y entender
  ✅ FLEXIBILIDAD: Configuraciones opcionales y modulares
  ✅ REUTILIZACIÓN: Configuraciones predefinidas reutilizables
  ✅ VALIDACIÓN: Validación centralizada en el build()
  ✅ INMUTABILIDAD: Configuración step-by-step inmutable
  ✅ EXTENSIBILIDAD: Fácil añadir nuevos decoradores y opciones
  `);
}

// Ejecutar demostración
function main() {
  demonstrateBuilder();
  runExamples();
  showBuilderAdvantages();
}

main();
