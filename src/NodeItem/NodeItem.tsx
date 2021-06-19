import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';
import { setTransferData } from '../utils/dataTransfer';
import { px2num } from '../utils/px2num';
import { ReactComponent as DBIcon } from '../icon/Database.svg';
import { ReactComponent as TBIcon } from '../icon/Table.svg';
import './NodeItem.css';

interface Props {
  id: string;
}

export const NodeItem = observer(({ id }: Props) => {
  const elRef = useRef<HTMLDivElement>(null);
  const { nodeGraph } = useStore();
  const node = nodeGraph.nodes[id];

  const updateDimesion = () => {
    if (!elRef.current) return;
    node.w = px2num(window.getComputedStyle(elRef.current).width);

    node.h = px2num(window.getComputedStyle(elRef.current).height);
  };

  useEffect(() => {
    if (!elRef.current) return;
    updateDimesion();

    const observer = new MutationObserver(() => {
      updateDimesion();
    });

    observer.observe(elRef.current, {
      attributeFilter: ['style'],
    });
  }, []);

  const { db, tb, dbColor } = node.data;
  return (
    <div
      className="node"
      id={id}
      draggable
      ref={elRef}
      style={{ left: node.pos.x, top: node.pos.y }}
      onDragStart={(e) => {
        setTransferData(e, {
          id,
          left: node.pos.x - e.clientX,
          top: node.pos.y - e.clientY,
        });
      }}
    >
      <div className="f-db" style={{ backgroundColor: dbColor }}>
        <DBIcon />
        {db}
      </div>
      <div className="f-tb">
        <TBIcon fill={dbColor} />
        {tb}
      </div>
    </div>
  );
});
