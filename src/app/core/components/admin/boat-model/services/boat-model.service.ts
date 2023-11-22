import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { BoatModel } from '../models/boat-model';

@Injectable({
  providedIn: 'root'
})
export class BoatModelService {

  constructor(private httpClient:HttpClient) { }

  getApiUrl:string = `http://localhost:3000`;

  getModelList(): Observable<BoatModel[]> {
    return this.httpClient.get<BoatModel[]>(
      this.getApiUrl + "/model"
    )
  }

  getModelDetailList(): Observable<BoatModel[]> {
    return this.httpClient.get<BoatModel[]>(
      this.getApiUrl + "/modeldetails"
    )
  }

  getModelById(_id: number){
    return this.httpClient.get<BoatModel>(
      this.getApiUrl + "/model/" + _id
    )
  }

  addModel(element: BoatModel): Observable<any> {
    return this.httpClient.post(this.getApiUrl + "/model", element, { responseType: 'text' });
  }

  updateModel(boatModel: BoatModel): Observable<any> {
    const updatedData = {
      modelName: boatModel.modelName,
      manufacturerId: boatModel.manufacturerId,
      typeId: boatModel.typeId,
      lengthMeter: boatModel.lengthMeter,
      beamMeter: boatModel.beamMeter,
      draftMeter: boatModel.draftMeter,
      boatHullMetarialId: boatModel.boatHullMetarialId
    };

    return this.httpClient.put(this.getApiUrl + "/model/" + boatModel._id, updatedData, {
      responseType: "text",
    });
  }
}
