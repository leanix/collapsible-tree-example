import '@assets/reset.css';

import { json as d3json } from 'd3-fetch';
import { hierarchy as d3hierarchy, tree as d3tree } from 'd3-hierarchy';
import { select as d3select } from 'd3-selection';

import { render } from '@app/chart';
import { NODE_HEIGHT } from '@app/constants';
import { IData, ISize } from '@app/models';

(async () => {
  try {
    const data = await d3json('https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json');

    const hierarchy = d3hierarchy<IData>(data);
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    const size: ISize = {
      dx: NODE_HEIGHT + 10,
      dy: width / (hierarchy.height + 1)
    };

    const root = d3tree<IData>().nodeSize([size.dx, size.dy])(hierarchy);

    let x0 = Infinity;
    let x1 = -x0;
    root.each((d) => {
      if (d.x > x1) {
        x1 = d.x;
      }
      if (d.x < x0) {
        x0 = d.x;
      }
    });

    const svg = d3select('#app')
      .append('svg')
      .attr('viewBox', [0, 0, width, x1 - x0 + size.dx * 2].join(' '));

    const container = svg.append('g').attr('transform', `translate(${size.dy / 3},${size.dx - x0})`);

    render(container, root);
  } catch (error) {
    console.log(error);
  }
})();
