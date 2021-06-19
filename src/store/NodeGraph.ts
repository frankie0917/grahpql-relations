import { makeAutoObservable } from 'mobx';
import { Conn } from '../typings/Conn';
import { Relation } from '../typings/Relation';
import { NodeItem, NodeItemData } from './NodeItem';

export class NodeGraph {
  constructor() {
    makeAutoObservable(this);
  }

  nodes: Record<string, NodeItem> = {};
  connData: Conn[] = [];

  addNode(id: string, data: NodeItemData, x = 0, y = 0) {
    const nId = `N-${id}`;
    this.nodes[nId] = new NodeItem(nId, { x, y }, data);
  }

  hasNode(id: string) {
    const nId = `N-${id}`;
    return Boolean(this.nodes[nId]);
  }

  addConn(conn: Omit<Conn, 'id'>) {
    this.connData.push({ ...conn, id: `C-${conn.from}-${conn.to}` });
  }
}
