import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, RouterModule.forRoot([{ path: '', component: ChartComponent }])],
  declarations: [AppComponent, ChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
