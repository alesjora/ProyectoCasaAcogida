import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-identifying-data',
  templateUrl: './identifying-data.component.html',
  styleUrls: ['./identifying-data.component.scss']
})
export class IdentifyingDataComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  identifyingDataForm;
  @ViewChild('identifyingData') identifyingData;
  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.identifyingDataForm = this.fb.group({
      hola : ['', Validators.required]
    });
  }
  get hola() {
    return this.identifyingDataForm.get('hola');
  }
  public formIsValid(){
    return this.identifyingDataForm.valid;
  }

}
