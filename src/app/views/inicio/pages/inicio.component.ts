import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  constructor(public storeService: StoreService) {

  }
  ngOnInit() {
  }

}

// const ELEMENT_DATA: PersonElement[] = [
//   {image: 'http://localhost/api/public/image/StandarProfile.png', id: '1', name: 'José Rafael Álvarez Espino', entry_date: '04/05/2019', departure_date: '--/--/----', room: '3', bed: '4'},
//   {image: 'http://localhost/api/public/image/StandarProfile.png', id: '2', name: 'Marcos Gallardo Pérez', entry_date: '06/05/2019', departure_date: '--/--/----', room: '11', bed: '5'}
// ];
