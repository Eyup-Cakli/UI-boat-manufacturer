import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoatType } from '../models/boat-type';

@Injectable({
  providedIn: 'root'
})
export class BoatTypeService {
constructor(private httpClient: HttpClient) {}

  getApiUrl:string =`http://localhost:3000`;

  getTypeList(): Observable<BoatType[]> {
    return this.httpClient.get<BoatType[]>(
      this.getApiUrl + "/type"
    );
  }

  getBoatTypeById(_id: number) {
    return this.httpClient.get<BoatType>(
      this.getApiUrl + "/type/" + _id
    )
  }

  addType(element: BoatType): Observable<any> {
    return this.httpClient.post(this.getApiUrl + "/type", element, { responseType: 'text' });
  }

  updateBoatType(boatType: BoatType): Observable<any> {
    const updatedData = {
      typeName: boatType.typeName
    };

    return this.httpClient.put(this.getApiUrl + "/type/" + boatType._id, updatedData,  { responseType: 'text' });
  }

  deleteType(_id: number) {
    return this.httpClient.request("delete", this.getApiUrl + "/type/"+ _id);
  }
}
