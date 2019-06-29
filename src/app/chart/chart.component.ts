import { Observable } from 'rxjs';

import { Component } from '@angular/core';

import { IChartData } from './chart.models';
import { ChartService } from './chart.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  data: Observable<IChartData>;

  constructor(dataService: ChartService) {
    this.data = dataService.getData();

    this.data.subscribe((d) => {
      console.log(d);
    });
  }
}
