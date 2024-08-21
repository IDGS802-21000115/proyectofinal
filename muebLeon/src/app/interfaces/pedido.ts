
export interface IPedidoDetalle {
    idDetallePedido?: number;
    idProducto: number;
    cantidad: number;
    subtotal: number;
  }
  
  
  export interface IPedido {
    idPedido?: number; // Opcional, porque es generado en el servidor
    idCliente: number;
    idEmpleado: number;
    fecha: string;
    total: number;
    estatus?: string; // Opcional, también generado en el servidor
    detalles: IPedidoDetalle[];
  }
  
  
  