# Ejercicios Prácticos - Patrones de Diseño

Este directorio contiene ejercicios prácticos avanzados para aplicar patrones de diseño en contextos reales de desarrollo con **TypeScript**, **React Native**, **Redux Toolkit** y **Redux Saga**.

## 🎯 Objetivo

Estos ejercicios están diseñados para ser resueltos **sin pistas explícitas** sobre qué patrón de diseño usar. El objetivo es que identifiques qué patrón(es) son más apropiados para cada escenario y los implementes de manera efectiva.

## 📋 Lista de Ejercicios

### 1. Sistema de Notificaciones Push (`01-sistema-notificaciones.ts`)
**Contexto**: Sistema de notificaciones para e-commerce con diferentes tipos y comportamientos.
- ✅ Diferentes tipos de notificaciones (promociones, pedidos, chat, sistema)
- ✅ Comportamientos adicionales (caché, logging, vibración, sonido)
- ✅ Combinación dinámica de comportamientos
- ✅ Procesamiento según tipo y prioridad

### 2. Estado de Carrito de Compras (`02-estado-carrito.ts`)
**Contexto**: Manejo robusto del estado del carrito con Redux Toolkit.
- ✅ Estados del carrito (vacío, activo, procesando, error, checkout)
- ✅ Transiciones de estado automáticas
- ✅ Cálculos eficientes (totales, descuentos, shipping)
- ✅ Validaciones específicas por estado

### 3. Factory de Componentes UI (`03-factory-campos.ts`)
**Contexto**: Formularios dinámicos basados en configuraciones del backend.
- ✅ Diferentes tipos de campos (texto, email, select, checkbox, etc.)
- ✅ Validaciones específicas por tipo
- ✅ Campos condicionales
- ✅ Sistema extensible para nuevos tipos

### 4. Sistema de Cache Inteligente (`04-cache-inteligente.ts`)
**Contexto**: Cache optimizado para APIs con diferentes estrategias.
- ✅ Múltiples estrategias (memory, storage, network-first, cache-first)
- ✅ Invalidación automática (TTL) y manual
- ✅ Fallbacks y manejo de errores
- ✅ Integración con Redux Saga

### 5. Sistema de Comandos (`05-sistema-comandos.ts`)
**Contexto**: Navegación compleja con undo/redo y validaciones.
- ✅ Comandos de navegación programática
- ✅ Soporte para undo/redo
- ✅ Validaciones previas a ejecución
- ✅ Rollback automático en errores

### 6. Algoritmo de Recomendaciones (`06-recomendaciones.ts`)
**Contexto**: Sistema de recomendaciones que combina múltiples algoritmos.
- ✅ Múltiples algoritmos (collaborative, content-based, híbrido)
- ✅ Adaptación dinámica según contexto
- ✅ Aprendizaje basado en feedback
- ✅ Optimización para móviles

## 🚀 Cómo Trabajar

1. **Lee el contexto**: Entiende completamente el problema antes de empezar
2. **Identifica patrones**: Piensa qué patrón(es) de diseño serían más apropiados
3. **Implementa la solución**: Desarrolla una solución completa y funcional
4. **Prueba tu código**: Asegúrate de que funciona con los datos de ejemplo
5. **Revisa y refactoriza**: Mejora tu implementación

## 🎨 Patrones que Podrías Necesitar

### Creacionales
- **Builder**: Para construir objetos complejos paso a paso
- **Factory Method**: Para crear objetos sin especificar su clase exacta
- **Abstract Factory**: Para familias de objetos relacionados
- **Singleton**: Para instancias únicas globales
- **Prototype**: Para clonar objetos complejos

### Estructurales
- **Adapter**: Para hacer compatible interfaces incompatibles
- **Bridge**: Para separar abstracción de implementación
- **Composite**: Para estructuras de árbol de objetos
- **Decorator**: Para añadir funcionalidad dinámicamente
- **Facade**: Para simplificar interfaces complejas
- **Flyweight**: Para optimizar memoria con objetos similares
- **Proxy**: Para controlar acceso a objetos

### Comportamiento
- **Chain of Responsibility**: Para cadenas de manejadores
- **Command**: Para encapsular requests como objetos
- **Iterator**: Para recorrer colecciones
- **Mediator**: Para comunicación entre objetos
- **Memento**: Para guardar/restaurar estado
- **Observer**: Para notificaciones automáticas
- **State**: Para cambiar comportamiento según estado
- **Strategy**: Para algoritmos intercambiables
- **Template Method**: Para esqueletos de algoritmos
- **Visitor**: Para operaciones sobre estructuras de objetos

## 📝 Notas Importantes

- **No hay pistas explícitas**: Los ejercicios no indican qué patrón usar
- **Múltiples soluciones**: Algunos problemas pueden resolverse con diferentes patrones
- **Combina patrones**: Algunos ejercicios requieren múltiples patrones trabajando juntos
- **Contexto real**: Todos los ejercicios están basados en problemas reales de desarrollo
- **Performance**: Considera siempre el rendimiento en dispositivos móviles

## 🔍 Después de Completar

Una vez que termines cada ejercicio:
1. Documenta qué patrón(es) usaste y por qué
2. Explica las decisiones de diseño que tomaste
3. Identifica posibles mejoras o alternativas
4. Prepárate para discutir tu solución

¡Buena suerte! 🍀
