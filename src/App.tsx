import React, { useEffect } from 'react';
import { NodeGraph } from './NodeGraph/NodeGraph';
import { useStore } from './store';
import mockData from './data/mockData.json';
import { Relation } from './typings/Relation';

const data = mockData as Relation[];

function App() {
  const { nodeGraph } = useStore();

  useEffect(() => {
    data.forEach((r) => {
      const { from_database, from_table, to_database, to_table } = r;
      const id = `${from_database}-${from_table}-${to_database}-${to_table}`;
      nodeGraph.addNode(id, r);
    });
  }, []);

  return (
    <div className="App">
      <NodeGraph />
    </div>
  );
}

export default App;
