import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Skill } from 'src/app/model/skills';
import { SkillsService } from 'src/app/servicios/skills.service';


@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.css']
})



export class EditSkillsComponent implements OnInit {

  skills: Skill = new Skill("", 0);

  constructor(
    private service: SkillsService,
    public dialogRef: MatDialogRef<EditSkillsComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  
  ngOnInit(): void {
    this.service.detail(this.data.id).subscribe(data => {
      this.skills = data;
    }, error => {
      this._snackBar.open(`Error al cargar skill: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    })
  }




  onUpdate(id: any): void {
    // Verificar que el valor de porcentajeSkillS esté entre 0 y 100
    if (this.skills.porcentajeSkillS >= 0 && this.skills.porcentajeSkillS <= 100) {
        this.service.update(id, this.skills).subscribe(data => {
            this.dialogRef.close();
            this._snackBar.open(`Skills actualizado correctamente`, 'Cerrar', {
                duration: 2000,
                verticalPosition: 'bottom'
            })
        }, error => {
            this._snackBar.open(`Error al actualizar skill: ${error.error.mensaje}`, 'Cerrar', {
                duration: 2000,
                verticalPosition: 'bottom'
            })
        });
    } else {
        this._snackBar.open('El porcentaje debe estar entre 0 y 100', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'bottom'
        });
        // Enfocar el campo de habilidad para que el usuario pueda corregirlo
        const porcentajeSkillInput = document.getElementById('porcentajeSkillS') as HTMLInputElement;
        porcentajeSkillInput.focus();
    }
}





  
  onNoClick(): void {
    this.dialogRef.close();
  }
  

  formatLabel(value: number) {
    return value + '%';
  }

}
