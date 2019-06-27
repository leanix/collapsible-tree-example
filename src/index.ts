import '@assets/reset.css';

import { json as d3json } from 'd3-fetch';
import { hierarchy as d3hierarchy, tree as d3tree } from 'd3-hierarchy';

import { render } from '@app/chart';
import { NODE_HEIGHT } from '@app/constants';
import { IData, INodeSize } from '@app/models';

(async () => {
  try {
    const data = await d3json('https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json');

    const hierarchy = d3hierarchy<IData>(data);
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    const size: INodeSize = {
      dx: width / (hierarchy.height + 1),
      dy: NODE_HEIGHT + 10,
    };

    const root = d3tree<IData>().nodeSize([size.dy, size.dx])(hierarchy);
    
    // Render using D3
    render('#app', root, width, size);

  } catch (error) {
    console.log(error);
  }
})();
