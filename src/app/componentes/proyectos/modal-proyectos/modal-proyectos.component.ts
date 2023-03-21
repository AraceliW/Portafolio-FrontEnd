import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proyecto } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-modal-proyectos',
  templateUrl: './modal-proyectos.component.html',
  styleUrls: ['./modal-proyectos.component.css']
})


export class ModalProyectosComponent  implements OnInit  {
  nombreProyecto: string = '';
  url: string = '';
  imgProyecto: string = '';
  endProyecto: number = 0;
  descripcionProyecto: string = '';

  
  constructor(
    public dialogRef: MatDialogRef<ModalProyectosComponent>,
    private service: ProyectosService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
  }


  onCreate(): void {
    const proyectos = new Proyecto(this.nombreProyecto, this.url, this.imgProyecto, this.endProyecto, this.descripcionProyecto);
    this.service.save(proyectos).subscribe(data => {
      this.dialogRef.close();
      this.snackbar.open('Proyecto creado', 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    }, error => {
      this.snackbar.open(`Error al crear proyecto: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    })
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }


}
