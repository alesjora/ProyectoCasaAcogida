import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
import { Router } from '@angular/router';
import { CheckTokenService } from 'src/app/shared/services/check-token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  show:boolean = false;
  public elementsConserje = [
    { name: 'home', text: 'Inicio', url: 'dashboard' },
    { name: 'create', text: 'Nueva ficha de registro', url: 'registration-form' },
  ];
  public navItems = this.elementsConserje;
  public selected = 'Inicio';

  @ViewChild (IgxNavigationDrawerComponent)
  public drawer: IgxNavigationDrawerComponent;

  public drawerState = {
    miniTemplate: true,
    open: true,
    pin: true
  };
  constructor(private router: Router, private checkToken: CheckTokenService) {}

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.goToLogin();
    }
    this.checkToken.sendToken({'token' : token}).subscribe(result => {
      if (!result){
        this.logout();
      }
      this.show = true;
      const helper = new JwtHelperService();
      console.log(helper.decodeToken(token));
    });

  }
  /** Select item and close drawer if not pinned */
  public navigate(item) {
    this.selected = item.text;
    if (!this.drawer.pin) {
      this.drawer.close();
    }
  }

  public goToLogin(){
    this.router.navigate(['/']);
  }
  public logout(){
    sessionStorage.removeItem('token');
    this.goToLogin();
  }
}
