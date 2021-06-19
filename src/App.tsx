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
    data.forEach((r) => {
      const { from_database, from_table, to_database, to_table, path } = r;
      const fId = `${from_database}-${from_table}`;
      const tId = `${to_database}-${to_table}`;
      const [fKey, tKey] = path.split(':');
      if (!nodeGraph.hasNode(fId)) {
        nodeGraph.addNode(fId, {
          db: from_database,
          tb: from_table,
          connKey: fKey,
        });
      }
      if (!nodeGraph.hasNode(tId)) {
        nodeGraph.addNode(tId, {
          db: to_database,
          tb: to_table,
          connKey: tKey,
        });
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
