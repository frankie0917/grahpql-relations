import React, { useMemo } from 'react';
import { Edge as EdgeT } from 'dagre';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import './EdgeMsg.css';

export const EdgeMsg = observer(({ e }: { e: EdgeT }) => {
  const id = `${e.v}-${e.w}`;
  const nodeGraph = useStore().nodeGraph;
  const { x, y, fKey, tKey } = useMemo(() => {
    const { points } = nodeGraph.g.edge(e);
    const { fKey, tKey } = nodeGraph.edgeDataMap[id];
    const p = points;

    return {
      ...p[Math.floor(p.length / 2)],
      fKey,
      tKey,
    };
  }, [e]);
  const isActive = nodeGraph.activeEdge === id;

  return (
    <div
      style={{
        top: y,
        left: x,
        opacity: isActive ? 1 : 0.2,
        zIndex: isActive ? 10 : 1,
      }}
      className="EdgeMsg"
    >
      {fKey}:{tKey}
    </div>
  );
});
