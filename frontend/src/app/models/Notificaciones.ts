import { Noticias } from "./Noticias"

export class Notificaciones {
    idNotificaciones:number=0
    mensaje:string=""
    estado:boolean=true
    fecha:Date=new Date(Date.now())
    noti: Noticias | null = null
}
