import { MateriaPrima } from "./materiaPrima";
import { Producto } from "./producto";

export interface DetalleConsumo{
    id:number,
    producto: Producto[],
    materiaPrima: MateriaPrima[],
    cantidad: number
}