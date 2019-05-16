import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  constructor(public storeService: StoreService) {
    this.storeService.sendCurrentRoute('Inicio');
  }
  ngOnInit() {
  }

}