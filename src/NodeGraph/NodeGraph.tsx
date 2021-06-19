import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { NodeItem } from '../NodeItem/NodeItem';
import { useStore } from '../store';
import { getTransferData } from '../utils/dataTransfer';
import { DotBg } from './DotBg';
import './NodeGraph.css';

export const NodeGraph = observer(() => {
  const nodeStore = useStore().nodeGraph;
  useEffect(() => {
    ['1', '2', '3'].forEach((id, i) => {
      nodeStore.addNode(`N-${id}`, i * 100 + 100, 100);
    });

    nodeStore.addConn({ from: 'N-1', to: 'N-2' });
  }, []);
  const [nodesLoaded, setNodesLoaded] = useState(false);
  const nodeWrapperRef = useRef<HTMLDivElement>(null);

  // find better way to check whether nodes loaded
  useEffect(() => {
    const checkNodesLoaded = () => {
      const nodes = Object.keys(nodeStore.nodes);
      const el = document.getElementById(nodes[nodes.length - 1]);
      if (el) {
        setNodesLoaded(true);
        return;
      } else {
        setTimeout(() => {
          checkNodesLoaded();
        });
      }
    };
    checkNodesLoaded();
  }, []);
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
        ref={nodeWrapperRef}
      >
        {Object.entries(nodeStore.nodes).map(
          (
            [
              id,
              {
                pos: { x, y },
              },
            ],
            i,
          ) => {
            return (
              <NodeItem id={id} key={id} left={x} top={y}>
                {id}
              </NodeItem>
            );
          },
        )}
      </div>
      <svg width="100%" height="100%">
        {nodesLoaded &&
          nodeStore.connData.map(({ from, to }) => {
            const id = `C-${from}-${to}`;

            const [f, t] = [nodeStore.nodes[from], nodeStore.nodes[to]];
            const d: string[] = [
              // Move
              `M ${f.pos.x + f.w / 2} ${f.pos.y + f.h / 2}`,
              `L ${t.pos.x + t.w / 2} ${t.pos.y + t.h / 2}`,
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
        <DotBg />
      </svg>
    </div>
  );
});
