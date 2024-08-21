import { DetalleCompra } from "./detalleCompras";

export interface Compras {
    idCompra?: number; // Opcional si es generado por el backend
    idProveedor: number; // Solo el ID del proveedor
    idEmpleado: number; // Solo el ID del empleado
    fecha: Date;
    total: number; // Asegúrate de calcular el total en el frontend
    detalleCompras: DetalleCompra[];
}
