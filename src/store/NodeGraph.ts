import { makeAutoObservable, toJS } from 'mobx';
import { NodeItemData } from './NodeItem';
import dagre from 'dagre';

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

  addEdge(fId: string, tId: string) {
    this.g.setEdge(fId, tId);
  }
}
