import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/shared/services/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService: LogoutService) { 
    this.logoutService.logout();
  }

  ngOnInit() {
  }

}
