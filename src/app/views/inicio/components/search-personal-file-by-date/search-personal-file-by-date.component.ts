import { Component, OnInit } from '@angular/core';
import { SearchByDateService } from '../service/search-by-date.service';
import { IgxFilterOptions } from 'igniteui-angular';
import { LogoutService } from 'src/app/shared/services/logout.service';

@Component({
  selector: 'app-search-personal-file-by-date',
  templateUrl: './search-personal-file-by-date.component.html',
  styleUrls: ['./search-personal-file-by-date.component.scss']
})
export class SearchPersonalFileByDateComponent implements OnInit {
  public date: Date;
  private dayFormatter = new Intl.DateTimeFormat('es', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });

  constructor(private logoutService: LogoutService, private searchByDateService: SearchByDateService) {
    this.date = new Date(Date.now());
  }


  public ngOnInit() {
    this.updateList();
  }
  public updateList() {
    const data = [];
    this.searchByDateService.getPersonalFileByDate({ 'fechaEntrada': this.getFecha() }).subscribe(response => {
      switch (response.status) {
        case 'SESSION_EXPIRED':
          this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
          break;
        case 'OPERATION_SUCCESS':
          if (response.data.length == 0) {
            //HACER ALGO
          } else {
            response.data.forEach(element => {
              data.push(new Person(element.key, element.name, element.surname, element.avatar, element.documentation));
            });
          }
          this.data = data;
          break;
      }
    });
  }

  public formatter = (date: Date) => {
    // tslint:disable-next-line:max-line-length
    return `${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
  private getFecha() {
    return this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
  }

  public search: string;
  public data: object[] = [];
  get fo() {
    const _fo = new IgxFilterOptions();
    _fo.key = 'nameSearch';
    _fo.inputValue = this.search;
    return _fo;
  }
}

class Person {
  constructor(key, name, surname, avatar, documentation) {
    this.key = key;
    this.name = name;
    this.surname = surname;
    this.avatar = avatar;
    this.documentation = documentation;
    this.nameSearch = name + ' ' + surname + ' ' + documentation;

  }
  public key: number;
  public name: string;
  public surname: string;
  public avatar: string;
  public documentation: string;
  public nameSearch: string;
}
