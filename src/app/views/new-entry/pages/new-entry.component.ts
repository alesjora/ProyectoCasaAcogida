import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  public personalFiles = [
    {
      id: '1',
      name: 'José Rafael Álvarez Espino',
      image: 'http://localhost/api/public/image/StandarProfile.png',
    }
    ,
    {
      id: '2',
      name: 'José Aguilera Ruiz',
      image: 'http://localhost/api/public/image/StandarProfile.png',
    }
    ,
    {
      id: '3',
      name: 'José Antonio Sánchez Guzmán',
      image: 'http://localhost/api/public/image/StandarProfile.png',
    }
    ,
    {
      id: '4',
      name: 'José Francisco Prieto Cruz',
      image: 'http://localhost/api/public/image/StandarProfile.png',
    }
    ,
    {
      id: '5',
      name: 'José Julián Garzón Easdo',
      image: 'http://localhost/api/public/image/StandarProfile.png',
    }
    ,

    {
      id: '6',
      name: 'Marcos Gallardo Pérez',
      image: 'http://localhost/api/public/image/StandarProfile.png',
    }
  ];

  public rooms = [{id: '1', number: '1'}, {id: '2', number: '2'}, {id: '3', number: '3'}];
  public beds = [{id: '1', number: '1'}, {id: '2', number: '2'}, {id: '3', number: '3'}];




  public personalFileSelected;
  public personalFileId;
  public newEntryForm;
  public date: Date;
  private dayFormatter = new Intl.DateTimeFormat('es', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });
  public selectedRoom;


  constructor(public fb: FormBuilder) {
    this.date = new Date(Date.now());
  }

  createForm() {
    this.newEntryForm = this.fb.group({
      personalFile: ['', [Validators.required, CustomValidators.namePersonSelectedValidator(this.personalFiles, 'personalFile')]],
      entryDate: [''],
      entryHour: [''],
      room: ['', [Validators.required]],
      bed: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.createForm();
  }

  get personalFile(){
    return this.newEntryForm.get('personalFile');
  }
  get room() {
    return this.newEntryForm.get('room');
  }
  get bed() {
    return this.newEntryForm.get('bed');
  }

  selectPerson(person) {
    this.personalFileId = person.id;
    return person.name;
  }

  public formatter = (date: Date) => {
    // tslint:disable-next-line:max-line-length
    return `${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }

  public sendData() {
    console.log(this.personalFileId);
  }
}
@Pipe({ name: 'startsWith' })
export class AutocompletePipeStartsWith implements PipeTransform {
  public transform(collection: any[], term = '') {
    if (term === '') {
      return;
    }
    return collection.filter((item) => {
      return item.name.toString().toLowerCase().startsWith(term.toString().toLowerCase());
    });
  }
}
