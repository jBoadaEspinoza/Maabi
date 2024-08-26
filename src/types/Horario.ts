export interface Horario {
  id: string;                // ID único del horario de salida
  activity_id: string;       // ID de la actividad turística a la que pertenece el horario
  time: string;              // Hora de salida en formato ISO 8601 o similar
  active: boolean;           // Estado activo del horario de salida
}
