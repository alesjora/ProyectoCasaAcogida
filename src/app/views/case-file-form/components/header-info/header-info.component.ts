import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.scss']
})
export class HeaderInfoComponent implements OnInit {

  constructor() { }
  @Input ('nombre') nombre;
  ngOnInit() {
  }

}
