import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { DashboardComponent } from './pages/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [DashboardComponent, LogoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IgniteModule,
    FormsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
