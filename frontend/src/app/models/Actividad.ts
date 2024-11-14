import { CentroReciclaje } from "./CentroReciclaje"
import { TipoActividad } from "./TipoActividad"
import { Usuario } from "./Usuario"

export class Actividad{
    idActividad:number=0
    fecha_recepcion:string=""
    descripcion:string=""
    nombre:string=""
    puntos: number = 0
    cantidad:string=""
    ta:TipoActividad=new TipoActividad()
    cr:CentroReciclaje=new CentroReciclaje()
    u:Usuario=new Usuario()
}