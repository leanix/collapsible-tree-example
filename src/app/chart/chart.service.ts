import * as d3 from 'd3';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CHART_WIDTH, NODE_HEIGHT } from './chart.constants';
import { IChartData } from './chart.models';

@Injectable()
export class ChartService {
  constructor(private http: HttpClient) {}

  dataUrl = 'https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json';

  getData() {
    return this.http.get<IChartData>(this.dataUrl).pipe(
      map((data) => {
        const hierarchy = d3.hierarchy<IChartData>(data);

        const dx = CHART_WIDTH / (hierarchy.height + 1);
        const dy = NODE_HEIGHT + 10;

        return d3.tree<IChartData>().nodeSize([dy, dx])(hierarchy);
      })
    );
  }
}
