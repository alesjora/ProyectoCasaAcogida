import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-legal-legal',
  templateUrl: './legal-legal.component.html',
  styleUrls: ['./legal-legal.component.scss']
})
export class LegalLegalComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  legalLegalForm;
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.legalLegalForm = this.fb.group({
      hola : ['', Validators.required]
    });
  }
  public formIsValid() {
    return this.legalLegalForm.valid;
  }
}
