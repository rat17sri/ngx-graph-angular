import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NetworkGraphComponent } from './network-graph/network-graph.component';
import { NetworkGraphModule } from './network-graph/network-graph.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { DemoMaterialModule } from './shared module/material-module';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";



@NgModule({
  imports: [ BrowserModule, 
                  FormsModule, 
                  NetworkGraphModule, 
                  NgxGraphModule, 
                  NgxChartsModule, 
                  DemoMaterialModule,
                  HttpClientModule,
                  HttpModule,
                  ReactiveFormsModule],
  declarations: [ AppComponent, NetworkGraphComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
