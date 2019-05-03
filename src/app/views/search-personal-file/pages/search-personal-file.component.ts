import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { IgxFilterOptions } from 'igniteui-angular';
import { SearchPersonalFileService } from '../service/search-personal-file.service';
import { LogoutService } from 'src/app/shared/services/logout.service';

@Component({
  selector: 'app-search-personal-file',
  templateUrl: './search-personal-file.component.html',
  styleUrls: ['./search-personal-file.component.scss']
})
export class SearchPersonalFileComponent implements OnInit {

  show: boolean = false;
  constructor(private storeService: StoreService,
    private searchPersonalFileService: SearchPersonalFileService,
    private logoutService: LogoutService) {
    this.storeService.sendCurrentRoute('Buscar ficha personal');
  }

  public search: string;
  public data: object[] = [];
  get fo() {
    const _fo = new IgxFilterOptions();
    _fo.key = 'nameSearch';
    _fo.inputValue = this.search;
    return _fo;
  }
  public ngOnInit() {
    const data = [];
    this.searchPersonalFileService.getPersonalFile().subscribe(response => {
      switch (response.status) {
        case 'SESSION_EXPIRED':
          this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
          break;
        case 'OPERATION_SUCCESS':
          this.show = true;
          response.data.forEach(element => {
            data.push(new Person(element.key, element.name, element.surname, element.avatar, element.documentation));
          });
          this.data = data;
          break;
      }
    });
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

