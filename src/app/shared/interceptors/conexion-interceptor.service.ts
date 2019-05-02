import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';


@Injectable({
  providedIn: 'root'
})

export class ConexionInterceptorService implements HttpInterceptor {

  constructor(private storeService: StoreService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.storeService.getUser() == null) {
      return next.handle(req);
    }
    const authReq = req.clone({
      headers: new HttpHeaders({
        token: this.storeService.getToken()
      })
    });
    return next.handle(authReq);
  }
}