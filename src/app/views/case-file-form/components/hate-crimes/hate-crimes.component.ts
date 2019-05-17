import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hate-crimes',
  templateUrl: './hate-crimes.component.html',
  styleUrls: ['./hate-crimes.component.scss']
})
export class HateCrimesComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  hateCrimesForm;
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.hateCrimesForm = this.fb.group({
      hola : ['', Validators.required]
    });
  }
  public formIsValid() {
    return this.hateCrimesForm.valid;
  }

}
