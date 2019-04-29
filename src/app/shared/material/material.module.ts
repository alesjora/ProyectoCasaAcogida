import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatGridListModule, MatInputModule, MatIconModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatGridListModule, MatInputModule, MatIconModule, MatFormFieldModule, MatDialogModule, MatSnackBarModule, MatToolbarModule]
})
export class MaterialModule { }
