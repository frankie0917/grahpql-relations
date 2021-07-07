import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { useStore } from '../store';
import { Edge as EdgeT } from 'dagre';

export const Edge = observer(({ e }: { e: EdgeT }) => {
  const nodeStore = useStore().nodeGraph;

  const { points } = nodeStore.g.edge(e);

  const d = useMemo(() => {
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve
    // TODO: investigate better curve
    const p = points;
    // return [
    //   `M ${p[0].x} ${p[0].y}`,
    //   // draw
    //   `L ${p[p.length - 1].x} ${p[p.length - 1].y}`,
    // ];

    const M = [`M ${p[0].x} ${p[0].y}`];

    const C = (i: number, s = true) => {
      if (s) {
        return [
          // control
          `${p[i].x},${p[i].y}`,
          `${p[i].x},${p[i].y}`,
          // point
          `${p[i + 1].x},${p[i + 1].y}`,
        ];
      } else {
        return [
          // control
          `${p[i].x},${p[i].y}`,
          `${p[i + 1].x},${p[i + 1].y}`,
          // point
          `${p[i + 2].x},${p[i + 2].y}`,
        ];
      }
    };

    switch (points.length) {
      case 5:
        return [...M, `C`, ...C(1), ...C(3)];
      case 9:
        return [...M, `C`, ...C(1, false), ...C(4), ...C(6, false)];
      case 4:
      default:
        return [...M, `C`, ...C(1, false)];
    }
  }, [points]);

  return (
    <path
      d={d.join(' ')}
      fill="transparent"
      strokeWidth={2}
      stroke="#444"
      onMouseEnter={() => {
        nodeStore.setActiveEdge(`${e.v}-${e.w}`);
      }}
      onMouseLeave={() => {
        nodeStore.setActiveEdge(null);
      }}
    ></path>
  );
});
