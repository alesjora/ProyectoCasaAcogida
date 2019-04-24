import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(mensaje, duracion, posicion, clase) {
    this.snackBar.open(mensaje, '',
      {
        duration: duracion,
        verticalPosition: posicion,
        panelClass: clase
      }
    );
  }
}
