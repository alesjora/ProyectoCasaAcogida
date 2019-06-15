import { Component, OnInit } from '@angular/core';
import { StayService } from 'src/app/shared/services/stay.service';
import { ProgressSpinnerService } from 'src/app/shared/services/progress-spinner.service';
import { ActivatedRoute } from '@angular/router';
import { defineFont } from '@progress/kendo-drawing/pdf';

@Component({
  selector: 'app-show-case-file',
  templateUrl: './show-case-file.component.html',
  styleUrls: ['./show-case-file.component.scss']
})
export class ShowCaseFileComponent implements OnInit {

  constructor(private stayService: StayService, private spinnerService: ProgressSpinnerService, private activatedRoute: ActivatedRoute) { }
  datosExpediente = [];
  documentacion = [];
  nombre: string;
  apellido: string;
  fecha_entrada: string;
  nombrePdf: string;

  ngOnInit() {
    this.spinnerService.progresSpinner.invisible();
    this.stayService.getInformacionExpedienteSinParametrizar({ id : this.activatedRoute.snapshot.params.id}).subscribe(response => {
      this.documentacion = response.data.documentacion;
      this.iterarJson(response.data.mainData[0], this.datosExpediente);
      this.nombre = response.data.mainData[0].Nombre;
      this.apellido = response.data.mainData[0]['Primer apellido'];
      this.fecha_entrada = response.data.mainData[0]['Fecha ingreso'];
      this.nombrePdf = 'Expediente_' + this.nombre + this.apellido + this.fecha_entrada;
    });  
    defineFont({
      Roboto : '../../assets/fonts/Roboto-Light.ttf',
    });
  }
  iterarJson(json, array) {
    for (const clave in json) {
      if (json.hasOwnProperty(clave) && json[clave]) {
        array.push({value: clave, viewValue: json[clave]});
      }
    }
  }

}
