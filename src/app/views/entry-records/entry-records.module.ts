import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRecordsRoutingModule } from './entry-records-routing.module';
import { EntryRecordsComponent } from './pages/entry-records.component';
import { InicioModule } from '../inicio/inicio.module';

@NgModule({
  declarations: [EntryRecordsComponent],
  imports: [
    CommonModule,
    EntryRecordsRoutingModule,
    InicioModule
  ]
})
export class EntryRecordsModule { }
