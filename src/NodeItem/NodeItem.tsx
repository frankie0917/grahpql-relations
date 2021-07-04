import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { useStore } from '../store';
import { setTransferData } from '../utils/dataTransfer';
import { px2num } from '../utils/px2num';
import { ReactComponent as DBIcon } from '../icon/Database.svg';
import { ReactComponent as TBIcon } from '../icon/Table.svg';
import './NodeItem.css';
import { toJS } from 'mobx';

interface Props {
  id: string;
}

export const NodeItem = observer(({ id }: Props) => {
  const elRef = useRef<HTMLDivElement>(null);
  const { nodeGraph } = useStore();
  const nodeData = nodeGraph.nodeDataMap[id];
  const midW = window.innerWidth / 2;
  const midH = window.innerHeight / 2;

  const [x, y] = useMemo(() => {
    const node = nodeGraph.g.node(id);
    if (node === undefined) {
      return [midW, midH];
    }

    return [node.x, node.y];
  }, [toJS(nodeGraph.nodeDataMap[id].rendered)]);

  useEffect(() => {
    if (!elRef.current) return;
    const { width, height } = window.getComputedStyle(elRef.current);
    const w = Number(width.split('px')[0]);
    const h = Number(height.split('px')[0]);
    nodeGraph.setNodeDimension(id, w, h);
    nodeGraph.g
      .setNode(id, { label: id, width: w, height: h })
      .setParent(id, nodeData.data.db);

    nodeGraph.setNodeRendered(id, true);
  }, [elRef.current]);

  const { db, tb, dbColor } = nodeData.data;
  return (
    <div
      className="node"
      id={id}
      draggable
      ref={elRef}
      style={{ left: x, top: y }}
      onDragStart={(e) => {
        setTransferData(e, {
          id,
          left: x - e.clientX,
          top: y - e.clientY,
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
