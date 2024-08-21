import { Compras } from "./compras";
import { MateriaPrima } from "./materiaPrima";

export interface DetalleCompra{
    id:number,
    idMateriaPrima: MateriaPrima,
    cantidad: number,
    subtotal: number
}