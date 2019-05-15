import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-departure-dialog',
  templateUrl: './departure-dialog.component.html',
  styleUrls: ['./departure-dialog.component.scss']
})
export class DepartureDialogComponent implements OnInit {
  @ViewChild('departureDialog') departureDialog;
  public newDepartureForm;
  public date: Date;
  public time: Date;
  private dayFormatter = new Intl.DateTimeFormat('es', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });

   constructor(public fb: FormBuilder) {
    this.date = new Date(Date.now());
    this.time = this.date;
  }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.newDepartureForm = this.fb.group({
      departureDate: ['', [Validators.required]],
      departureTime: ['', [Validators.required]],
    });
  }
  get departureDate() {
    return this.newDepartureForm.get('departureDate');
  }
  get departureTime() {
    return this.newDepartureForm.get('departureTime');
  }
  public formatter = (date: Date) => {
    // tslint:disable-next-line:max-line-length
    return `${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
  submit(){
    console.log('aa');
  }
}
