import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-family-member-data',
  templateUrl: './family-member-data.component.html',
  styleUrls: ['./family-member-data.component.scss']
})
export class FamilyMemberDataComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  familyMemberDataForm;
  @ViewChild('familyMemberData') familyMemberData;
  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.familyMemberDataForm = this.fb.group({
      hola : ['', Validators.required]
    });
  }
  public formIsValid() {
    return this.familyMemberDataForm.valid;
  }


}
