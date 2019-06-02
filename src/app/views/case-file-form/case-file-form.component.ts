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
      nombre: formulario.name,
      apellido1: formulario.apellido1,
      apellido2: formulario.apellido2,
      sexoEv: formulario.sexoEv,
      orientacionSexual: formulario.orientacionSexual,
      documentacion,
      documentacionPerdida,
      email: formulario.correo,
      telefono: formulario.telefono,
      fechaNacimiento: formulario.bornDate,
      paisNacimiento: formulario.paisNacimiento,
      provinciaNacimiento: formulario.provinciaNacimiento,
      municipioNacimiento: formulario.municipioNacimiento,
      formaIngreso: formulario.formaIngreso,
      origenIngreso: formulario.origenIngreso,
      nacionalidad: formulario.nacionalidad,
      provinciaEmpadronamiento: formulario.provinciaEmpadronamiento,
      municipioEmpadronamiento: formulario.municipioEmpadronamiento,
      fechaEmpadronamiento: formulario.censusDate,
      numeroSS: formulario.sSNumber,
      asistenciaSanitaria: formulario.asistenciaSanitaria,
      nAsistenciaSanitariaServicioNacionalSalud: formulario.sNSNumber,
      targetaSanitaria: formulario.targetaSanitaria,
      motivoAusenciaTargetaSanitaria: formulario.motivoAusenciaTargetaSanitaria,
      estadoCivil: formulario.estadoCivil,
      permisoResidencia: formulario.permisoResidencia,
      tipoPermisoResidencia: formulario.tipoPermisoResidencia,
      renovacionPerisoResidencia: formulario.residancePermitDate
    }
    console.log(datosGuardar);
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

  checkPreviousForm(array: Array<any>) {
    return array.find(element => {
      return element.formIsValid() ? false : true;
    });
  }

}
