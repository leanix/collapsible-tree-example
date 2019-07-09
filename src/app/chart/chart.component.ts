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

    const newHeight = this.expanded ? 500 : 300;
    const newTop = this.expanded ? -250 : -150;

    const scrollOffset = this.top - newTop - this.elementRef.nativeElement.scrollTop;

    this.height = newHeight;
    this.top = newTop;

    window.requestAnimationFrame(() => {
      this.elementRef.nativeElement.scroll(0, scrollOffset);
    });
  }
}
