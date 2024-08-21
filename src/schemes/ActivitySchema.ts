// src/schemas/activitySchema.ts
import { z } from 'zod';

// Define el esquema de validación
export const activitySchema = z.object({
  name_es: z.string()
    .min(1, 'El nombre en español es obligatorio')
    .max(250, 'El nombre en español no puede exceder los 250 caracteres'),
  name_en: z.string()
    .min(1, 'El nombre en inglés es obligatorio')
    .max(250, 'El nombre en inglés no puede exceder los 250 caracteres'),
  description_es: z.string()
    .min(1, 'La descripción en español es obligatoria')
    .max(1000, 'La descripción en español no puede exceder los 1000 caracteres'),
  description_en: z.string()
    .min(1, 'La descripción en inglés es obligatoria')
    .max(1000, 'La descripción en inglés no puede exceder los 1000 caracteres'),
  place_id: z.string().min(1, 'El ID del lugar es obligatorio'),
  type_id: z.string().min(1, 'El ID del tipo de actividad es obligatorio'),
  traditional: z.boolean().optional().default(true),
  active: z.boolean().optional().default(true),
});
