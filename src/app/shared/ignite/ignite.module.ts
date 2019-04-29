import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IgxButtonModule,
  IgxIconModule,
  IgxLayoutModule,
  IgxNavigationDrawerModule,
  IgxRadioModule,
  IgxRippleModule,
  IgxSwitchModule,
  IgxToggleModule,
  IgxNavbarModule
} from "igniteui-angular";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [IgxButtonModule,
    IgxIconModule,
    IgxLayoutModule,
    IgxNavigationDrawerModule,
    IgxRadioModule,
    IgxRippleModule,
    IgxSwitchModule,
    IgxToggleModule,
    IgxNavbarModule]
})
export class IgniteModule { }
