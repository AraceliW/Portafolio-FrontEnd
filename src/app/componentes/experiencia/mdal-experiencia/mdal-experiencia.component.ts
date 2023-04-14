import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-mdal-experiencia',
  templateUrl: './mdal-experiencia.component.html',
  styleUrls: ['./mdal-experiencia.component.css']
})

export class MdalExperienciaComponent implements OnInit {

  nombreExperiencia: string = '';
  descripcionExperiencia: string = '';
  compania: string = '';
  imgExp: string = '';
  startExp: number = 0;
  endExp: number = 0;
  years: number[] = [];


  constructor(
    public dialogRef: MatDialogRef<MdalExperienciaComponent>,
    private service: ExperienciaService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
  }

  onCreate(): void {
    const expe = new Experiencia(this.nombreExperiencia, this.descripcionExperiencia, this.compania, this.imgExp, this.startExp, this.endExp);
    this.service.save(expe).subscribe(data => {
      this.dialogRef.close();
      this.snackbar.open('Experiencia creada', 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    }, error => {
      this.snackbar.open(`Error al crear experiencia: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
