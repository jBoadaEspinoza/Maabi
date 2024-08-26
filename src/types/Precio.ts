export interface Precio {
    object: string;        // Tipo de objeto, en este caso "Price"
    id: string;            // ID único del precio
    amount: number;        // Monto del precio
    currency: string;      // Moneda en la que se expresa el precio
    activity_id: string;   // ID de la actividad a la que pertenece el precio
    price_type_id: number; // ID del tipo de precio
  }
  