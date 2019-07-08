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
    return 301;
  }

  get height() {
    return this.expanded ? 501 : 301;
  }

  get viewBox() {
    return this.expanded
      ? '-20 -250 301 501'
      : '-20 -150 301 301'
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
