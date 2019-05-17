import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { IgxTabComponent } from 'igniteui-angular';

@Component({
  selector: 'app-case-file-form',
  templateUrl: './case-file-form.component.html',
  styleUrls: ['./case-file-form.component.scss']
})
export class CaseFileFormComponent implements OnInit{

  constructor(private ref: ChangeDetectorRef) {
  }
  ngOnInit() {
  }

  goTo(tab: IgxTabComponent){
    tab.select();
  }
  checkPreviousForm(array: Array<any>) {
    return array.find(element => {
      return element.formIsValid() ? false : true;
    });
  }
}
