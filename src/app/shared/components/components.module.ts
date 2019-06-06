import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartureDialogComponent } from './departure-dialog/departure-dialog.component';
import { IgniteModule } from '../ignite/ignite.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ChangeRoomDialogComponent } from './change-room-dialog/change-room-dialog.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';


@NgModule({
  declarations: [
    DepartureDialogComponent,
    ChangeRoomDialogComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    CommonModule,
    IgniteModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DepartureDialogComponent,
    ChangeRoomDialogComponent,
    ProgressSpinnerComponent
  ]
})
export class ComponentsModule { }
