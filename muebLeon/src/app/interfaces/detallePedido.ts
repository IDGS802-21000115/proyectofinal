import { IPedido } from "./pedido";
import { IProducto } from "./products";

export interface DetallePedido{
    id:number,
    nombre:string,
    pedido: IPedido[],
    producto: IProducto[],
    cantidad: number,
    subtotal: number
}