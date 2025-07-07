/**
 * EJERCICIO 6: Sistema de Recomendaciones Inteligente
 * 
 * Contexto: Tu aplicación de e-commerce necesita un sistema de recomendaciones
 * que combine múltiples algoritmos (collaborative filtering, content-based,
 * híbrido) y se adapte dinámicamente según el comportamiento del usuario
 * y el contexto de la aplicación.
 * 
 * Requerimientos:
 * - Diferentes algoritmos de recomendación
 * - Combinación dinámica de estrategias según el contexto
 * - Aprendizaje basado en feedback del usuario
 * - Optimización de performance para móviles
 * - Fallbacks cuando no hay suficientes datos
 * 
 * Implementa un sistema que:
 * 1. Combine múltiples algoritmos de recomendación
 * 2. Se adapte dinámicamente según el contexto
 * 3. Aprenda del feedback del usuario
 * 4. Optimice el rendimiento para dispositivos móviles
 */

interface User {
  id: string;
  demographics: {
    age: number;
    gender: string;
    location: string;
    income?: string;
  };
  preferences: {
    categories: string[];
    brands: string[];
    priceRange: { min: number; max: number };
    features: string[];
  };
  behavior: {
    totalPurchases: number;
    avgOrderValue: number;
    lastPurchaseDate: Date;
    browsingHistory: string[];
    searchQueries: string[];
    clickedItems: string[];
  };
  interactions: UserInteraction[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  features: string[];
  description: string;
  ratings: {
    average: number;
    count: number;
  };
  popularity: number;
  seasonality?: {
    peak: string[];
    low: string[];
  };
  metadata: {
    releaseDate: Date;
    tags: string[];
    specifications: Record<string, string>;
  };
}

interface UserInteraction {
  userId: string;
  productId: string;
  type: 'view' | 'click' | 'add-to-cart' | 'purchase' | 'rating' | 'share';
  timestamp: Date;
  context: {
    sessionId: string;
    device: string;
    location?: string;
    referrer?: string;
  };
  value?: number; // Para ratings
  duration?: number; // Para views
}

interface RecommendationContext {
  userId: string;
  currentPage: 'home' | 'product' | 'category' | 'cart' | 'search';
  currentProduct?: string;
  currentCategory?: string;
  searchQuery?: string;
  sessionData: {
    viewedProducts: string[];
    searchQueries: string[];
    timeOnPage: number;
  };
  deviceInfo: {
    type: 'mobile' | 'tablet' | 'desktop';
    connectionSpeed: 'slow' | 'medium' | 'fast';
    batteryLevel?: number;
  };
  timeContext: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    dayOfWeek: string;
    isWeekend: boolean;
    season: string;
  };
}

interface RecommendationRequest {
  userId: string;
  context: RecommendationContext;
  maxResults: number;
  categories?: string[];
  excludeProducts?: string[];
  priceRange?: { min: number; max: number };
  includeExplanations?: boolean;
}

interface RecommendationResult {
  productId: string;
  score: number;
  reasons: string[];
  algorithm: string;
  confidence: number;
  explanation?: string;
}

// Datos de ejemplo
const sampleUsers: User[] = [
  {
    id: 'user1',
    demographics: {
      age: 28,
      gender: 'F',
      location: 'Madrid, Spain'
    },
    preferences: {
      categories: ['electronics', 'fashion', 'home'],
      brands: ['Apple', 'Samsung', 'Nike'],
      priceRange: { min: 50, max: 500 },
      features: ['wireless', 'waterproof', 'eco-friendly']
    },
    behavior: {
      totalPurchases: 15,
      avgOrderValue: 125.50,
      lastPurchaseDate: new Date('2024-01-15'),
      browsingHistory: ['electronics', 'smartphones', 'accessories'],
      searchQueries: ['iphone case', 'wireless charger', 'bluetooth earbuds'],
      clickedItems: ['prod1', 'prod2', 'prod3']
    },
    interactions: []
  },
  {
    id: 'user2',
    demographics: {
      age: 35,
      gender: 'M',
      location: 'Barcelona, Spain'
    },
    preferences: {
      categories: ['sports', 'automotive', 'tools'],
      brands: ['Nike', 'Adidas', 'Bosch'],
      priceRange: { min: 100, max: 1000 },
      features: ['professional', 'durable', 'high-performance']
    },
    behavior: {
      totalPurchases: 8,
      avgOrderValue: 275.00,
      lastPurchaseDate: new Date('2024-01-10'),
      browsingHistory: ['sports', 'running', 'fitness'],
      searchQueries: ['running shoes', 'fitness tracker', 'protein powder'],
      clickedItems: ['prod4', 'prod5', 'prod6']
    },
    interactions: []
  }
];

