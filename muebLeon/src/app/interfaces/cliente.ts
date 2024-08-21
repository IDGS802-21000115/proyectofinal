import { Usuario } from "./usuario"

export interface Cliente {
    id: number,
    nombre:string,
    usuario: Usuario,
    contrasenia:string,
    estatus:number
  }