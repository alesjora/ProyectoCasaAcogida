import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../../services/snack-bar.service';
import { StayService } from '../../services/stay.service';
import { LogoutService } from '../../services/logout.service';

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

   constructor(public fb: FormBuilder, private stayService: StayService, private logoutService: LogoutService) {
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
      reasonDeparture: ['']
    });
  }
  get departureDate() {
    return this.newDepartureForm.get('departureDate');
  }
  get departureTime() {
    return this.newDepartureForm.get('departureTime');
  }
  get reasonDeparture() {
    return this.newDepartureForm.get('reasonDeparture');
  }
  public formatter = (date: Date) => {
    // tslint:disable-next-line:max-line-length
    return `${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
  async submit(idRecord, idRecordBed) {
    const data = {
      idRecord,
      idRecordBed,
      departureDate: this.getDate(this.departureDate.value),
      departureHour: this.getTime(this.departureTime.value),
      reasonDeparture: this.reasonDeparture.value
    };
    return await this.stayService.sendDepartureDate(data).toPromise().then(this.sendDepartureDateSuccess.bind(this));
  }
  private sendDepartureDateSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        return false;
      case 'OPERATION_SUCCESS':
        return true;
      default:
        return false;
    }

  }
  public getDate(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
  public getTime(date: Date) {
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }
}
