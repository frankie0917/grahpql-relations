import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { setTransferData } from '../utils/dataTransfer';
import { px2num } from '../utils/px2num';

interface Props {
  id: string;
  top?: number;
  left?: number;
}

export const NodeItem = ({
  id,
  children,
  left = 0,
  top = 0,
}: PropsWithChildren<Props>) => {
  const elRef = useRef<HTMLDivElement>(null);
  const { nodeGraph } = useStore();

  const updateDimesion = () => {
    if (!elRef.current) return;
    console.log('update', id);
    nodeGraph.nodes[id].w = px2num(
      window.getComputedStyle(elRef.current).width,
    );

    nodeGraph.nodes[id].h = px2num(
      window.getComputedStyle(elRef.current).height,
    );
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
  return (
    <div
      className="node"
      id={id}
      draggable
      ref={elRef}
      style={{ left, top }}
      onDragStart={(e) => {
        setTransferData(e, {
          id,
          left: left - e.clientX,
          top: top - e.clientY,
        });
      }}
    >
      {children}
    </div>
  );
};
