import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  constructor(private storeService: StoreService) {
    this.storeService.sendCurrentRoute('Informes');
    this.storeService.checkPermission('tecnico');
  }
  ngOnInit() {
  }

}
