import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }
}
