import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './views/login/login.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConexionInterceptorService } from './shared/interceptors/conexion-interceptor.service';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ComponentsModule } from './shared/components/components.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    PDFExportModule,
    ComponentsModule
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
