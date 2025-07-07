/**
 * EJERCICIO 4: Sistema de Cache Inteligente para API
 * 
 * Contexto: Tu aplicación React Native hace muchas llamadas a APIs y necesitas
 * un sistema de cache inteligente que optimice las peticiones, maneje diferentes
 * estrategias de cache según el tipo de dato, y mantenga los datos sincronizados.
 * 
 * Requerimientos:
 * - Diferentes estrategias de cache: memory, storage, network-first, cache-first
 * - Algunos datos necesitan invalidación automática (TTL)
 * - Otros requieren invalidación manual o por eventos
 * - El sistema debe ser transparente para el desarrollador
 * - Debe manejar casos de error y fallbacks
 * - Integración con Redux Saga para manejo asíncrono
 * 
 * Implementa un sistema que:
 * 1. Maneje diferentes estrategias de cache
 * 2. Invalide datos automáticamente según configuración
 * 3. Proporcione fallbacks cuando el cache no está disponible
 * 4. Sea transparente en su uso
 */

interface CacheConfig {
  key: string;
  strategy: 'memory' | 'storage' | 'network-first' | 'cache-first' | 'cache-only';
  ttl?: number; // Time to live en milisegundos
  maxSize?: number; // Máximo número de entradas
  invalidateOn?: string[]; // Eventos que invalidan el cache
  fallbackStrategy?: 'memory' | 'storage' | 'network';
  compression?: boolean;
  encryption?: boolean;
}

interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  expiresAt?: number;
  accessCount: number;
  lastAccessed: number;
  size: number;
  etag?: string;
}

interface APIRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
}

interface APIResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, string>;
  cached: boolean;
  source: 'memory' | 'storage' | 'network';
  timestamp: number;
}

// Configuraciones de cache para diferentes tipos de datos
const cacheConfigurations: Record<string, CacheConfig> = {
  // Datos de usuario - cache en memoria, TTL corto
  'user-profile': {
    key: 'user-profile',
    strategy: 'cache-first',
    ttl: 5 * 60 * 1000, // 5 minutos
    invalidateOn: ['user-updated', 'logout'],
    fallbackStrategy: 'network'
  },
  
  // Lista de productos - cache en storage, TTL largo
  'products-list': {
    key: 'products-list',
    strategy: 'cache-first',
    ttl: 30 * 60 * 1000, // 30 minutos
    maxSize: 100,
    invalidateOn: ['products-updated'],
    fallbackStrategy: 'storage',
    compression: true
  },
  
  // Detalles de producto - cache híbrido
  'product-details': {
    key: 'product-details',
    strategy: 'cache-first',
    ttl: 15 * 60 * 1000, // 15 minutos
    maxSize: 50,
    invalidateOn: ['product-updated'],
    fallbackStrategy: 'memory'
  },
  
  // Carrito de compras - siempre red primero
  'cart-data': {
    key: 'cart-data',
    strategy: 'network-first',
    ttl: 2 * 60 * 1000, // 2 minutos
    invalidateOn: ['cart-updated', 'checkout-completed'],
    fallbackStrategy: 'memory'
  },
  
  // Configuración de la app - cache persistente
  'app-config': {
    key: 'app-config',
    strategy: 'cache-first',
    ttl: 24 * 60 * 60 * 1000, // 24 horas
    invalidateOn: ['app-updated'],
    fallbackStrategy: 'storage',
    encryption: true
  },
  
  // Datos estáticos - cache indefinido
  'static-data': {
    key: 'static-data',
    strategy: 'cache-only',
    maxSize: 200,
    compression: true
  }
};

// Datos de prueba para simular respuestas de API
const mockAPIResponses = {
  '/api/user/profile': {
    id: '123',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    avatar: 'https://example.com/avatar.jpg',
    lastLogin: new Date().toISOString()
  },
  
  '/api/products': [
    { id: '1', name: 'iPhone 15', price: 999, category: 'electronics' },
    { id: '2', name: 'Samsung Galaxy', price: 899, category: 'electronics' },
    { id: '3', name: 'MacBook Pro', price: 1999, category: 'computers' }
  ],
  
  '/api/products/1': {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999,
    description: 'El iPhone más avanzado',
    specifications: { screen: '6.1"', storage: '128GB' },
    images: ['img1.jpg', 'img2.jpg'],
    stock: 15
  },
  
  '/api/cart': {
    id: 'cart_123',
    items: [
      { productId: '1', quantity: 1, price: 999 }
    ],
    total: 999,
    lastModified: new Date().toISOString()
  },
  
  '/api/config': {
    theme: 'light',
    language: 'es',
    notifications: true,
    analytics: false,
    version: '2.1.0'
  }
};

// Ejemplos de uso del sistema de cache
const exampleRequests: APIRequest[] = [
  {
    url: '/api/user/profile',
    method: 'GET'
  },
  {
    url: '/api/products',
    method: 'GET',
    params: { category: 'electronics', limit: 20 }
  },
  {
    url: '/api/products/1',
    method: 'GET'
  },
  {
    url: '/api/cart',
    method: 'GET'
  },
  {
    url: '/api/config',
    method: 'GET'
  }
];

// TODO: Implementar el sistema de cache inteligente
// Considera:
// - Cómo implementar diferentes estrategias de cache
// - Cómo manejar TTL y invalidación automática
// - Cómo proporcionar transparencia al desarrollador
// - Cómo optimizar el rendimiento y memoria
// - Cómo integrar con Redux Saga

console.log('Sistema de cache inteligente inicializado');
console.log('Configuraciones de cache:', cacheConfigurations);
console.log('Requests de ejemplo:', exampleRequests);
