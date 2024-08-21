import { Pedido } from "./pedidos";

export interface Venta{
    id:number,
    pedido: Pedido,
    fecha: Date
}