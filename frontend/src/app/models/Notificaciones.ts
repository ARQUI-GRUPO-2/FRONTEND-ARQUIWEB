import { Noticias } from "./Noticias"

export class Notificaciones {
    idNotificaciones:number=0
    mensaje:string=""
    fecha:Date=new Date(Date.now())
    noti: Noticias | null = null
}
