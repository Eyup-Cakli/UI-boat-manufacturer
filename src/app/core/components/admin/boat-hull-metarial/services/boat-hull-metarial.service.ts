import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoatHullMetarial } from '../models/boat-hull-metarial';

@Injectable({
  providedIn: 'root'
})
export class BoatHullMetarialService {

  constructor(private httpClient: HttpClient) {}

  getApiUrl:string = `http://localhost:3000`;

  getBoatHullMetarialList(): Observable<BoatHullMetarial[]> {
    return this.httpClient.get<BoatHullMetarial[]>(
      this.getApiUrl + "/hullmetarial"
    )
  }

  getHullMetarialById(_id: number) {
    return this.httpClient.get<BoatHullMetarial>(
      this.getApiUrl + "/hullmetarial/" + _id
    )
  }

  addHullMetariall(element: BoatHullMetarial): Observable<any> {
    return this.httpClient.post(this.getApiUrl + "/hullmetarial", element, {responseType: 'text'});
  }

  updatBoatHullMetarial(boatModel: BoatHullMetarial): Observable<any> {
    const updatedData = {
      boatHullMetarialName: boatModel.boatHullMetarialName
    };

    return this.httpClient.put(this.getApiUrl + "/hullmetarial/" + boatModel._id, updatedData, {
      responseType: "text",
    });
  }

  deleteHullMetarial(_id: number) {
    return this.httpClient.request("delete", this.getApiUrl + "/hullmetarial/" + _id);
  }
}
