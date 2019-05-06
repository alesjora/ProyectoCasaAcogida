import { Component, OnInit } from '@angular/core';
import { ShowPersonalFileService } from '../service/show-personal-file.service';
import { ActivatedRoute } from '@angular/router';
import { LogoutService } from 'src/app/shared/services/logout.service';

@Component({
  selector: 'app-show-personal-file',
  templateUrl: './show-personal-file.component.html',
  styleUrls: ['./show-personal-file.component.scss']
})
export class ShowPersonalFileComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private showPersonalFileService: ShowPersonalFileService, private logoutService: LogoutService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.showPersonalFileService.getPersonalFile({ id }).subscribe(response => {
      switch (response.status) {
        case 'SESSION_EXPIRED':
          this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
          break;
        case 'OPERATION_SUCCESS':
          console.log(response.data);
          break;
        default:
          this.logoutService.goToLogin();
          break;
      }
    })
  }

}
