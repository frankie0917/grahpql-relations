import { makeAutoObservable, toJS } from 'mobx';
import { NodeItemData } from './NodeItem';
import dagre from 'dagre';

export type EdgeData = { fId: string; tId: string; fKey: string; tKey: string };

export class NodeGraph {
  public g: dagre.graphlib.Graph<{}>;
  public nodeDataMap: Record<
    string,
    {
      data: NodeItemData;
      w: number | null;
      h: number | null;
      rendered: boolean;
    }
  > = {};
  public activeEdge: string | null = null;
  public edgeDataMap: Record<string, EdgeData> = {};

  renderedList: string[] = [];

  constructor() {
    this.g = new dagre.graphlib.Graph({ directed: true, compound: true });
    this.g.setGraph({ width: window.innerWidth, height: window.innerHeight });
    this.g.setDefaultEdgeLabel(function () {
      return {};
    });
    makeAutoObservable(this);
  }

  addNode(id: string, data: NodeItemData) {
    if (this.hasNode(id)) return;

    this.nodeDataMap[id] = { data, w: null, h: null, rendered: false };
  }

  setNodeRendered(id: string, rendered: boolean) {
    if (!this.hasNode(id)) return;

    if (rendered) {
      this.renderedList.push(id);
    }

    this.nodeDataMap[id].rendered = rendered;
  }

  setNodeDimension(id: string, w: number, h: number) {
    if (!this.hasNode(id)) return;
    this.nodeDataMap[id].w = w;
    this.nodeDataMap[id].h = h;
  }

  hasNode(id: string) {
    return Boolean(this.nodeDataMap[id]);
  }

  hasEdge(id: string) {
    return Boolean(this.edgeDataMap[id]);
  }

  addEdge(e: EdgeData) {
    const id = `${e.fId}-${e.tId}`;
    if (this.hasEdge(id)) return;
    this.edgeDataMap[id] = e;
    this.g.setEdge(e.fId, e.tId);
  }

  setActiveEdge = (id: string | null) => {
    if (id === null) return (this.activeEdge = id);

    if (!this.hasEdge(id)) return;
    this.activeEdge = id;
  };
}
