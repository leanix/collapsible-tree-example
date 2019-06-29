import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { ChartService } from './chart/chart.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: '', component: ChartComponent }])
  ],
  providers: [ChartService],
  declarations: [AppComponent, ChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
