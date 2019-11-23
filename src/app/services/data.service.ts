import { Injectable } from "@angular/core";

export interface NodeData {
  id: string;
  label: string;
}

export interface LinkData {
  id: string;
  source: string;
  target: string;
}

const nodeData: NodeData[] = [
  {
    id: "1",
    label: "Node A"
  },
  {
    id: "2",
    label: "Node B"
  },
  {
    id: "3",
    label: "Node C"
  },
  {
    id: "4",
    label: "Node D"
  },
  {
    id: "5",
    label: "Node E"
  },
  {
    id: "6",
    label: "Node F"
  }
];

const linkData: LinkData[] = [
  {
    id: "A",
    source: "1",
    target: "2"
  },
  {
    id: "B",
    source: "1",
    target: "3"
  },
  {
    id: "C",
    source: "1",
    target: "4"
  },
  {
    id: "D",
    source: "1",
    target: "5"
  },
  {
    id: "E",
    source: "3",
    target: "6"
  },
  {
    id: "F",
    source: "4",
    target: "6"
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
