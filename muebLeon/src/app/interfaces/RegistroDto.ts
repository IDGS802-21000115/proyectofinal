import { Usuario } from "./usuario";

export interface RegistroDto
{
    nombre:string,
    usuario:Usuario,
    contrasenia:string,
    rol:string,
    direccion: string,
    tarjeta: string,
    fechaVencimiento: string,
    codigo: string
}