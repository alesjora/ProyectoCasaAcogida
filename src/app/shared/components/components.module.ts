import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartureDialogComponent } from './departure-dialog/departure-dialog.component';
import { IgniteModule } from '../ignite/ignite.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ChangeRoomDialogComponent } from './change-room-dialog/change-room-dialog.component';


@NgModule({
  declarations: [DepartureDialogComponent, ChangeRoomDialogComponent],
  imports: [
    CommonModule,
    IgniteModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DepartureDialogComponent, ChangeRoomDialogComponent]
})
export class ComponentsModule { }
