import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IChartData } from './chart.models';

@Injectable()
export class ChartService {
  constructor(private http: HttpClient) {}

  dataUrl = 'https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json';

  getData() {
    return this.http.get<IChartData>(this.dataUrl);
  }
}
