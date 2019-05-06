import { Component, OnInit } from '@angular/core';
import { IgxFilterOptions } from 'igniteui-angular';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SearchByDateService } from '../service/search-by-date.service';
import { Subscription } from 'rxjs';
import { PersonTable } from 'src/app/models/person-table';


@Component({
  selector: 'app-search-by-departure-date',
  templateUrl: './search-by-departure-date.component.html',
  styleUrls: ['./search-by-departure-date.component.scss']
})
export class SearchByDepartureDateComponent implements OnInit {

  public date: Date;
  private suscription: Subscription;
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
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
    this.suscription = this.searchByDateService.getPersonalFileByDepartureDate({ 'fechaSalida': this.getFecha() }).subscribe(response => {
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
