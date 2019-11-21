import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../shared module/material-module';
import { NetworkGraphComponent } from './network-graph.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DemoMaterialModule,
    BrowserAnimationsModule
  ],
  entryComponents: [],
  providers:[NetworkGraphComponent]
})
export class NetworkGraphModule { }
