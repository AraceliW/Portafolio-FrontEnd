import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Header } from 'src/app/model/header';
import { HeaderService } from 'src/app/servicios/header.service';
import { TokenService } from 'src/app/servicios/token.service';
import { EditHeaderComponent } from './edit-header/edit-header.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit{

  header: Header = new Header("");


  constructor(
    public service: HeaderService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}


  isLogged = false;


  ngOnInit(): void {
    this.service.getHeader().subscribe(data => {
      this.header = data
      this.tokenService.getToken() ? this.isLogged = true : this.isLogged = false;
    }, error => {
      this._snackBar.open(`Error al cargar: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    })
  }



  openDialogEdit(): void {
    const dialogRef = this.dialog.open(EditHeaderComponent, {
      width: '500px',
      data: this.header
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.getHeader().subscribe(data => {
        this.header = data
        this.tokenService.getToken() ? this.isLogged = true : this.isLogged = false;
      });
    });
  }
  



}
