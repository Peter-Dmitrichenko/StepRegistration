import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { BaseAPIUrlService } from './baseAPIUrlService';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  constructor(private _http: HttpClient, private _baseUrl: BaseAPIUrlService) {
  }

  getCountries(): Observable<Country[]> {
    return this._http.get<Country[]>(`${this._baseUrl.baseAPIUrl}api/Lookup/GetCountriesWithProvinces`);
  }
}
