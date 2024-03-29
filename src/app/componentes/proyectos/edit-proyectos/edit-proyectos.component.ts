import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proyecto } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';


@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.css']
})


export class EditProyectosComponent implements OnInit {

  proyectos: Proyecto = new Proyecto("", "", "", 0, "");


  constructor(
    private service: ProyectosService,
    public dialogRef: MatDialogRef<EditProyectosComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  public years: number[] = [];


  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for(let i = currentYear; i >= 1900; i--){
        this.years.push(i);
    }


    this.service.detail(this.data.id).subscribe(data => {
      this.proyectos = data;
    }, error => {
      this.snackbar.open(`Error al cargar el proyecto: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    })
  }



  onUpdate(id: any): void {
    this.service.update(id, this.proyectos).subscribe(data => {
      this.dialogRef.close();
      this.snackbar.open('Proyecto actualizado', 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    }, error => {
      this.snackbar.open(`Error al actualizar proyecto: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    })
  }




  onNoClick(): void {
    this.dialogRef.close();
  }



}
