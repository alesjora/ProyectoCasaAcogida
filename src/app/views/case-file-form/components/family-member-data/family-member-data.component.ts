import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-family-member-data',
  templateUrl: './family-member-data.component.html',
  styleUrls: ['./family-member-data.component.scss']
})
export class FamilyMemberDataComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  identifyingDataForm;
  @ViewChild('familyMemberData') familyMemberData;
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
