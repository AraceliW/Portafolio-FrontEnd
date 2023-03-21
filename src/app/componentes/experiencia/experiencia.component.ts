import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';
import { EditExperienciaComponent } from './edit-experiencia/edit-experiencia.component';
import { MdalExperienciaComponent } from './mdal-experiencia/mdal-experiencia.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})


export class ExperienciaComponent implements OnInit {
  
    experiencias: Experiencia[];

    constructor(private service: ExperienciaService,
                private tokenService: TokenService,  
                public dialog: MatDialog, 
                private snackbar: MatSnackBar
                ) { this.experiencias = []; }


    isLogged = false;



    ngOnInit(): void {
      this.cargarExperiencia();
      if (this.tokenService.getToken()) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    }

  

    cargarExperiencia(): void {
      this.service.lista().subscribe(data => { this.experiencias = data;});
    }




    delete(id: any): void {
      if (id != undefined) {
        this.service.delete(id).subscribe(data => {
          this.cargarExperiencia();
  
          this.snackbar.open('Experiencia eliminada', 'Cerrar', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
  
        }, error => {
          this.snackbar.open(`Error al eliminar experiencia: ${error.error.mensaje}`, 'Cerrar', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
        });
      }
    }
  


    openDialogNew(): void {
      const dialogRef = this.dialog.open(MdalExperienciaComponent, {
        width: '500px',
        data: 'rigth click'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.cargarExperiencia();
      });
    }
  

    
    openDialogEdit(id: any): void {
      const dialogRef = this.dialog.open(EditExperienciaComponent, {
        width: '500px',
        data: { id: id }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.cargarExperiencia();
      });
    }


}
