import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseAPIUrlService } from './baseAPIUrlService';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient, private _baseUrl: BaseAPIUrlService) {
  }

  saveUser(user: User): Observable<any> {
    return this._http.post<User>(`${this._baseUrl.baseAPIUrl}api/User/Register`, user);
  }
}
