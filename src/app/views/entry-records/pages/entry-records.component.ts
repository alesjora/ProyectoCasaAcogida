import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-entry-records',
  templateUrl: './entry-records.component.html',
  styleUrls: ['./entry-records.component.scss']
})
export class EntryRecordsComponent implements OnInit {

  constructor(public storeService: StoreService) {
    this.storeService.checkPermission('tecnico');
    this.storeService.sendCurrentRoute('Registros');
  }

  ngOnInit() {
  }

}