const sampleProducts: Product[] = [
  {
    id: 'prod1',
    name: 'iPhone 15 Pro',
    category: 'electronics',
    brand: 'Apple',
    price: 999.99,
    features: ['5G', 'wireless-charging', 'waterproof', 'premium'],
    description: 'Latest iPhone with advanced features',
    ratings: { average: 4.8, count: 1205 },
    popularity: 95,
    seasonality: { peak: ['Q4'], low: ['Q2'] },
    metadata: {
      releaseDate: new Date('2023-09-15'),
      tags: ['smartphone', 'premium', 'flagship'],
      specifications: { storage: '128GB', display: '6.1"' }
    }
  },
  {
    id: 'prod2',
    name: 'AirPods Pro',
    category: 'electronics',
    brand: 'Apple',
    price: 249.99,
    features: ['wireless', 'noise-cancelling', 'premium'],
    description: 'Premium wireless earbuds with ANC',
    ratings: { average: 4.6, count: 892 },
    popularity: 88,
    metadata: {
      releaseDate: new Date('2023-10-01'),
      tags: ['audio', 'wireless', 'premium'],
      specifications: { battery: '6h', connectivity: 'Bluetooth 5.3' }
    }
  },
  {
    id: 'prod3',
    name: 'Nike Air Max 270',
    category: 'sports',
    brand: 'Nike',
    price: 159.99,
    features: ['comfortable', 'stylish', 'durable'],
    description: 'Comfortable running shoes for daily wear',
    ratings: { average: 4.4, count: 567 },
    popularity: 78,
    seasonality: { peak: ['spring', 'summer'], low: ['winter'] },
    metadata: {
      releaseDate: new Date('2023-03-01'),
      tags: ['shoes', 'running', 'casual'],
      specifications: { size: '8-12', color: 'multiple' }
    }
  }
];

const sampleInteractions: UserInteraction[] = [
  {
    userId: 'user1',
    productId: 'prod1',
    type: 'view',
    timestamp: new Date('2024-01-20T10:30:00'),
    context: {
      sessionId: 'sess1',
      device: 'mobile',
      location: 'Madrid'
    },
    duration: 45
  },
  {
    userId: 'user1',
    productId: 'prod1',
    type: 'add-to-cart',
    timestamp: new Date('2024-01-20T10:35:00'),
    context: {
      sessionId: 'sess1',
      device: 'mobile'
    }
  },
  {
    userId: 'user2',
    productId: 'prod3',
    type: 'purchase',
    timestamp: new Date('2024-01-18T14:20:00'),
    context: {
      sessionId: 'sess2',
      device: 'desktop'
    }
  },
  {
    userId: 'user2',
    productId: 'prod3',
    type: 'rating',
    timestamp: new Date('2024-01-25T09:15:00'),
    context: {
      sessionId: 'sess3',
      device: 'mobile'
    },
    value: 5
  }
];

// Ejemplos de contexto de recomendación
const sampleContexts: RecommendationContext[] = [
  {
    userId: 'user1',
    currentPage: 'home',
    sessionData: {
      viewedProducts: ['prod1', 'prod2'],
      searchQueries: ['iphone accessories'],
      timeOnPage: 120
    },
    deviceInfo: {
      type: 'mobile',
      connectionSpeed: 'fast',
      batteryLevel: 85
    },
    timeContext: {
      timeOfDay: 'evening',
      dayOfWeek: 'Friday',
      isWeekend: false,
      season: 'winter'
    }
  },
  {
    userId: 'user2',
    currentPage: 'product',
    currentProduct: 'prod3',
    sessionData: {
      viewedProducts: ['prod3'],
      searchQueries: ['running shoes'],
      timeOnPage: 180
    },
    deviceInfo: {
      type: 'desktop',
      connectionSpeed: 'fast'
    },
    timeContext: {
      timeOfDay: 'afternoon',
      dayOfWeek: 'Saturday',
      isWeekend: true,
      season: 'spring'
    }
  }
];

// TODO: Implementar el sistema de recomendaciones
// Considera diferentes algoritmos:
// 1. Collaborative Filtering (usuario-usuario, item-item)
// 2. Content-Based Filtering (basado en características)
// 3. Híbrido (combinación de múltiples algoritmos)
// 4. Context-Aware (basado en contexto)
// 5. Deep Learning (para patrones complejos)

// El sistema debe ser capaz de:
// - Combinar múltiples algoritmos dinámicamente
// - Adaptarse según el contexto y dispositivo
// - Aprender del feedback del usuario
// - Optimizar para rendimiento móvil
// - Proporcionar explicaciones de las recomendaciones

console.log('Sistema de recomendaciones inicializado');
console.log('Usuarios de ejemplo:', sampleUsers.length);
console.log('Productos de ejemplo:', sampleProducts.length);
console.log('Interacciones de ejemplo:', sampleInteractions.length);
