import { Noticias } from "./Noticias"
import { Usuario } from "./Usuario"

export class Notificaciones {
    idNotificaciones:number=0
    mensaje:string=""
    fecha:Date=new Date(Date.now())
    //noti:Noticias=new Noticias()
    //us:Usuario=new Usuario()
    noti: Noticias | null = null
    us: Usuario | null = null
}
