import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPersonalFileRoutingModule } from './search-personal-file-routing.module';
import { SearchPersonalFileComponent } from './pages/search-personal-file.component';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchPersonalFileComponent],
  imports: [
    CommonModule,
    SearchPersonalFileRoutingModule,
    IgniteModule,
    FormsModule,
    RouterModule
  ]
})
export class SearchPersonalFileModule { }
