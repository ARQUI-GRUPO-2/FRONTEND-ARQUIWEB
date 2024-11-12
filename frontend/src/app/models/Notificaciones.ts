import { Noticias } from "./Noticias"
import { Usuario } from "./Usuario"

export class Notificaciones {
    idNotificaciones:number=0
    mensaje:string=""
    estado:boolean=true
    fecha:Date=new Date(Date.now())
    noti:Noticias=new Noticias()
    us:Usuario=new Usuario()
}
