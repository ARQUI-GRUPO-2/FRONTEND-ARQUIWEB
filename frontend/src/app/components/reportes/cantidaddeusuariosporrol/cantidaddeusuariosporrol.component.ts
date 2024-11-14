import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';
import { CantidaddeUsuariosPorRolDTO } from '../../../models/CantidaddeUsuariosPorRolDTO';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-cantidaddeusuariosporrol',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIcon],
  templateUrl: './cantidaddeusuariosporrol.component.html',
  styleUrl: './cantidaddeusuariosporrol.component.css'
})
export class CantidaddeusuariosporrolComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombrerol','cantidad_usuarios'];
  dataSource: MatTableDataSource<CantidaddeUsuariosPorRolDTO> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private rS: RolService){}
  ngOnInit(): void {
    this.fetchNotiUsuario();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  fetchNotiUsuario():void{
    this.rS.getUsuarioNoti().subscribe(
      (data: CantidaddeUsuariosPorRolDTO[]) => {
        this.dataSource.data = data;
      },
      (error) =>{
        console.error('Error fetching center data', error)
      }
    );
   } 
}
