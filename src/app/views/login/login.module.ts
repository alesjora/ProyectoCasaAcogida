import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [LoginComponent],
  providers: [SnackBarService, LoginService]
})
export class LoginModule { }
