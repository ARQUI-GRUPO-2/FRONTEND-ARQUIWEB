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


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  role:String='';

  constructor(private uS: UsuarioService, private cdr: ChangeDetectorRef, private lS:LoginService) { }

  ngOnInit(): void {
    const userId = this.lS.getID(); 
    this.role = this.lS.showRole(); 
  
    if (this.role === 'ADMI') {
      this.uS.list().subscribe((usuarios) => {
        this.dataSource.data = usuarios;
        this.dataSource.paginator = this.paginator;
      });
    } else if (this.role === 'CLIENTE' && userId) {
      this.uS.listId(userId).subscribe((usuario) => {
        this.dataSource.data = [usuario]; 
        this.dataSource.paginator = this.paginator;
      });
    } else {
      console.error('No se pudo obtener el rol o ID del usuario');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }


  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  isAdmi(): boolean {
    return this.role === 'ADMI';
  }
}
