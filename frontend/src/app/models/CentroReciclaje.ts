import { Usuario } from "./Usuario"

export class CentroReciclaje {
    idCentroReciclaje:number=0
    direccion:string=""
    latitud:any
    longitud:any
    horario:string=""
    favoritos: boolean | null = null
    us: Usuario | null = null
}