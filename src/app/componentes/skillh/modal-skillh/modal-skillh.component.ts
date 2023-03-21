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

  constructor(
    public dialogRef: MatDialogRef<ModalSkillhComponent>,
    private service: SkillhService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }



  ngOnInit(): void {
  }



  onCreate(): void {
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
  }



  onNoClick(): void {
    this.dialogRef.close();
  }



  formatLabel(value: number) {
    return value + '%';
  }


}
