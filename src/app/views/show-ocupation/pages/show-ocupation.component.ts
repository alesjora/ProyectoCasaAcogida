import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { LogoutService } from 'src/app/shared/services/logout.service';

@Component({
  selector: 'app-show-ocupation',
  templateUrl: './show-ocupation.component.html',
  styleUrls: ['./show-ocupation.component.scss']
})
export class ShowOcupationComponent implements OnInit {

  public data: object[] = [];
  public list = new Array(7);
  displayedColumns = ['n_cama', 'ocupante'];
  dataSource = ELEMENT_DATA;
  constructor(private storeService: StoreService,
    private logoutService: LogoutService) { }

  ngOnInit() {
  }
  selectRow(row){
    console.log(row);
  }
}
export interface RoomElement {
  n_cama: string;
  ocupante: string;
  image: string;
}

const ELEMENT_DATA: RoomElement[] = [
  {n_cama: '1', ocupante: 'José Rafael Álvarez Espino', image: 'http://localhost/api/public/image/StandarProfile.png'},
  {n_cama: '2', ocupante: null, image: 'http://localhost/api/public/image/StandarProfile.png'},
  {n_cama: '3', ocupante: 'Abdesaman El Habibi', image: 'http://localhost/api/public/image/StandarProfile.png'},
  {n_cama: '4', ocupante: 'José Aguilera Ruiz', image: 'http://localhost/api/public/image/StandarProfile.png'},
]
