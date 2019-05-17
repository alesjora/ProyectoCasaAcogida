import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-labor-training',
  templateUrl: './labor-training.component.html',
  styleUrls: ['./labor-training.component.scss']
})
export class LaborTrainingComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  laborTrainingForm;
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.laborTrainingForm = this.fb.group({
      hola : ['', Validators.required]
    });
  }
  public formIsValid() {
    return this.laborTrainingForm.valid;
  }

}
