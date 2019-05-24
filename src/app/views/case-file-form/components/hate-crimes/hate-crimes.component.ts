import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-hate-crimes',
  templateUrl: './hate-crimes.component.html',
  styleUrls: ['./hate-crimes.component.scss']
})
export class HateCrimesComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  hateCrimesForm;
  tiposDocumento = [{value: '1', viewValue: 'holaCavesa'}];
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.hateCrimesForm = this.fb.group({
      hola : ['', Validators.required],
      documentation: this.fb.array([
        this.fb.group({
          documentionType: new FormControl(''),
          documentationOtherType: new FormControl(''),
          documentationNumber: new FormControl('')
        })
      ]),
    });
  }
  public formIsValid() {
    return this.hateCrimesForm.valid;
  }
  get documentation() {
    return this.hateCrimesForm.get('documentation') as FormArray;
  }
  addDocument() {
    this.documentation.push(this.fb.group({
      documentionType: '',
      documentationOtherType: '',
      documentationNumber: ''
    }));
  }
  deleteDocument() {
    this.documentation.removeAt(this.documentation.length-1);
  }
  getDocumentation(index) {
    //console.log(this.identifyingDataForm.get('documentation').value[index]);
    return this.hateCrimesForm.get('documentation').value[index];
  }
}


