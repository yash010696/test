import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http: HttpClient
  ) {
  }


  getTransactionData() {
    return this.http.get(environment.baseUrl + '/v1/user/list');
  }
}
