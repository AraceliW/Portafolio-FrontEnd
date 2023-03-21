import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-modal-educacion',
  templateUrl: './modal-educacion.component.html',
  styleUrls: ['./modal-educacion.component.css']
})


export class ModalEducacionComponent implements OnInit {

  nombreEducacion: string = '';
  establecimiento: string = '';
  imgEducacion: string = '';
  startEducacion: number = 0;
  endEducacion: number = 0;


  constructor(
    public dialogRef: MatDialogRef<ModalEducacionComponent>,
    private service: EducacionService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
  }



  onCreate(): void {
    const educacion = new Educacion(this.nombreEducacion, this.establecimiento, this.imgEducacion, this.startEducacion, this.endEducacion);
    this.service.save(educacion).subscribe(data => {
      this.dialogRef.close();
      this.snackbar.open('Educacion creada', 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    }, error => {
      this.snackbar.open(`Error al crear educacion: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    })
  }



  onNoClick(): void {
    this.dialogRef.close();
  }


}
