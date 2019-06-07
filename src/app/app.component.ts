import { Component, ViewChild, OnInit } from '@angular/core';
import { ProgressSpinnerComponent } from './shared/components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerService } from './shared/services/progress-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild ('progressSpinner') progressSpinner: ProgressSpinnerComponent;
  title = 'ProyectoFinalGrado';
  constructor(private progresSpinnerService: ProgressSpinnerService) {
  }

  ngOnInit() {
    this.progresSpinnerService.setProgresSpinner(this.progressSpinner);
  }

}
