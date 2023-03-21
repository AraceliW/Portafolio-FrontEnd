import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proyecto } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { TokenService } from 'src/app/servicios/token.service';
import { EditProyectosComponent } from './edit-proyectos/edit-proyectos.component';
import { ModalProyectosComponent } from './modal-proyectos/modal-proyectos.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})



export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[];

  constructor(
    private service: ProyectosService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { this.proyectos = []; }




  isLogged = false;


  ngOnInit(): void {
    this.cargarProyectos();
    this.tokenService.getToken() ? this.isLogged = true : this.isLogged = false;
  }



  cargarProyectos(): void {
    this.service.lista().subscribe(data => {
      this.proyectos = data;
    });
  }



  delete(id: any): void {
    if (id != undefined) {
      this.service.delete(id).subscribe(data => {
        this.cargarProyectos();

        this._snackBar.open('Proyecto eliminado', 'Cerrar', {
          duration: 2000,
          verticalPosition: 'bottom'
        });

      }, error => {
        this._snackBar.open(`Error al eliminar proyecto: ${error.error.mensaje}`, 'Cerrar', {
          duration: 2000,
          verticalPosition: 'bottom'
        });
      });
    }
  }



  openDialogNew(): void {
    const dialogRef = this.dialog.open(ModalProyectosComponent, {
      width: '500px',
      data: 'rigth click'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarProyectos();
    });
  }



  openDialogEdit(id: any): void {
    const dialogRef = this.dialog.open(EditProyectosComponent, {
      width: '500px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarProyectos();
    });
  }

  
}
