import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseAPIUrlService {
  public readonly baseAPIUrl: string ;
  constructor(){
    this.baseAPIUrl = "http://localhost:5199/";
  }
}
