import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio.component';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TablePeopleAtHomeComponent } from './components/table-people-at-home/table-people-at-home.component';
import { TaulaPersonesExpedientsComponent } from './components/taula-persones-expedients/taula-persones-expedients.component';

@NgModule({
  declarations: [InicioComponent, TablePeopleAtHomeComponent, TaulaPersonesExpedientsComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    IgniteModule,
    MaterialModule,
    FormsModule
  ],
  exports: [TablePeopleAtHomeComponent]
})
export class InicioModule { }
