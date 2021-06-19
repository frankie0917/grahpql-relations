import { makeAutoObservable } from 'mobx';
import { Conn } from '../typings/Conn';
import { NodeItem } from './NodeItem';

export class NodeGraph {
  constructor() {
    makeAutoObservable(this);
  }

  nodes: Record<string, NodeItem> = {};
  connData: Conn[] = [];

  addNode(id: string, x = 0, y = 0) {
    this.nodes[id] = new NodeItem(id, { x, y });
  }

  addConn(conn: Conn) {
    this.connData.push(conn);
  }
}
