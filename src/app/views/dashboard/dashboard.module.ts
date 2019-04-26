import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IgniteModule,
    FormsModule
  ]
})
export class DashboardModule { }
