import { Actividad } from "./Actividad"

export class Recompensas{
    idRecompensas:number=0
    nombreRecompensa:string=""
    descripcionRecompensa:string=""
    fechaVencimiento:Date=new Date(Date.now())
    ac: Actividad | null = null
}