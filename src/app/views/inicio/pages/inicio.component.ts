import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { LogoutService } from 'src/app/shared/services/logout.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public search: string;
  public data: object[] = [];
  displayedColumns = ['name', 'entry_date', 'departure_date', 'room', 'bed'];
  dataSource = ELEMENT_DATA;
  constructor(public storeService: StoreService,
    private logoutService: LogoutService) { }

  ngOnInit() {
  }
  mostrar() {
    console.log(this.search);
  }
  selectRow(row){
    console.log(row);
  }
}
export interface PersonElement {
  image: string;
  id: string;
  name: string;
  entry_date: string;
  departure_date: string;
  room: string;
  bed: string;
}

const ELEMENT_DATA: PersonElement[] = [
  {image: 'http://localhost/api/public/image/StandarProfile.png', id: '1', name: 'José Rafael Álvarez Espino', entry_date: '04/05/2019', departure_date: '--/--/----', room: '3', bed: '4'},
  {image: 'http://localhost/api/public/image/StandarProfile.png', id: '2', name: 'Marcos Gallardo Pérez', entry_date: '06/05/2019', departure_date: '--/--/----', room: '11', bed: '5'}
];
