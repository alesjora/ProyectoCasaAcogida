import { Component, OnInit } from '@angular/core';
import { IgxFilterOptions } from 'igniteui-angular';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SearchByDateService } from '../service/search-by-date.service';
import { PersonTable } from 'src/app/models/person-table';

@Component({
  selector: 'app-search-by-entry-date',
  templateUrl: './search-by-entry-date.component.html',
  styleUrls: ['./search-by-entry-date.component.scss']
})
export class SearchByEntryDateComponent implements OnInit {

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
    this.searchByDateService.getPersonalFileByEntryDate({ 'fechaEntrada': this.getFecha() }).subscribe(response => {
      switch (response.status) {
        case 'SESSION_EXPIRED':
          this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
          break;
        case 'OPERATION_SUCCESS':
            response.data.forEach(element => {
              data.push(new PersonTable(element.key, element.name, element.surname, element.avatar, element.documentation));
            });
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
