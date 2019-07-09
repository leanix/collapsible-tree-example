import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  constructor(private elementRef: ElementRef) {}

  expanded = false;
  height = 300;
  top = -150;

  get width() {
    return 300;
  }

  get viewBox() {
    return `-20 ${this.top} ${this.width} ${this.height}`;
  }

  @HostListener('click')
  toggleExpand() {
    this.expanded = !this.expanded;

    const deltaTop = this.expanded ? 100 : -100;
    const deltaBottom = this.expanded ? 100 : -100;
    const scrollOffset = deltaTop - this.elementRef.nativeElement.scrollTop;

    this.height += deltaTop + deltaBottom;
    this.top -= deltaTop;

    window.requestAnimationFrame(() => {
      this.elementRef.nativeElement.scroll(0, scrollOffset);
    });
  }
}
