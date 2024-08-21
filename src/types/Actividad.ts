import type { Interes } from "./Interes";

export interface Actividad {
    object: string;
    id: string;
    name_es: string;
    name_en: string;
    description_es: string;
    description_en: string;
    created_utc: number;
    traditional: boolean;
    place_id: string;
    type_id: string;
    active: boolean;
    interests: Interes[];
}
