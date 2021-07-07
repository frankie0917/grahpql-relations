import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';
import { Edge } from '../Edge/Edge';
import { EdgeMsg } from '../EdgeMsg/EdgeMsg';
import { NodeItem } from '../NodeItem/NodeItem';
import { useStore } from '../store';
import { getTransferData } from '../utils/dataTransfer';
import { DotBg } from './DotBg';
import './NodeGraph.css';

export const NodeGraph = observer(() => {
  const nodeStore = useStore().nodeGraph;

  const edges = useMemo(() => {
    return nodeStore.g.edges();
  }, [toJS(nodeStore.nodeDataMap)]);

  return (
    <div className="node-graph-container">
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 10,
          left: 50,
          top: 50,
        }}
      >
        <div>
          {edges.map((e, i) => (
            <EdgeMsg key={i} e={e} />
          ))}
        </div>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            return false;
          }}
          onDrop={(e) => {
            const { id, left, top } = getTransferData(e);
            nodeStore.g.node(id).x = left + e.clientX;
            nodeStore.g.node(id).y = top + e.clientY;
          }}
        >
          {Object.entries(nodeStore.nodeDataMap).map(([id]) => {
            return <NodeItem id={id} key={id} />;
          })}
        </div>

        <svg width="100%" height="100%">
          {edges.map((e, i) => (
            <Edge key={i} e={e} />
          ))}
        </svg>
      </div>
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
      >
        <DotBg />
      </svg>
    </div>
  );
});
