import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarusuario',
  standalone: true,

  imports: [MatTableModule,
    CommonModule,
    RouterLink,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginatorModule, MatCardModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css',
})
export class ListarusuarioComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  //se agrega:
  //form: FormGroup; 
  //noResults: boolean = false; 
  //nombrebusqueda:string=""

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UsuarioService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource.data = data;
      //this.cargarUsuarios();
      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  /* Cargar la lista de usuarios dependiendo del rol
  cargarUsuarios(): void {
    this.uS.getUsers().subscribe((data) => {
      this.dataSource.data = data;
    });
  }*/

  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
