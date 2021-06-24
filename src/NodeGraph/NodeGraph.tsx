import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { NodeItem } from '../NodeItem/NodeItem';
import { useStore } from '../store';
import { getTransferData } from '../utils/dataTransfer';
import { DotBg } from './DotBg';
import './NodeGraph.css';

export const NodeGraph = observer(() => {
  const nodeStore = useStore().nodeGraph;
  // useEffect(() => {
  //   const mainAnimation = () => {

  //     requestAnimationFrame(mainAnimation);
  //   };

  //   mainAnimation();
  // }, []);
  return (
    <div className="node-graph-container">
      <div
        className="node-wrapper"
        onDragOver={(e) => {
          e.preventDefault();
          return false;
        }}
        onDrop={(e) => {
          const { id, left, top } = getTransferData(e);

          nodeStore.nodes[id].setX(left + e.clientX);
          nodeStore.nodes[id].setY(top + e.clientY);
        }}
      >
        {Object.entries(nodeStore.nodes).map(([id]) => {
          return <NodeItem id={id} key={id} />;
        })}
      </div>
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', zIndex: 5 }}
      >
        <DotBg />
        {nodeStore.connData.map(({ from, to }) => {
          const id = `C-${from}-${to}`;

          const [f, t] = [
            nodeStore.nodes[`N-${from}`],
            nodeStore.nodes[`N-${to}`],
          ];
          const d: string[] = [
            // Move
            `M ${f.pos.x} ${f.pos.y}`,
            `L ${t.pos.x} ${t.pos.y}`,
            `Z`,
          ];
          return (
            <path
              key={id}
              id={id}
              d={d.join(' ')}
              fill="transparent"
              strokeWidth={2}
              stroke="#444"
            ></path>
          );
        })}
      </svg>
    </div>
  );
});
