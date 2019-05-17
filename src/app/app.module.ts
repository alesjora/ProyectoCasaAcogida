import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './views/login/login.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConexionInterceptorService } from './shared/interceptors/conexion-interceptor.service';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { CaseFileFormComponent } from './views/case-file-form/case-file-form.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ConexionInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
