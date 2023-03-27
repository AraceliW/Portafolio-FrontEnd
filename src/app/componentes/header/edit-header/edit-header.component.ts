import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Header } from 'src/app/model/header';
import { HeaderService } from 'src/app/servicios/header.service';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.css']
})


export class EditHeaderComponent {


  header: Header = new Header("");


  constructor(
    private service: HeaderService,
    public dialogRef: MatDialogRef<EditHeaderComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }



  ngOnInit(): void {
    this.service.detail(this.data.id).subscribe(data => {
      this.header = data;
    }, error => {
      this.snackbar.open(`Error al cargar el banner: ${error.error.mensaje}`, 'Cerrar', {
        duration: 6000,
        verticalPosition: 'bottom'
      });
    })
  }



  onUpdate(id: any): void {
    this.service.update(id, this.header).subscribe(data => {
      this.dialogRef.close();
      this.snackbar.open('"Header" actualizado', 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    }, error => {
      this.snackbar.open(`Error al actualizar "Header": ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    })
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
