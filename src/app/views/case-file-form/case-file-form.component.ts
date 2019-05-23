import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { IgxTabComponent } from 'igniteui-angular';
import { StayService } from 'src/app/shared/services/stay.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-file-form',
  templateUrl: './case-file-form.component.html',
  styleUrls: ['./case-file-form.component.scss']
})
export class CaseFileFormComponent implements OnInit{

  nombre;
  apellido;
  constructor(private ref: ChangeDetectorRef,
              private stayService: StayService,
              private router: ActivatedRoute) {
  }
  ngOnInit() {
    const serv = this.stayService;
    serv.getCaseFileInformation({id: this.router.snapshot.params.id}).subscribe(this.getDatosExpediente.bind(this));
  }
  getDatosExpediente(response) {
    this.nombre = response.data.mainData[0].nombre;
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
