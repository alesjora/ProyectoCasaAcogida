import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCaseFileComponent } from './show-case-file.component';
import { ShowCaseFileRoutingModule } from './show-case-file-routing.module';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [ShowCaseFileComponent],
  imports: [
    CommonModule,
    ShowCaseFileRoutingModule,
    PDFExportModule,
    MaterialModule
  ]
})
export class ShowCaseFileModule { }
