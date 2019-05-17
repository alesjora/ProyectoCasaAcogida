import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  healthForm;
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.healthForm = this.fb.group({
      hola : ['', Validators.required]
    });
  }
  public formIsValid() {
    return this.healthForm.valid;
  }

}
