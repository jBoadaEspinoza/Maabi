export interface Horario {
    id: string;                // ID único del horario de salida
    activityId: string;        // ID de la actividad turística a la que pertenece el horario
    departureTime: string;     // Hora de salida en formato ISO 8601 o similar
    description?: string;      // Descripción opcional del horario de salida
    active: boolean;           // Estado activo del horario de salida
    // Puedes agregar otros campos según la respuesta de la API
  }