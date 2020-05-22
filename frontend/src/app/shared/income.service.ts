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

  incomes: Income[];

  today: String;

  tbc: Number;
  tsc: Number;
  tbsc: Number;
  tinc : Number;

  date : any;

  // readonly baseURL = 'http://localhost:4000/income';

  constructor(private http: HttpClient) { }

  postIncome(inc : Income){
    return this.http.post(environment.incomebaseURL+'/add', inc);

  }

  getTodaysIncome(){
    return this.http.get(environment.incomebaseURL+'/gettodaysincome')
  }

  deleteIncome(_id: String){
    return this.http.get(environment.incomebaseURL+'/deleteincome/'+_id)
  }

  putIncome(inc: Income){
    return this.http.put(environment.incomebaseURL+'/updateincome/'+inc._id,inc);
  }

  getDatedIncome(date: any){
    return this.http.get(environment.incomebaseURL+'/datedincome',date);
  }
 
}
