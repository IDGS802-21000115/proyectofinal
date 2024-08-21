import { Compras } from "./compras";

export interface Proveedor{
    idProveedor:number,
    nombreProveedor: string,
    descripcion:string,
    telefono: string,
    estatus: number,
    compras: Compras[]
}