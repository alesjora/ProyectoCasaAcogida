import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEntryRoutingModule } from './new-entry-routing.module';
import { NewEntryComponent, AutocompletePipeStartsWith } from './pages/new-entry.component';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewEntryComponent,AutocompletePipeStartsWith],
  imports: [
    CommonModule,
    NewEntryRoutingModule,
    IgniteModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewEntryModule { }
