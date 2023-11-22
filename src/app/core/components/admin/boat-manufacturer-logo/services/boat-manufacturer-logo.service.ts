import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {BoatManufacturerLogo} from "../models/boat-manufacturer-logo"

@Injectable({
  providedIn: 'root'
})
export class BoatManufacturerLogoService {

  constructor(private httpClient: HttpClient) { }

  getApiUrl: string = `http://localhost:3000`;

  getManufacturerLogoList(): Observable<BoatManufacturerLogo[]>{
    return this.httpClient.get<BoatManufacturerLogo[]>(
      this.getApiUrl + "/logo"
    );
  }

  addManufacturerLogo(element: any) {
    return this.httpClient.post(this.getApiUrl + "/logo", element, { responseType: 'text' }) 
  }
}
