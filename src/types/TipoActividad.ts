export interface TipoActividad {
    object: string;                       // Tipo de objeto, por ejemplo, "ActivityType"
    id: string;                          // ID del tipo de actividad
    singular_denomination_es: string;    // Denominación singular en español
    plural_denomination_es: string;      // Denominación plural en español
    singular_denomination_en: string;    // Denominación singular en inglés
    plural_denomination_en: string;      // Denominación plural en inglés
    active: boolean;                     // Estado activo del tipo de actividad
  }