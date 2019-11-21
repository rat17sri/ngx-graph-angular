import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { NodeData, LinkData, DataService } from '../services/data.service'

@Injectable({
  providedIn: "root"
})
export class NetworkService {

  constructor(private dataService: DataService) {}

  nodeData : NodeData[];
  linkData: LinkData[];

  nodeDetails() {
    this.nodeData = this.dataService.getNodeData();
  }

  linkDetails() {
    this.linkData = this.dataService.getLinkData();
  }

  //Start of Generating Ids

  nextChar(c) {
    var u = c.toUpperCase();
    if (this.same(u, "Z")) {
      var txt = "";
      var i = u.length;
      while (i--) {
        txt += "A";
      }
      return txt + "A";
    } else {
      var p = "";
      var q = "";
      if (u.length > 1) {
        p = u.substring(0, u.length - 1);
        q = String.fromCharCode(p.slice(-1).charCodeAt(0));
      }
      var l = u.slice(-1).charCodeAt(0);
      var z = this.nextLetter(l);
      if (z === "A") {
        return p.slice(0, -1) + this.nextLetter(q.slice(-1).charCodeAt(0)) + z;
      } else {
        return p + z;
      }
    }
  }

  nextLetter(l) {
    if (l < 90) {
      return String.fromCharCode(l + 1);
    } else {
      return "A";
    }
  }

  same(str, char) {
    var i = str.length;
    while (i--) {
      if (str[i] !== char) {
        return false;
      }
    }
    return true;
  }

  //End of Generating Ids

  getSessionStorage(keysToGet) {
    let values = [];
    keysToGet.forEach(key =>
      values.push(JSON.parse(sessionStorage.getItem(key)))
    );
    return values;
  }

  setSessionStorage(keys, values) {
    keys.forEach((key, index) =>
      sessionStorage.setItem(key, JSON.stringify(values[index]))
    );
  }

  removeSessionStorage(keysToRemove) {
    keysToRemove.forEach(key => sessionStorage.removeItem(key));
  }
}
