import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { ShowOcupationService } from '../service/show-ocupation.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-show-ocupation',
  templateUrl: './show-ocupation.component.html',
  styleUrls: ['./show-ocupation.component.scss']
})
export class ShowOcupationComponent implements OnInit {
  // public occupation = {
  //   status: 'OPERATION_SUCCESS',
  //   data: [{
  //     room: '1',
  //     beds: [{
  //       number: '1',
  //       occupant: {
  //         id: '1',
  //         name: 'José Rafael',
  //         surnames: 'Álvarez Espino',
  //         image: 'http://localhost/api/public/image/StandarProfile.png'
  //       }
  //     }, {
  //       number: '2',
  //       occupant: {
  //         id: '2',
  //         name: 'Marcos',
  //         surnames: 'Gallardo Pérez',
  //         image: 'http://localhost/api/public/image/StandarProfile.png'
  //       }
  //     }, {
  //       number: '3',
  //       occupant: ''
  //     }, {
  //       number: '4',
  //       occupant: {
  //         id: '3',
  //         name: 'Abdesaman',
  //         surnames: 'Hammad El Habibi',
  //         image: 'http://localhost/api/public/image/StandarProfile.png'
  //       }
  //     }]
  //   }, {
  //     room: '2',
  //     beds: [{
  //       number: '1',
  //       occupant: ''
  //     }, {
  //       number: '2',
  //       occupant: {
  //         id: '2',
  //         name: 'Marcos',
  //         surnames: 'Gallardo Pérez',
  //         image: 'http://localhost/api/public/image/StandarProfile.png'
  //       }
  //     }, {
  //       number: '3',
  //       occupant: ''
  //     }, {
  //       number: '4',
  //       occupant: {
  //         id: '3',
  //         name: 'Abdesaman',
  //         surnames: 'Hammad El Habibi',
  //         image: 'http://localhost/api/public/image/StandarProfile.png'
  //       }
  //     },
  //     {
  //       number: '5',
  //       occupant: '',
  //     }, {
  //       number: '6',
  //       occupant: {
  //         id: '2',
  //         name: 'Marcos',
  //         surnames: 'Gallardo Pérez',
  //         image: 'http://localhost/api/public/image/StandarProfile.png'
  //       }
  //     }]
  //   }]
  // };
  public occupation = [];
  public data: object[] = [];
  public list = new Array(7);
  displayedColumns = ['n_cama', 'ocupante'];
  constructor(private storeService: StoreService,
    private logoutService: LogoutService, private showOccupationService: ShowOcupationService, private snackBarService: SnackBarService) {
    this.storeService.sendCurrentRoute('Ocupación');
  }

  ngOnInit() {
    this.showOccupationService.getOccupation().subscribe(this.getOccupationSuccess.bind(this),
    this.snackBarService.showSnackbar.bind(this, 'Error al conectar con el servidor', 3000, 'bottom', 'error'))
  }

  getOccupationSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.occupation = response.data;
        break;
    }
  }
}
