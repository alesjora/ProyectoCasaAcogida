import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './pages/reports.component';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { EntryByGenderComponent } from './components/entry-by-gender/entry-by-gender.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';


@NgModule({
  declarations: [ReportsComponent, EntryByGenderComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    IgniteModule,
    MaterialModule,
    FormsModule,
    PDFExportModule
  ]
})
export class ReportsModule { }
