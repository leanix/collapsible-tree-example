import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  constructor() {}
  expanded = false;

  @HostListener('click')
  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
