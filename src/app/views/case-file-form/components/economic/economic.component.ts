import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-economic',
  templateUrl: './economic.component.html',
  styleUrls: ['./economic.component.scss']
})
export class EconomicComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  economicForm;
  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.economicForm = this.fb.group({
      hola : ['', Validators.required]
    });
  }
  public formIsValid() {
    return this.economicForm.valid;
  }

}
