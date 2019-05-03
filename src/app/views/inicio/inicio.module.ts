import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio.component';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { FormsModule } from '@angular/forms';
import { SearchPersonalFileByDateComponent } from './components/search-personal-file-by-date/search-personal-file-by-date.component';

@NgModule({
  declarations: [InicioComponent, SearchPersonalFileByDateComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    IgniteModule,
    FormsModule
  ]
})
export class InicioModule { }
