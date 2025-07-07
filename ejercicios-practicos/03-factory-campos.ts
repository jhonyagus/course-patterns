/**
 * EJERCICIO 3: Factory de Componentes de UI Dinámicos
 * 
 * Contexto: Estás construyendo una aplicación React Native que necesita
 * renderizar formularios dinámicos basados en configuraciones que vienen
 * del backend. Cada campo puede tener diferentes tipos, validaciones,
 * y comportamientos específicos.
 * 
 * Requerimientos:
 * - Crear diferentes tipos de campos: texto, email, password, select, checkbox, etc.
 * - Cada tipo tiene validaciones específicas
 * - Algunos campos dependen de otros (campos condicionales)
 * - Necesitas poder añadir nuevos tipos sin modificar código existente
 * - Los campos deben manejar estado local y global (Redux)
 * 
 * Implementa un sistema que:
 * 1. Cree campos de formulario dinámicamente
 * 2. Maneje validaciones específicas por tipo
 * 3. Soporte campos condicionales
 * 4. Sea extensible para nuevos tipos de campo
 */

interface BaseFieldConfig {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  defaultValue?: any;
  validation?: ValidationRule[];
  dependsOn?: string;
  showWhen?: (value: any) => boolean;
}

interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'email' | 'password' | 'number';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select' | 'multiselect';
  options: { value: any; label: string; disabled?: boolean }[];
  multiple?: boolean;
}

interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox' | 'radio';
  options?: { value: any; label: string }[];
}

interface DateFieldConfig extends BaseFieldConfig {
  type: 'date' | 'datetime' | 'time';
  minDate?: Date;
  maxDate?: Date;
  format?: string;
}

type FieldConfig = TextFieldConfig | SelectFieldConfig | CheckboxFieldConfig | DateFieldConfig;

// Formulario de ejemplo: Registro de usuario
const registrationForm: FieldConfig[] = [
  {
    id: 'firstName',
    type: 'text',
    label: 'Nombre',
    required: true,
    placeholder: 'Ingresa tu nombre',
    validation: [
      { type: 'required', message: 'El nombre es requerido' },
      { type: 'minLength', value: 2, message: 'Mínimo 2 caracteres' }
    ]
  },
  {
    id: 'lastName',
    type: 'text',
    label: 'Apellido',
    required: true,
    placeholder: 'Ingresa tu apellido',
    validation: [
      { type: 'required', message: 'El apellido es requerido' },
      { type: 'minLength', value: 2, message: 'Mínimo 2 caracteres' }
    ]
  },
  {
    id: 'email',
    type: 'email',
    label: 'Correo electrónico',
    required: true,
    placeholder: 'ejemplo@correo.com',
    validation: [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' }
    ]
  },
  {
    id: 'password',
    type: 'password',
    label: 'Contraseña',
    required: true,
    placeholder: 'Crea una contraseña segura',
    validation: [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minLength', value: 8, message: 'Mínimo 8 caracteres' },
      { 
        type: 'custom', 
        message: 'Debe contener al menos una mayúscula, minúscula y número',
        validator: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
      }
    ]
  },
  {
    id: 'accountType',
    type: 'select',
    label: 'Tipo de cuenta',
    required: true,
    options: [
      { value: 'personal', label: 'Personal' },
      { value: 'business', label: 'Empresarial' },
      { value: 'developer', label: 'Desarrollador' }
    ],
    validation: [
      { type: 'required', message: 'Selecciona un tipo de cuenta' }
    ]
  },
  {
    id: 'companyName',
    type: 'text',
    label: 'Nombre de la empresa',
    required: true,
    placeholder: 'Nombre de tu empresa',
    dependsOn: 'accountType',
    showWhen: (value: any) => value === 'business',
    validation: [
      { type: 'required', message: 'El nombre de la empresa es requerido' }
    ]
  },
  {
    id: 'birthDate',
    type: 'date',
    label: 'Fecha de nacimiento',
    required: true,
    maxDate: new Date(),
    validation: [
      { type: 'required', message: 'La fecha de nacimiento es requerida' }
    ]
  },
  {
    id: 'interests',
    type: 'multiselect',
    label: 'Intereses',
    required: false,
    multiple: true,
    options: [
      { value: 'tech', label: 'Tecnología' },
      { value: 'sports', label: 'Deportes' },
      { value: 'music', label: 'Música' },
      { value: 'travel', label: 'Viajes' },
      { value: 'food', label: 'Gastronomía' }
    ]
  },
  {
    id: 'newsletter',
    type: 'checkbox',
    label: 'Suscribirse al newsletter',
    required: false,
    defaultValue: false
  },
  {
    id: 'terms',
    type: 'checkbox',
    label: 'Acepto los términos y condiciones',
    required: true,
    validation: [
      { 
        type: 'custom', 
        message: 'Debes aceptar los términos y condiciones',
        validator: (value: boolean) => value === true
      }
    ]
  }
];

// TODO: Implementar el sistema de factory de campos
// Considera:
// - Cómo crear diferentes tipos de campos de forma dinámica
// - Cómo manejar validaciones específicas por tipo
// - Cómo implementar campos condicionales
// - Cómo hacer el sistema extensible

console.log('Sistema de formularios dinámicos inicializado');
console.log('Configuración del formulario:', registrationForm);
