import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/operators';

import { environment } from '../../environments/environment';
import {  Income } from './income.model';


@Injectable()
export class IncomeService {

  selectedIncome: Income={
    _id: "",
      service: "",
      bankcharge: 0,
      servicecharge: 0,
      bankservicecharge: 0,
  }

  income: Income[];

  // readonly baseURL = 'http://localhost:4000/income';

  constructor(private http: HttpClient) { }

  postIncome(inc : Income){
    return this.http.post(environment.incomebaseURL+'/add', inc);

  }


}
