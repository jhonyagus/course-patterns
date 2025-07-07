/**
 * EJERCICIO 2: Sistema de Estado de Carrito de Compras
 * 
 * Contexto: En tu aplicación de e-commerce con Redux Toolkit, necesitas
 * implementar un sistema robusto para manejar el estado del carrito que
 * sea eficiente y mantenga la integridad de los datos.
 * 
 * Requerimientos:
 * - El carrito puede tener diferentes estados: vacío, activo, procesando, error
 * - Cada estado tiene comportamientos específicos (qué acciones están permitidas)
 * - El sistema debe manejar transiciones de estado automáticas
 * - Debe calcular totales, descuentos y shipping de forma eficiente
 * - Necesita validaciones específicas para cada estado
 * 
 * Implementa un sistema que:
 * 1. Maneje los diferentes estados del carrito
 * 2. Permita transiciones válidas entre estados
 * 3. Ejecute comportamientos específicos según el estado actual
 * 4. Optimice los cálculos para evitar re-renders innecesarios
 */

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  category: string;
  discountEligible: boolean;
}

interface CartDiscount {
  id: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'category';
  value: number;
  conditions: {
    minAmount?: number;
    applicableCategories?: string[];
    requiredItems?: string[];
  };
}

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
  available: boolean;
}

// Estados posibles del carrito
const CART_STATES = {
  EMPTY: 'empty',
  ACTIVE: 'active',
  PROCESSING: 'processing',
  ERROR: 'error',
  CHECKOUT: 'checkout'
} as const;

type CartState = typeof CART_STATES[keyof typeof CART_STATES];

// Datos de prueba
const sampleItems: CartItem[] = [
  {
    id: 'item1',
    productId: 'prod123',
    name: 'iPhone 15 Pro',
    price: 999.99,
    quantity: 1,
    maxQuantity: 3,
    category: 'electronics',
    discountEligible: true
  },
  {
    id: 'item2',
    productId: 'prod456',
    name: 'AirPods Pro',
    price: 249.99,
    quantity: 2,
    maxQuantity: 5,
    category: 'electronics',
    discountEligible: true
  },
  {
    id: 'item3',
    productId: 'prod789',
    name: 'Phone Case',
    price: 29.99,
    quantity: 1,
    maxQuantity: 10,
    category: 'accessories',
    discountEligible: false
  }
];

const sampleDiscounts: CartDiscount[] = [
  {
    id: 'discount1',
    type: 'percentage',
    value: 10,
    conditions: { minAmount: 500 }
  },
  {
    id: 'discount2',
    type: 'category',
    value: 15,
    conditions: { applicableCategories: ['electronics'] }
  }
];

const sampleShippingOptions: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 9.99,
    estimatedDays: 5,
    available: true
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 19.99,
    estimatedDays: 2,
    available: true
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    price: 39.99,
    estimatedDays: 1,
    available: false
  }
];

// TODO: Implementar el sistema de estados del carrito
// Considera qué patrón de diseño sería más apropiado para:
// - Manejar los diferentes estados y sus transiciones
// - Optimizar cálculos complejos
// - Validar operaciones según el estado actual

console.log('Sistema de carrito inicializado');
console.log('Items de prueba:', sampleItems);
console.log('Descuentos disponibles:', sampleDiscounts);
console.log('Opciones de envío:', sampleShippingOptions);
