import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { colorSets } from './color-sets';
import { Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { VERSION, MatSnackBar } from '@angular/material';
import { NetworkService } from '../services/network.service';
import swal from "sweetalert2";

@Component({
  selector: "app-network-graph",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./network-graph.component.html",
  styleUrls: ["./network-graph.component.css"]
})
export class NetworkGraphComponent implements OnInit {

  nodeName: string;
  deleteNodeName: string;
  sourceNode: string;
  targetNode: string;
  source_Id: any;
  target_Id: any;
  node_Id: any;
  originNodeOptions = [];
  targetNodeOptions = [];
  deleteNodeOptions = [];
  nodeOptionsControl = new FormControl("", [Validators.required]);
  dappBoxNetwork = {};

  entryValue = "A";
  entryNodeId = 1;
  entryProcessId = 1;
  count = 1;

  Nodes = [];
  Edges = [];
  Network_Graph = { Nodes: [], Edges: [] };

  version = VERSION;

  hierarchicalGraph = { nodes: [], links: [] };

  view: any[];
  width: any;
  height: any;
  fitContainer = true;
  autoZoom = true;
  panOnZoom = false;
  enableZoom = false;
  autoCenter = true;
  zoomSpeed: number = 0.01;
  update$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  showLegend = true;

  orientation = "LR"; // LR, RL, TB, BT
  orientations: any[] = [
    {
      label: "Left to Right",
      value: "LR"
    },
    {
      label: "Right to Left",
      value: "RL"
    },
    {
      label: "Top to Bottom",
      value: "TB"
    },
    {
      label: "Bottom to Top",
      value: "BT"
    }
  ];

  // line interpolation
  curveType = "Linear";
  curve = shape.curveBundle.beta(1);
  interpolationTypes = [
    "Bundle",
    "Cardinal",
    "Catmull Rom",
    "Linear",
    "Monotone X",
    "Monotone Y",
    "Natural",
    "Step",
    "Step After",
    "Step Before"
  ];
  colorSchemes: any;
  colorScheme: any;
  schemeType = "ordinal";
  selectedColorScheme: string;

  constructor(private snackBar: MatSnackBar, private networkService: NetworkService) {
    Object.assign(this, {
      colorSchemes: colorSets
    });

    this.setColorScheme("picnic");
    this.setInterpolationType("Bundle");
  }

  ngOnInit() {

    if (sessionStorage.getItem("Nodes") !== null) {
      let keysToGet = [
        "entryNodeId",
        "Nodes",
        "NetworkNodes",
        "originNodeOptions",
        "targetNodeOptions",
        "deleteNodeOptions"
      ];
      [
        this.entryNodeId,
        this.Nodes,
        this.Network_Graph,
        this.originNodeOptions,
        this.targetNodeOptions,
        this.deleteNodeOptions
      ] = this.networkService.getSessionStorage(keysToGet);
    } else {
      // this.networkService.getdappDetails("dummy").subscribe(result => {});
    }

    if (sessionStorage.getItem("Edges") != null) {
      let keysToGet = ["entryProcessId", "Edges", "entryValue", "NetworkEdges"];
      [
        this.entryProcessId,
        this.Edges,
        this.entryValue,
        this.Network_Graph
      ] = this.networkService.getSessionStorage(keysToGet);
    } else {
      // this.networkService.getdappDetails("dummy").subscribe(result => {});
    }

    this.hierarchicalGraph.nodes = this.Nodes;
    this.hierarchicalGraph.links = this.Edges;

    if (!this.fitContainer) {
      this.applyDimensions();
    }

    // this.networkService.getdappDetails("dummy").subscribe(result => {});
  }

  openSnackBar(message: string) {
    this.snackBar.open(message)._dismissAfter(2000);
  }

  addNode() {
    if (this.getByValue(this.Nodes, this.nodeName) >= 1) {
      this.openSnackBar("Name already exists !");
    } else {
      this.Nodes.push({
        id: (this.entryNodeId + 1).toString(),
        label: this.nodeName
      });
      this.Network_Graph.Nodes.push({
        id: (this.entryNodeId + 1).toString(),
        label: this.nodeName
      });
      this.originNodeOptions.push(this.nodeName);
      this.targetNodeOptions.push(this.nodeName);
      this.deleteNodeOptions.push(this.nodeName);
      this.entryNodeId = this.entryNodeId + 1;
      let keys = [
        "entryNodeId",
        "Nodes",
        "NetworkNodes",
        "originNodeOptions",
        "targetNodeOptions",
        "deleteNodeOptions"
      ];
      this.networkService.removeSessionStorage(keys);
      let valuesToSet = [
        this.entryNodeId,
        this.Nodes,
        this.Network_Graph,
        this.originNodeOptions,
        this.targetNodeOptions,
        this.deleteNodeOptions
      ];
      this.networkService.setSessionStorage(keys, valuesToSet);
    }
  }

  connectNode() {
    this.source_Id = this.Nodes[
      this.Nodes.findIndex(x => x.label == this.sourceNode)
    ].id;
    this.target_Id = this.Nodes[
      this.Nodes.findIndex(x => x.label == this.targetNode)
    ].id;
    if (this.source_Id === this.target_Id) {
      this.openSnackBar("Same dAppBox can not be connected");
    } else {
      this.Edges.push({
        id: this.entryValue,
        source: this.source_Id,
        target: this.target_Id,
        label: "Process" + (this.entryProcessId + 1)
      });
      this.Network_Graph.Edges.push({
        id: this.entryValue,
        source: this.source_Id,
        target: this.target_Id,
        label: "Process" + (this.entryProcessId + 1)
      });
      this.entryProcessId = this.entryProcessId + 1;
      this.entryValue = this.networkService.nextChar(this.entryValue);
      let keys = ["entryProcessId", "entryValue", "Edges", "NetworkEdges"];
      this.networkService.removeSessionStorage(keys);
      let values = [this.entryProcessId, this.entryValue, this.Edges, this.Network_Graph];
      this.networkService.setSessionStorage(keys, values);
    }
  }

  deleteNodeOptionss() {
    this.node_Id = this.Nodes[
      this.Nodes.findIndex(x => x.label == this.deleteNodeName)
    ].id;
    this.removeByAttr(this.Nodes, "label", this.deleteNodeName);
    this.removeByAttr(this.Edges, "source", this.node_Id);
    this.removeByAttr(this.Edges, "target", this.node_Id);
    this.removeByAttr(this.Network_Graph.Nodes, "label", this.deleteNodeName);
    this.removeByAttr(this.Network_Graph.Edges, "source", this.node_Id);
    this.removeByAttr(this.Network_Graph.Edges, "target", this.node_Id);
    for (var i = 0; i < this.originNodeOptions.length; i++) {
      if (this.originNodeOptions[i] == this.deleteNodeName) {
        this.originNodeOptions.splice(i, 1);
        this.targetNodeOptions.splice(i, 1);
        this.deleteNodeOptions.splice(i, 1);
        i--;
      }
    }
    let keys = [
      "Nodes",
      "Edges",
      "originNodeOptions",
      "targetNodeOptions",
      "deleteNodeOptions",
      "NetworkEdges",
      "NetworkNodes"
    ];
    this.networkService.removeSessionStorage(keys);
    let values = [
      this.Nodes,
      this.Edges,
      this.originNodeOptions,
      this.targetNodeOptions,
      this.deleteNodeOptions,
      this.Network_Graph,
      this.Network_Graph
    ];
    this.networkService.setSessionStorage(keys, values);
  }

  getByValue(arr, value1) {
    this.count = 0;
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
      if (arr[i].label == value1) {
        this.count = this.count + 1;
      }
    }
    return this.count;
  }

  removeByAttr = function(arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 && arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  removeByValue(arr, value1, value2) {
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
      if (arr[i].source == value1 && arr[i].target == value2) {
        this.removeByAttr(this.Nodes, "target", this.deleteNodeName);
      }
    }
    return arr;
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleEnableZoom(enableZoom: boolean) {
    this.enableZoom = enableZoom;
  }

  toggleFitContainer(
    fitContainer: boolean,
    autoZoom: boolean,
    autoCenter: boolean
  ): void {
    this.fitContainer = fitContainer;
    this.autoZoom = autoZoom;
    this.autoCenter = autoCenter;

    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSchemes.find(s => s.name === name);
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === "Bundle") {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === "Cardinal") {
      this.curve = shape.curveCardinal;
    }
    if (curveType === "Catmull Rom") {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === "Linear") {
      this.curve = shape.curveLinear;
    }
    if (curveType === "Monotone X") {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === "Monotone Y") {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === "Natural") {
      this.curve = shape.curveNatural;
    }
    if (curveType === "Step") {
      this.curve = shape.curveStep;
    }
    if (curveType === "Step After") {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === "Step Before") {
      this.curve = shape.curveStepBefore;
    }
  }

  onLegendLabelClick(entry) {
    console.log("Legend clicked", entry);
  }

  toggleExpand(node) {
    console.log("toggle expand", node);
  }

  select(data) {
    console.log("Item clicked", data);
  }

  OnSaveDetails() {
    this.dappBoxNetwork["networkGraph"] = this.Network_Graph;
    this.dappBoxNetwork["entryNodeId"] = this.entryNodeId;
    this.dappBoxNetwork["entryProcessId"] = this.entryProcessId;
    this.dappBoxNetwork["entryValue"] = this.entryValue;
    // this.networkService.dAppBoxDetails(this.dappBoxNetwork).subscribe(a => {
    //   if (a == null) {
    //     console.log("error in dappboxdetails");
    //   } else {
    //     console.log("dappboxNetwork saved");
    //   }
    // });
    swal({
      type: "success",
      title: "dAppBox Network Saved !",
      showConfirmButton: false,
      timer: 1500
    });
  }

}
