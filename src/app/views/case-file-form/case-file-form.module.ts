import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseFileFormRoutingModule } from './case-file-form-routing.module';
import { CaseFileFormComponent } from './case-file-form.component';
import { IgniteModule } from 'src/app/shared/ignite/ignite.module';
import { IdentifyingDataComponent } from './components/identifying-data/identifying-data.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FamilyMemberDataComponent } from './components/family-member-data/family-member-data.component';
import { HateCrimesComponent } from './components/hate-crimes/hate-crimes.component';
import { GenderViolenceComponent } from './components/gender-violence/gender-violence.component';
import { LaborTrainingComponent } from './components/labor-training/labor-training.component';
import { EconomicComponent } from './components/economic/economic.component';
import { HealthComponent } from './components/health/health.component';
import { LegalLegalComponent } from './components/legal-legal/legal-legal.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HeaderInfoComponent } from './components/header-info/header-info.component';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [
    CaseFileFormComponent,
    IdentifyingDataComponent,
    FamilyMemberDataComponent,
    HateCrimesComponent,
    GenderViolenceComponent,
    LaborTrainingComponent,
    EconomicComponent,
    HealthComponent,
    LegalLegalComponent,
    HeaderInfoComponent
  ],
  imports: [
    CommonModule,
    CaseFileFormRoutingModule,
    IgniteModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ]
})
export class CaseFileFormModule { }
