import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './pages/change-password.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordService } from './service/change-password.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { CheckTokenService } from 'src/app/shared/services/check-token.service';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [ChangePasswordService, SnackBarService, CheckTokenService]
})
export class ChangePasswordModule { }
