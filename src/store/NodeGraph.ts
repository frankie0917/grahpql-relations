import { makeAutoObservable } from 'mobx';
import { Conn } from '../typings/Conn';
import { Relation } from '../typings/Relation';
import { NodeItem } from './NodeItem';

export class NodeGraph {
  constructor() {
    makeAutoObservable(this);
  }

  nodes: Record<string, NodeItem> = {};
  connData: Conn[] = [];

  addNode(id: string, data: Relation, x = 0, y = 0) {
    const nId = `N-${id}`;
    this.nodes[nId] = new NodeItem(nId, { x, y }, data);
  }

  addConn(conn: Conn) {
    this.connData.push({ ...conn, id: `C-${conn.from + conn.to}` });
  }
}
