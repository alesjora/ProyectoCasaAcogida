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

  checkPreviousForm(array: Array<any>) {
    return array.find(element => {
      return element.formIsValid() ? false : true;
    });
  }

  goTo(tab: IgxTabComponent, component) {
    tab.select();
    const formulario = component.getForm().value;
    console.log(formulario);
    const documentacion =
     this.buildDocumentation( formulario.documentationType,
                              formulario.documentationOtherType,
                              formulario.documentationNumber);
    const documentacionPerdida =
      this.buildLostDocumentation(formulario.lackDocumentation, formulario.tiposAusenciaDocumento);
    let datosGuardar = {
      fechaExpediente: this.formatoFecha(formulario.evaluationDate),
      nombre: this.formatoString(formulario.name),
      apellido1: this.formatoString(formulario.apellido1),
      apellido2: this.formatoString(formulario.apellido2),
      sexoEv: formulario.sexoEv,
      orientacionSexual: formulario.orientacionSexual,
      documentacion,
      documentacionPerdida,
      email: formulario.correo,
      telefono: formulario.telefono,
      fechaNacimiento: this.formatoFecha(formulario.bornDate),
      paisNacimiento: formulario.paisNacimiento,
      provinciaNacimiento: formulario.provinciaNacimiento,
      municipioNacimiento: formulario.municipioNacimiento,
      formaIngreso: formulario.formaIngreso,
      origenIngreso: formulario.origenIngreso,
      nacionalidad: formulario.nacionalidad,
      provinciaEmpadronamiento: formulario.provinciaEmpadronamiento,
      municipioEmpadronamiento: formulario.municipioEmpadronamiento,
      fechaEmpadronamiento: this.formatoFecha(formulario.censusDate),
      numeroSS: formulario.sSNumber,
      asistenciaSanitaria: formulario.asistenciaSanitaria,
      nAsistenciaSanitariaServicioNacionalSalud: formulario.sNSNumber,
      targetaSanitaria: formulario.targetaSanitaria,
      motivoAusenciaTargetaSanitaria: formulario.motivoAusenciaTargetaSanitaria,
      estadoCivil: formulario.estadoCivil,
      permisoResidencia: formulario.permisoResidencia,
      tipoPermisoResidencia: formulario.tipoPermisoResidencia,
      renovacionPerisoResidencia: this.formatoFecha(formulario.residancePermitDate)
    };
    this.stayService.sendIdentifyingDataForm(datosGuardar).subscribe(res => {
      console.log(res);
    });
  }
  buildDocumentation(tipos, tipoOtro, numero) {
    let documentacion = [];
    let otro = null;
    tipos ? tipos.forEach((tipo, index) => {
      if (tipo.value !== '99') {
        documentacion.push({tipo: tipo.value, numero: numero[index]});
      } else {
        otro = {tjhgipo: tipoOtro, numero: numero[index] };
      }

    }) : documentacion = null;
    return {documentacion, otraDocumentacion: otro};
  }
  buildLostDocumentation(tipos, motivoDeLaPerdida){
    let documentacionPerdida = []
    tipos ? tipos.forEach((tipo, index) => {
      documentacionPerdida.push({tipo: tipo.value, motivoPerdida: motivoDeLaPerdida[index]});
    }) : documentacionPerdida = null;
    return documentacionPerdida;
  }

  formatoFecha(fecha) {
    if (fecha === '' || fecha === undefined || fecha === null ) {
      return '';
    }
    const mes = ((fecha.getMonth() + 1).toString().length === 1) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1);
    const dia =  fecha.getDate().toString.length === 1 ? '0' + fecha.getDate() : fecha.getDate();
    fecha = new Date(fecha);
    fecha = fecha.getFullYear() + '-' +
            mes + '-' +
            dia;
    return fecha;
  }
  formatoString( string ) {
    if (string === '' || string === undefined || string === null) {
      return '';
    }
    string = string.trim();
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

}
