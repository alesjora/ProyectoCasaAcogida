import { Component, OnInit, ViewChild, Renderer2, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {
  @ViewChild ('progresSpinnerDiv') progresSpinnerDiv: ElementRef;

  constructor(private renderer2: Renderer2) {

  }

  ngOnInit() {
  }

  visible() {
    this.renderer2.addClass(this.progresSpinnerDiv.nativeElement, 'visible');
  }
  invisible() {
    this.renderer2.removeClass(this.progresSpinnerDiv.nativeElement, 'visible');
  }

}
