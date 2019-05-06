import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckTokenService } from 'src/app/shared/services/check-token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StoreService } from 'src/app/shared/services/store.service';
import { Subscription } from 'rxjs';
import { LogoutService } from 'src/app/shared/services/logout.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  show: boolean = false;
  selected: string = 'Inicio';
  subscription: Subscription;

  public menuConserje = [
    { name: 'home', text: 'Inicio', url: 'inicio' },
    { name: 'create', text: 'Nueva ficha personal', url: 'nueva-ficha-personal' },
    { name: 'search', text: 'Buscar ficha personal', url: 'buscar-ficha-personal' },
    { name: 'exit_to_app', text: 'Cerrar sesión', url: 'logout' }
  ];
  public menuTecnico = [
    { name: 'home', text: 'Inicio', url: 'inicio' },
    { name: 'search', text: 'Buscar ficha personal', url: 'buscar-ficha-personal' },
    { name: 'exit_to_app', text: 'Cerrar sesión', url: 'logout' }
  ];

  public navItems;

  @ViewChild(IgxNavigationDrawerComponent)
  public drawer: IgxNavigationDrawerComponent;

  public drawerState = {
    miniTemplate: true,
    open: true,
    pin: true
  };
  constructor(private router: Router,
              private checkToken: CheckTokenService,
              public storeService: StoreService,
              private logoutService: LogoutService,
              private ref: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) {
    this.subscription = this.storeService.getCurrentRoute().subscribe(route => {
      this.selected = route;
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.logoutService.goToLogin();
      return;
    }
    this.checkToken.sendToken({ token }).subscribe(result => {
      if (!result) {
        this.logoutService.logout();
      }
      this.show = true;
      this.saveInfoInStore(token);
      this.chooseMenu();
      if (this.router.url === '/dashboard') {
        this.router.navigate(['dashboard/inicio']);
      }
    });

    if (this.resolucionMovil()) {
      this.drawerState.miniTemplate = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /** Select item and close drawer if not pinned */
  public navigate(item) {
    this.storeService.sendCurrentRoute(item.text);
    if (!this.drawer.pin) {
      this.drawer.close();
      document.getElementById('navigation').style.display = 'none';
    }
  }

  private saveInfoInStore(token: string) {
    const helper = new JwtHelperService();
    const tokenDecoded = helper.decodeToken(token);
    this.storeService.setUser({
      user_id: tokenDecoded.user_id,
      user_name: tokenDecoded.user_name,
      profile: tokenDecoded.profile,
      token
    });
  }
  private chooseMenu() {
    switch (this.storeService.getUserProfile()) {
      case 'conserje':
        this.navItems = this.menuConserje;
        break;
      case 'tecnico':
        this.navItems = this.menuTecnico;
        break;
    }
  }
  ocultaMenu() {
    if (!this.resolucionMovil()) {
      return;
    }
    // console.log(document.getElementsByTagName('aside')[0])
    // console.log(window.innerWidth + "px");
    if ( document.getElementById('navigation').style.display !== 'none') {
      document.getElementById('navigation').style.display = 'none';
    } else {
      document.getElementById('navigation').style.display = 'block';
    }
  }
  resolucionMovil(){
    const resolucionMovil = window.matchMedia('(max-width: 700px)');
    return resolucionMovil.matches;
  }
}
