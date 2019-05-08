import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEntryRoutingModule } from './new-entry-routing.module';
import { NewEntryComponent } from './pages/new-entry.component';

@NgModule({
  declarations: [NewEntryComponent],
  imports: [
    CommonModule,
    NewEntryRoutingModule
  ]
})
export class NewEntryModule { }
