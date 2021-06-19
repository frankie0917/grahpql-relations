import { makeAutoObservable } from 'mobx';
import { Relation } from '../typings/Relation';

export type NodeItemData = { db: string; tb: string; connKey: string };
export class NodeItem {
  constructor(
    public id: string,
    public pos = { x: 0, y: 0 },
    public data: NodeItemData,
    private _w: number | null = null,
    private _h: number | null = null,
  ) {
    makeAutoObservable(this);
  }

  get w(): number {
    return this._w || 0;
  }
  set w(w: number | null) {
    this._w = w;
  }

  get h(): number {
    return this._h || 0;
  }

  set h(h: number | null) {
    this._h = h;
  }

  setX(x: number) {
    this.pos.x = x;
  }

  setY(y: number) {
    this.pos.y = y;
  }
}
