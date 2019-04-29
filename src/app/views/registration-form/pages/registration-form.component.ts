import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  public date: Date;
  public registrationForm;
  public urlImagen = '../../../../assets/photos/StandarProfile.png';
  private dayFormatter = new Intl.DateTimeFormat('es', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });
  constructor(private fb: FormBuilder) {
    this.date = new Date(Date.now());
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      dni: ['', ],
      initialDate: [this.date, [Validators.required]],
      photo: ['', ]
    });
  }


  get name() {
    return this.registrationForm.get('name');
  }
  get surnames(){
    return this.registrationForm.get('surnames');
  }
  get dni(){
    return this.registrationForm.get('dni');
  }
  public formatter = (date: Date) => {
    // tslint:disable-next-line:max-line-length
    return `${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target);
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
