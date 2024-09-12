// Definición del tipo Venta
export interface Venta {
    object: string; // Tipo de objeto, por ejemplo "Sale"
    id: string; // Identificador único de la venta
    date_created: number; // Fecha de creación en formato de timestamp (milisegundos desde la época Unix)
    documentNumber: string; // Número del documento
    documentSerieId: string; // Identificador de la serie del documento
    documentFile: string; // Archivo del documento
    customerId: string | null; // Identificador del cliente, puede ser nulo si no hay cliente asociado
    closed: boolean; // Indica si la venta está cerrada o no
  }
  