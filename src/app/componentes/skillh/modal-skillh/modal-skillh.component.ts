import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Skillh } from 'src/app/model/skillh';
import { SkillhService } from 'src/app/servicios/skillh.service';


@Component({
  selector: 'app-modal-skillh',
  templateUrl: './modal-skillh.component.html',
  styleUrls: ['./modal-skillh.component.css']
})


export class ModalSkillhComponent implements OnInit {

  nombreSkillH: string = '';
  porcentajeSkillH: number = 0;

  //Solo para el control de datos esteticos
  errorNombreSkillH: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalSkillhComponent>,
    private service: SkillhService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }



  ngOnInit(): void {
  }



  onCreate(): void {

    this.validarLongitudNombreSkillH(); // validar la longitud del nombre de habilidad

    if (!this.errorNombreSkillH) { // si no hay error de longitud
    if (this.porcentajeSkillH >= 0 && this.porcentajeSkillH <= 100) { // validar que la habilidad esté dentro del rango de 0 a 100
    const skill = new Skillh(this.nombreSkillH, this.porcentajeSkillH);
    this.service.save(skill).subscribe(data => {
      this.dialogRef.close();
      this.snackBar.open(`Skill creado correctamente`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    }, error => {
      this.snackBar.open(`Error al crear skill: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    })

  } else {
    this.snackBar.open(`El porcentaje de habilidad debe estar entre 0 y 100.`, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'bottom'
    })
  }
  } else {
    this.snackBar.open(`El nombre de la habilidad debe tener menos de 10 caracteres.`, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'bottom'
    })
  }

}



  onNoClick(): void {
    this.dialogRef.close();
  }



  formatLabel(value: number) {
    return value + '%';
  }


  //VALIDACION DE ENTRADA POR TEMAS ESTETICOS
  validarLongitudNombreSkillH() {
    if (this.nombreSkillH && this.nombreSkillH.length > 10) {
      this.errorNombreSkillH = true;
    } else {
      this.errorNombreSkillH = false;
    }
  }


}
