import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio.component';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { FormsModule } from '@angular/forms';
import { SearchPersonalFileByDateComponent } from './components/search-personal-file-by-date/search-personal-file-by-date.component';
import { SearchByEntryDateComponent } from './components/search-by-entry-date/search-by-entry-date.component';
import { SearchByDepartureDateComponent } from './components/search-by-departure-date/search-by-departure-date.component';

@NgModule({
  declarations: [InicioComponent, SearchPersonalFileByDateComponent, SearchByEntryDateComponent, SearchByDepartureDateComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    IgniteModule,
    FormsModule
  ]
})
export class InicioModule { }
