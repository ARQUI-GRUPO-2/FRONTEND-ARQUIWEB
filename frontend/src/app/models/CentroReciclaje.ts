import { Usuario } from "./Usuario"

export class CentroReciclaje {
    idCentroReciclaje:number=0
    direccion:string=""
    latitud:any
    longitud:any
    horario:string=""
    us: Usuario | null = null
}