import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Skill } from 'src/app/model/skills';
import { SkillsService } from 'src/app/servicios/skills.service';

@Component({
  selector: 'app-modal-skills',
  templateUrl: './modal-skills.component.html',
  styleUrls: ['./modal-skills.component.css']
})


export class ModalSkillsComponent implements OnInit {

  nombreSkill: string = '';
  porcentajeSkillS: number = 0;


  constructor(
    public dialogRef: MatDialogRef<ModalSkillsComponent>,
    private service: SkillsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
  }


  onCreate(): void {
    if (this.porcentajeSkillS >= 0 && this.porcentajeSkillS <= 100) {
        const skill = new Skill(this.nombreSkill, this.porcentajeSkillS);
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
        });
    } else {
        this.snackBar.open('El porcentaje debe estar entre 0 y 100', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'bottom'
        });
    }
}


  onNoClick(): void {
    this.dialogRef.close();
  }

  formatLabel(value: number) {
    return value + '%';
  }


}
