import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BoatManufacturer } from "../models/boat-manufacturer";


@Injectable({
  providedIn: "root" ,
})
export class BoatManufacturerService {
constructor(private httpClient:HttpClient) {}

  getApiUrl:string = `http://localhost:3000`;

  getManufacturerList(): Observable<BoatManufacturer[]> {
    return this.httpClient.get<BoatManufacturer[]>(
      this.getApiUrl + "/manufacturer"
    );
  }

  getManufacturerDetailList(): Observable<BoatManufacturer[]> {
    return this.httpClient.get<BoatManufacturer[]>(
      this. getApiUrl + "/manufacturerdetails"
    );
  }

  addManufacturer(boatManufacturer: BoatManufacturer): Observable<any> {
    const data = {
      manufacturerName: boatManufacturer.manufacturerName,
      manufacturerWebSite: boatManufacturer.manufacturerWebsite,
      image: boatManufacturer.fileName
    }
    return this.httpClient.post(this.getApiUrl + "/manufacturer", data, { responseType: 'text' });
  }
}
