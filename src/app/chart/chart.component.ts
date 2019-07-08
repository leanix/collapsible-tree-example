import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  constructor(private elementRef: ElementRef) {}

  expanded = false;

  @HostListener('click')
  toggleExpand() {
    this.expanded = !this.expanded;

    if (this.expanded) {
      window.requestAnimationFrame(() => {
        this.elementRef.nativeElement.scroll(0, 100);
      });
    }
  }
}
