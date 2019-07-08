import { Component, Input } from '@angular/core';

@Component({
  selector: '[node]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent {
  @Input() label: string;
  constructor() {}
}
