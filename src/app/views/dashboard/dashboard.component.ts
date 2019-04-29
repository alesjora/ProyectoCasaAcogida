import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public navItems = [
    { name: 'home', text: 'Inicio', url: 'dashboard' },
    { name: 'create', text: 'Nueva ficha de registro', url: 'registration-form' },
  ];
  public selected = 'Inicio';

  @ViewChild (IgxNavigationDrawerComponent)
  public drawer: IgxNavigationDrawerComponent;

  public drawerState = {
    miniTemplate: true,
    open: true,
    pin: true
  };
  constructor() {}

  ngOnInit() {
    // if (window.innerWidth < 1024) {
    //   this.drawerState.miniTemplate = false;
    // }
  }
  /** Select item and close drawer if not pinned */
  public navigate(item) {
    this.selected = item.text;
    if (!this.drawer.pin) {
      this.drawer.close();
    }
  }
}
