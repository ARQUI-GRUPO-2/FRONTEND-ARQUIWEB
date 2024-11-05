import { Usuario } from "./Usuario"

export class CentroReciclaje {
    idCentroReciclaje:number=0
    direccion:string=""
    latitud:string=""
    longitud:string=""
    horario:string=""
    favoritos:boolean=false
    us:Usuario=new Usuario()
}