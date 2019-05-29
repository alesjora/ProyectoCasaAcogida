import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './pages/reports.component';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EntryByGenderComponent } from './components/entry-by-gender/entry-by-gender.component';

@NgModule({
  declarations: [ReportsComponent, EntryByGenderComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    IgniteModule,
    MaterialModule,
    FormsModule
  ]
})
export class ReportsModule { }
