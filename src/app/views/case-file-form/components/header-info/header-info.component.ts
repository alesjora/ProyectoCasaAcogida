import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.scss']
})
export class HeaderInfoComponent implements OnInit {

  @Input('nombre') nombre: string;
  @Input ('apellidos1') apellido1: string;
  @Input ('apellidos2') apellido2: string;
  @Input ('nExpediente') nExpediente: string;
  @Input ('nIngreso') nIngreso: string;
  @Input ('fechaIngreso') fechaIngreso: string;
  @Input ('fechaExpediente') fechaExpediente: string;

  constructor() { }


  ngOnInit() {
  }

}
