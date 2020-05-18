import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/operators';

import { environment } from '../../environments/environment';
import {  Statement } from './statement.model';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private http: HttpClient) { }

  
  statements: Statement[];

  today : string;

  tIncome : Number;
  tExpense : Number;

  getTodaysStatement(){
    return this.http.get(environment.statementbaseURL+'/todaysstatement')
  }
}
