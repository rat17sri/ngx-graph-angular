import { Injectable } from "@angular/core";

export class NodeData {
  id: string;
  label: string;
}

export class LinkData {
  id: string;
  source: string;
  target: string;
}

const nodeData: NodeData[] = [
  {
    id: "first",
    label: "A"
  },
  {
    id: "second",
    label: "B"
  },
  {
    id: "c1",
    label: "C1"
  },
  {
    id: "c2",
    label: "C2"
  },
  {
    id: "d",
    label: "D"
  }
];

const linkData: LinkData[] = [
  {
    id: "a",
    source: "first",
    target: "second"
  },
  {
    id: "b",
    source: "first",
    target: "c1"
  },
  {
    id: "d",
    source: "first",
    target: "c2"
  },
  {
    id: "e",
    source: "c1",
    target: "d"
  },
  {
    id: "f",
    source: "c1",
    target: "d"
  }
];

@Injectable({
  providedIn: "root"
})
export class DataService {
  getNodeData() {
    return nodeData;
  }
  getLinkData() {
    return linkData;
  }
}
