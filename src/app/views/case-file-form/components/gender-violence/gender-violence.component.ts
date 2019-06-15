import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gender-violence',
  templateUrl: './gender-violence.component.html',
  styleUrls: ['./gender-violence.component.scss']
})
export class GenderViolenceComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  genderViolenceForm;
  @ViewChild('genderViolence') genderViolence;
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.genderViolenceForm = this.fb.group({
      hola : ['', Validators.required]
    });
  }
  public formIsValid() {
    return this.genderViolenceForm.valid;
  }

}
