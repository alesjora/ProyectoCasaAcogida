import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { StayService } from '../../services/stay.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../../services/snack-bar.service';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-change-room-dialog',
  templateUrl: './change-room-dialog.component.html',
  styleUrls: ['./change-room-dialog.component.scss']
})
export class ChangeRoomDialogComponent implements OnInit {

  @ViewChild('changeRoomDialog') changeRoomDialog;

  constructor(private stayService: StayService,
              private snackBarService: SnackBarService,
              public fb: FormBuilder,
              private logoutService: LogoutService) { }
  public rooms = [];
  changeBedForm = this.fb.group({
    room: ['', [Validators.required, Validators.min(1)]],
    bed: ['', [Validators.required, Validators.min(1)]]
  });
  ngOnInit() {
    this.stayService.getRoomsAndBedsAvailable().subscribe(this.getRoomsAndBedsAvailableSuccess.bind(this),
    this.snackBarService.showSnackbar.bind(this, 'Error al conectar con el servidor', 3000, 'bottom', 'error'))
  }
  get room() {
    return this.changeBedForm.get('room');
  }
  get bed() {
    return this.changeBedForm.get('bed');
  }
  getRoomsAndBedsAvailableSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.rooms = response.data;
        break;
      default:
        this.snackBarService.showSnackbar('No hay camas disponibles.', 3000, 'bottom', 'error');
        break;
    }
  }

  selectBedsOfRoom() {
    const room = this.rooms.find(value => {
      return value.id === this.room.value;
    });
    if (room == null) {
      return;
    }
    return room.beds;
  }
  async sendData(idRegistro, idRegistroCamas) {
    const data = {
      idCama: this.bed.value,
      idRegistro,
      idRegistroCamas
    };
    return await this.stayService.sendChangeRoom(data).toPromise().then(this.sendChangeRoomSuccess.bind(this));
  }
  private sendChangeRoomSuccess(response) {
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
}
