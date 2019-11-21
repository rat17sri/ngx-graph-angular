import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NetworkService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  dAppBoxDetails(param: object): Observable<any> {
    console.log("dAppBoxNetwork Called");
    let headers1 = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    var body1 = `objtosave=${JSON.stringify(param)}`;

    var url2 = `${this.baseUrl}dAppBoxDetails`;

    return this.http.post(url2, body1, { headers: headers1 }).pipe(
      map((result: any) => {
        return result;
      }),
      catchError(err => {
        return err.json();
      })
    );
  }

  dappDetails(param: object): Observable<any> {
    console.log("dappDetails Called");
    let headers1 = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    var body1 = `objtosave=${JSON.stringify(param)}`;

    var url2 = `${this.baseUrl}dappDetails`;

    return this.http.post(url2, body1, { headers: headers1 }).pipe(
      map((result: any) => {
        return result;
      }),
      catchError(err => {
        return err.json();
      })
    );
  }

  UpdatedappDetails(param: object): Observable<any> {
    console.log("UpdatedappDetails Called");
    let headers1 = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    var body1 = `objtosave=${JSON.stringify(param)}`;

    var url2 = `${this.baseUrl}UpdatedappDetails`;

    return this.http.post(url2, body1, { headers: headers1 }).pipe(
      map((result: any) => {
        return result;
      }),
      catchError(err => {
        return err.json();
      })
    );
  }

  getdappDetails(id: any): Observable<any> {
    let headers1 = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    var body = `id=${id}`;
    var url = `${this.baseUrl}getdappDetails`;

    return this.http.post(url, body, { headers: headers1 }).pipe(
      map((result: any) => {
        console.log("result from getdappdetails: ", result);
        return result;
      }),
      catchError(err => {
        return err.json();
      })
    );
  }

  edgeDetails(param: object): Observable<any> {
    console.log("edgeDetails Called");
    let headers1 = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    var body1 = `objtosave=${JSON.stringify(param)}`;

    var url2 = `${this.baseUrl}edgeDetails`;

    return this.http.post(url2, body1, { headers: headers1 }).pipe(
      map((result: any) => {
        return result;
      }),
      catchError(err => {
        return err.json();
      })
    );
  }

  UpdateEdgeDetails(param: object): Observable<any> {
    console.log("UpdateEdgeDetails Called");
    let headers1 = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    var body1 = `objtosave=${JSON.stringify(param)}`;

    var url2 = `${this.baseUrl}UpdateEdgeDetails`;

    return this.http.post(url2, body1, { headers: headers1 }).pipe(
      map((result: any) => {
        return result;
      }),
      catchError(err => {
        return err.json();
      })
    );
  }

  getEdgeDetails(id: any): Observable<any> {
    let headers1 = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });

    var body = `id=${id}`;
    var url = `${this.baseUrl}getEdgeDetails`;

    return this.http.post(url, body, { headers: headers1 }).pipe(
      map((result: any) => {
        console.log("result from getEdgedetails: ", result);
        return result;
      }),
      catchError(err => {
        return err.json();
      })
    );
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
