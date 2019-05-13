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
  apellido1: string;
  apellido2: string;
  nacionalidad: string;
  paisNacimiento: string;
  fechaNacimiento: string;
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
          this.srcImagen = response.data.mainData[0].image;
          if (response.data.mainData[0].image === '') {
            this.srcImagen = environment.urlImage + 'StandarProfile.png';
          }
          this.nombre = response.data.mainData[0].nombre;
          this.apellido1 = response.data.mainData[0].apellido1;
          this.apellido2 = response.data.mainData[0].apellido2;
          this.nacionalidad = response.data.mainData[0].nacionalidad;
          this.paisNacimiento = response.data.mainData[0].lugarNacimiento;
          this.fechaNacimiento = response.data.mainData[0].fecha_nacimiento;
          break;
        default:
          this.logoutService.goToLogin();
          break;
      }
    });
  }

}
