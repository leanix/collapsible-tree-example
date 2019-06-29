import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component } from '@angular/core';

import { CHART_WIDTH, NODE_HEIGHT } from './chart.constants';
import { IChartData, IChartDimension } from './chart.models';
import { ChartService } from './chart.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  nodes: Observable<d3.HierarchyPointNode<IChartData>[]>;
  links: Observable<d3.HierarchyPointLink<IChartData>[]>;
  root: Observable<d3.HierarchyPointNode<IChartData>>;

  dimensions: Observable<IChartDimension>;
  dy = NODE_HEIGHT + 10;
  viewBoxProps: Observable<string>;
  gContainerProps: Observable<string>;

  constructor(dataService: ChartService) {
    this.root = dataService.getData();

    this.nodes = this.root.pipe(
      map((data) => {
        return data.descendants();
      })
    );
    this.links = this.root.pipe(
      map((data) => {
        return data.links();
      })
    );

    this.dimensions = this.root.pipe(
      map((rootNode) => {
        let y0 = Infinity;
        let y1 = -y0;
        rootNode.each((d) => {
          if (d.x > y1) {
            y1 = d.x;
          }
          if (d.x < y0) {
            y0 = d.x;
          }
        });
        return {
          minY: y0,
          maxY: y1,
          minX: 0,
          maxX: CHART_WIDTH
        };
      })
    );

    this.viewBoxProps = this.dimensions.pipe(
      map((dim) => {
        return `0 0 ${dim.maxX} ${dim.maxY - dim.minY + this.dy * 2}`;
      })
    );

    this.gContainerProps = this.dimensions.pipe(
      map((dim) => {
        return `translate(${10},${this.dy - dim.minY})`;
      })
    );
  }
}
