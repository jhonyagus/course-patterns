import { ENotificationType } from "../models/enums/notification-types.ts";
import { INotificationData } from "../models/interfaces/notification-data.ts";
import { NotificationManager } from "../factory/notification-manager.ts";
import { NotificationProcessor } from "../strategy/notification-strategy.ts";
import {
  CacheDecorator,
  LoggingDecorator,
  SoundDecorator,
  VibrationDecorator,
} from "../decorator/notification-decorator.ts";
import { TNotificationInput } from "../factory/notifications.ts";

//! Generado por Copilot

// Tipos para configuración del builder
type DecoratorType = 'cache' | 'logging' | 'sound' | 'vibration';

interface BuilderConfig {
  type: ENotificationType;
  data: TNotificationInput;
  decorators: DecoratorType[];
  customStrategy?: any;
  autoProcess?: boolean;
}

export class NotificationBuilder {
  private config: Partial<BuilderConfig> = {
    decorators: [],
    autoProcess: true
  };

  // Método estático para iniciar el builder
  static create(type: ENotificationType, data: TNotificationInput): NotificationBuilder {
    const builder = new NotificationBuilder();
    builder.config.type = type;
    builder.config.data = data;
    return builder;
  }

  // Añadir decoradores individuales
  withCache(): NotificationBuilder {
    this.config.decorators!.push('cache');
    return this;
  }

  withLogging(): NotificationBuilder {
    this.config.decorators!.push('logging');
    return this;
  }

  withSound(): NotificationBuilder {
    this.config.decorators!.push('sound');
    return this;
  }

  withVibration(): NotificationBuilder {
    this.config.decorators!.push('vibration');
    return this;
  }

  // Añadir múltiples decoradores de una vez
  withDecorators(decorators: DecoratorType[]): NotificationBuilder {
    this.config.decorators!.push(...decorators);
    return this;
  }

  // Configurar estrategia personalizada
  withStrategy(strategy: any): NotificationBuilder {
    this.config.customStrategy = strategy;
    return this;
  }

  // Configurar si debe procesar automáticamente
  withAutoProcess(autoProcess: boolean): NotificationBuilder {
    this.config.autoProcess = autoProcess;
    return this;
  }

  // Configuraciones predefinidas comunes
  withStandardBehaviors(): NotificationBuilder {
    return this.withLogging().withCache();
  }

  withUrgentBehaviors(): NotificationBuilder {
    return this.withVibration().withSound().withLogging();
  }

  withSilentBehaviors(): NotificationBuilder {
    return this.withCache().withLogging();
  }

  // Método para construir la notificación final
  build(): INotificationData {
    if (!this.config.type || !this.config.data) {
      throw new Error('Type and data are required to build notification');
    }

    // 1. Crear la notificación base usando Factory
    let notification = NotificationManager.createNotification(
      this.config.type,
      this.config.data
    );

    // 2. Procesar con Strategy si está habilitado
    if (this.config.autoProcess) {
      NotificationProcessor.process(notification, this.config.type);
    }

    // 3. Aplicar decoradores en orden
    notification = this.applyDecorators(notification);

    return notification;
  }

  // Método para construir y enviar inmediatamente
  buildAndSend(): INotificationData {
    const notification = this.build();
    notification.send?.();
    return notification;
  }

  // Método privado para aplicar decoradores
  private applyDecorators(notification: INotificationData): INotificationData {
    let decoratedNotification = notification;

    // Aplicar decoradores en el orden especificado
    for (const decoratorType of this.config.decorators!) {
      switch (decoratorType) {
        case 'cache':
          decoratedNotification = new CacheDecorator(decoratedNotification);
          break;
        case 'logging':
          decoratedNotification = new LoggingDecorator(decoratedNotification);
          break;
        case 'sound':
          decoratedNotification = new SoundDecorator(decoratedNotification);
          break;
        case 'vibration':
          decoratedNotification = new VibrationDecorator(decoratedNotification);
          break;
      }
    }

    return decoratedNotification;
  }

  // Método para inspeccionar la configuración actual
  inspect(): Partial<BuilderConfig> {
    return { ...this.config };
  }

  // Método para resetear el builder
  reset(): NotificationBuilder {
    this.config = {
      decorators: [],
      autoProcess: true
    };
    return this;
  }
}

// Ejemplos de uso:

export class NotificationBuilderExamples {
  static promotionExample(): void {
    console.log('\n=== EJEMPLO: Promoción con Builder ===');
    
    const notification = NotificationBuilder
      .create(ENotificationType.PROMOTION, {
        id: 'promo-001',
        title: 'Oferta Flash',
        message: '70% descuento en electrónicos',
        timestamp: Date.now(),
        priority: 'high',
        data: { discount: 70, category: 'electronics' }
      })
      .withUrgentBehaviors()  // vibration + sound + logging
      .withCache()
      .buildAndSend();

    console.log('Notificación creada:', notification.constructor.name);
  }

  static orderExample(): void {
    console.log('\n=== EJEMPLO: Pedido con Builder ===');
    
    const notification = NotificationBuilder
      .create(ENotificationType.ORDER, {
        id: 'order-001',
        title: 'Pedido Confirmado',
        message: 'Tu pedido #12345 ha sido confirmado',
        timestamp: Date.now(),
        priority: 'medium',
        data: { orderId: '12345', amount: 299.99 }
      })
      .withStandardBehaviors()  // logging + cache
      .withSound()
      .buildAndSend();

    console.log('Notificación creada:', notification.constructor.name);
  }

  static chatExample(): void {
    console.log('\n=== EJEMPLO: Chat con Builder ===');
    
    const notification = NotificationBuilder
      .create(ENotificationType.CHAT, {
        id: 'chat-001',
        title: 'Nuevo Mensaje',
        message: 'Tienes un mensaje de soporte',
        timestamp: Date.now(),
        priority: 'urgent',
        data: { chatId: 'chat_789', senderId: 'support' }
      })
      .withDecorators(['vibration', 'sound'])  // múltiples decoradores
      .withAutoProcess(false)  // no procesar automáticamente
      .build();

    // Procesar manualmente después
    NotificationProcessor.process(notification, ENotificationType.CHAT);
    notification.send?.();
  }

  static systemExample(): void {
    console.log('\n=== EJEMPLO: Sistema con Builder ===');
    
    const notification = NotificationBuilder
      .create(ENotificationType.SYSTEM, {
        id: 'sys-001',
        title: 'Actualización',
        message: 'Nueva versión disponible',
        timestamp: Date.now(),
        priority: 'low',
        data: { version: '2.1.0' }
      })
      .withSilentBehaviors()  // cache + logging solamente
      .buildAndSend();

    console.log('Notificación creada:', notification.constructor.name);
  }

  static customExample(): void {
    console.log('\n=== EJEMPLO: Configuración Personalizada ===');
    
    const builder = NotificationBuilder
      .create(ENotificationType.PROMOTION, {
        id: 'custom-001',
        title: 'Promoción Personalizada',
        message: 'Oferta especial para ti',
        timestamp: Date.now(),
        priority: 'high',
        data: { customData: 'value' }
      })
      .withVibration()
      .withLogging()
      .withCache();

    // Inspeccionar configuración antes de construir
    console.log('Configuración actual:', builder.inspect());

    const notification = builder.buildAndSend();
    console.log('Notificación creada:', notification.constructor.name);
  }
}
