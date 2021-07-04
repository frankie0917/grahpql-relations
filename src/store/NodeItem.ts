import { makeAutoObservable } from 'mobx';
import { Vector } from './Vector';

export type NodeItemData = {
  db: string;
  tb: string;
  connKey: string;
  dbColor: string;
};
export class NodeItem {
  vel: Vector;
  acc: Vector;
  constructor(
    public id: string,
    public pos = new Vector(0, 0),
    public data: NodeItemData,
    public w: number | null = null,
    public h: number | null = null,
  ) {
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    makeAutoObservable(this);
  }

  setX(x: number) {
    this.pos.x = x;
  }

  setY(y: number) {
    this.pos.y = y;
  }
}
