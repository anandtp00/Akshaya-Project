import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/operators';

import {  Income } from './income.model';


@Injectable()
export class IncomeService {

  selectedIncome: Income;

  income: Income[];

  readonly baseURL = 'http://localhost:4000/income';

  constructor(private http: HttpClient) { }

  postIncome(inc : Income){
    return this.http.post(this.baseURL+'/add', inc);

  }


}
