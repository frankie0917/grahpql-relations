import React, { useEffect, useRef } from 'react';
import { NodeGraph } from './NodeGraph/NodeGraph';
import { useStore } from './store';
import mockData from './data/mockData.json';
import { Relation } from './typings/Relation';
import { observer } from 'mobx-react';
import dagre from 'dagre';
import { toJS } from 'mobx';

const data = mockData as Relation[];
// const data: Relation[] = [
//   {
//     from_database: 'A',
//     from_table: 'a',
//     to_database: 'B',
//     to_table: 'b',
//     '1-N?': false,
//     path: 'b_id:b_id',
//   },
//   {
//     from_database: 'A',
//     from_table: 'a',
//     to_database: 'C',
//     to_table: 'c',
//     '1-N?': false,
//     path: 'c_id:c_id',
//   },
// ];

function App() {
  const { nodeGraph } = useStore();
  const edges = useRef<[string, string][]>([]);

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
        nodeGraph.addNode(fId, {
          db: from_database,
          tb: from_table,
          connKey: fKey,
          dbColor: dbMap[from_database],
        });
      }
      if (!nodeGraph.hasNode(tId)) {
        nodeGraph.addNode(tId, {
          db: to_database,
          tb: to_table,
          connKey: tKey,
          dbColor: dbMap[to_database],
        });
      }

      edges.current.push([fId, tId]);
    });
  }, []);

  useEffect(() => {
    if (
      Object.keys(nodeGraph.nodeDataMap).length ===
      nodeGraph.renderedList.length
    ) {
      edges.current.forEach((e) => {
        nodeGraph.addEdge(...e);
      });
      dagre.layout(nodeGraph.g);
    }
  }, [toJS(nodeGraph.nodeDataMap), toJS(nodeGraph.renderedList)]);

  return (
    <div className="App">
      <NodeGraph />
    </div>
  );
}

export default observer(App);
