import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Skillh } from 'src/app/model/skillh';
import { SkillhService } from 'src/app/servicios/skillh.service';
import { TokenService } from 'src/app/servicios/token.service';
import { EditSkillhComponent } from './edit-skillh/edit-skillh.component';
import { ModalSkillhComponent } from './modal-skillh/modal-skillh.component';

@Component({
  selector: 'app-skillh',
  templateUrl: './skillh.component.html',
  styleUrls: ['./skillh.component.css']
})


export class SkillhComponent implements OnInit {

  
  skillh: Skillh[];

  constructor(
    private service: SkillhService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { this.skillh = []; }


  isLogged = false;

  ngOnInit(): void {
    this.cargarSkillh();
    this.tokenService.getToken() ? this.isLogged = true : this.isLogged = false;
  }


  cargarSkillh(): void {
    this.service.lista().subscribe(data => {
      this.skillh = data;
    });
  }


  delete(id: any): void {
    if (id != undefined) {
      this.service.delete(id).subscribe(data => {
        this.cargarSkillh();

        this._snackBar.open('Skill eliminado', 'Cerrar', {
          duration: 2000,
          verticalPosition: 'bottom'
        });
        
      }, error => {
        this._snackBar.open(`Error al eliminar skill: ${error.error.mensaje}`, 'Cerrar', {
          duration: 2000,
          verticalPosition: 'bottom'
        });
      });
    }
  }


  openDialogNew(): void {
    const dialogRef = this.dialog.open(ModalSkillhComponent, {
      width: '500px',
      data: 'rigth click'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarSkillh();
    });
  }



  openDialogEdit(id: any): void {
    const dialogRef = this.dialog.open(EditSkillhComponent, {
      width: '500px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarSkillh();
    });
  }


}
