import { Component, OnInit } from '@angular/core';
import { ShowPersonalFileService } from '../service/show-personal-file.service';
import { ActivatedRoute } from '@angular/router';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-personal-file',
  templateUrl: './show-personal-file.component.html',
  styleUrls: ['./show-personal-file.component.scss']
})
export class ShowPersonalFileComponent implements OnInit {
  srcImagen: string;
  nombre: string;
  apellidos: string;
  documentation: string;
  email: string;
  phone: string;

  nHabitacion = 2;
  nCama = 3;



  constructor(private activatedRoute: ActivatedRoute,
              private showPersonalFileService: ShowPersonalFileService,
              private logoutService: LogoutService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.showPersonalFileService.getPersonalFile({ id }).subscribe(response => {
      switch (response.status) {
        case 'SESSION_EXPIRED':
          this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
          break;
        case 'OPERATION_SUCCESS':
          console.log(response.data);
          this.srcImagen = response.data[0].image;
          if (response.data[0].image === '') {
            this.srcImagen = environment.urlImage + 'StandarProfile.png';
          }
          this.nombre = response.data[0].nombre;
          this.apellidos = response.data[0].apellidos;
          this.documentation = response.data[0].dni;
          this.email = 'marcos@gmail.com';
          this.phone = '654987321';
          break;
        default:
          this.logoutService.goToLogin();
          break;
      }
    });
  }

}
