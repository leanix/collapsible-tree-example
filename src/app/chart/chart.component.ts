import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  constructor(private elementRef: ElementRef) {}

  expanded = false;

  get width() {
    return 300;
  }

  get height() {
    return this.expanded ? 500 : 300;
  }

  get viewBox() {
    return this.expanded
      ? '-20 -250 300 500'
      : '-20 -150 300 300'
  }

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
