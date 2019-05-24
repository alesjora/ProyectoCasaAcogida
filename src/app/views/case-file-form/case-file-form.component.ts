import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { IgxTabComponent } from 'igniteui-angular';
import { StayService } from 'src/app/shared/services/stay.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-case-file-form',
  templateUrl: './case-file-form.component.html',
  styleUrls: ['./case-file-form.component.scss']
})
export class CaseFileFormComponent implements OnInit{

  nombre;
  apellido1;
  apellido2;
  nExpediente;
  nIngreso;
  fechaIngreso;
  fechaExpediente;
  constructor(private ref: ChangeDetectorRef,
              private stayService: StayService,
              private router: ActivatedRoute) {
  }
  ngOnInit() {
    const serv = this.stayService;
    serv.getCaseFileInformation({id: this.router.snapshot.params.id}).subscribe(this.getDatosExpediente.bind(this));
  }
  getDatosExpediente(response) {
    const SERVER_RESPONSE = response.data.mainData[0];
    this.nombre = SERVER_RESPONSE.nombre;
    this.apellido1 = SERVER_RESPONSE.apellido1;
    this.apellido2 = SERVER_RESPONSE.apellido2;
    this.nExpediente = SERVER_RESPONSE.numero_expediente_tecnico;
    this.nIngreso = SERVER_RESPONSE.numero_ingreso;
    this.fechaExpediente = SERVER_RESPONSE.fecha_evaluacion;
    this.fechaIngreso = SERVER_RESPONSE.fecha_ingreso;

    console.log('response', response);
  }
  goTo(tab: IgxTabComponent) {
    tab.select();
  }
  checkPreviousForm(array: Array<any>) {
    return array.find(element => {
      return element.formIsValid() ? false : true;
    });
  }

}
