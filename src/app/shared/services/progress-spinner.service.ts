import { Injectable, Renderer2, ElementRef } from '@angular/core';
import { ProgressSpinnerComponent } from '../components/progress-spinner/progress-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {
  progresSpinner: ProgressSpinnerComponent;
  constructor() { }

  setProgresSpinner(progresSpinner: ProgressSpinnerComponent) {
    this.progresSpinner = progresSpinner;
  }


}
