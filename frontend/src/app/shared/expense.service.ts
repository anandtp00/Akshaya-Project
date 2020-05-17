import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/operators';

import { environment } from '../../environments/environment';
import {  Expense } from './expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  selectedExpense: Expense={
    _id: "",
    amount: 0,
    expensereason: "",
  }

  expenses: Expense[];

  constructor(private http: HttpClient) { }

  postExpense(exp : Expense){
    return this.http.post(environment.expensebaseURL+'/add', exp);
  }

  getTodaysExpense(){
    return this.http.get(environment.expensebaseURL+'/gettodaysexpense')
  }

 
}
