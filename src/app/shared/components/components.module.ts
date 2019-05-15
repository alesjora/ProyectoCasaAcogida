import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartureDialogComponent } from './departure-dialog/departure-dialog.component';
import { IgniteModule } from '../ignite/ignite.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DepartureDialogComponent],
  imports: [
    CommonModule,
    IgniteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DepartureDialogComponent]
})
export class ComponentsModule { }
