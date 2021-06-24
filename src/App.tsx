import React, { useEffect } from 'react';
import { NodeGraph } from './NodeGraph/NodeGraph';
import { useStore } from './store';
import mockData from './data/mockData.json';
import { Relation } from './typings/Relation';
import { observer } from 'mobx-react';

const data = mockData as Relation[];

function App() {
  const { nodeGraph } = useStore();

  useEffect(() => {
    const dbMap: Record<string, string> = {};

    let colors = [
      '#7CB43C',
      '#3787A4',
      '#A85F38',
      '#BD6ACD',
      '#602E8A',
      '#862D2D',
    ];
    let colorIndex = 0;

    const midW = window.innerWidth / 2;
    const midH = window.innerHeight / 2;
    data.forEach((r) => {
      const { from_database, from_table, to_database, to_table, path } = r;
      const fId = `${from_database}-${from_table}`;
      const tId = `${to_database}-${to_table}`;
      const [fKey, tKey] = path.split(':');
      if (!dbMap[from_database]) {
        colorIndex++;
        dbMap[from_database] = colors[colorIndex];
      }

      if (!dbMap[to_database]) {
        colorIndex++;
        dbMap[to_database] = colors[colorIndex];
      }

      if (!nodeGraph.hasNode(fId)) {
        nodeGraph.addNode(
          fId,
          {
            db: from_database,
            tb: from_table,
            connKey: fKey,
            dbColor: dbMap[from_database],
          },
          midW,
          midH,
        );
      }
      if (!nodeGraph.hasNode(tId)) {
        nodeGraph.addNode(
          tId,
          {
            db: to_database,
            tb: to_table,
            connKey: tKey,
            dbColor: dbMap[to_database],
          },
          midW,
          midH,
        );
      }

      nodeGraph.addConn({ from: fId, to: tId });
    });
  }, []);

  return (
    <div className="App">
      <NodeGraph />
    </div>
  );
}

export default observer(App);
