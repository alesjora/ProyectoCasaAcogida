import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatGridListModule, MatInputModule, MatIconModule, MatFormField} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatGridListModule, MatInputModule, MatIconModule]
})
export class MaterialModule { }
