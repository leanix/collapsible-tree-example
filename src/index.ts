import '@assets/reset.css';

import * as d3 from 'd3';

import { render } from '@app/chart';
import { IData } from '@app/models';

(async () => {
  try {
    const data = await d3.json('https://raw.githubusercontent.com/d3/d3-hierarchy/v1.1.8/test/data/flare.json');

    const root = d3.hierarchy<IData>(data);

    root.descendants().forEach((d) => {
      d.data._children = d.children;
      d.children = undefined;
    });

    // Render using D3
    render(root);
  } catch (error) {
    console.log(error);
  }
})();
