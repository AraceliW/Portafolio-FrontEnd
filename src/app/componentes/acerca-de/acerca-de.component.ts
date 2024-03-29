import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';
import { EditAcercaDeComponent } from './edit-acerca-de/edit-acerca-de.component';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})


export class AcercaDeComponent implements OnInit {

  persona: Persona = new Persona("", "", "", "", "");


  constructor(
    public service: PersonaService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}


  isLogged = false;


  ngOnInit(): void {
    this.service.getPersona().subscribe(data => {
      this.persona = data
      this.tokenService.getToken() ? this.isLogged = true : this.isLogged = false;
    }, error => {
      this._snackBar.open(`Error al cargar la información: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    })
  }



  openDialogEdit(): void {
    const dialogRef = this.dialog.open(EditAcercaDeComponent, {
      width: '500px',
      data: this.persona
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.getPersona().subscribe(data => {
        this.persona = data
        this.tokenService.getToken() ? this.isLogged = true : this.isLogged = false;
      });
    });
  }
  

  
}
