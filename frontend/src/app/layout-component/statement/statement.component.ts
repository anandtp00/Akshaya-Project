import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { StatementService } from '../../shared/statement.service';
import { Statement } from '../../shared/statement.model';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';


@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css'],
  providers: [StatementService]
})
export class StatementComponent implements OnInit {

  constructor(public statementservice: StatementService, private router: Router) { }

  ngOnInit(): void {
    this.todaysStatement();
  }

  todaysStatement() {
    this.statementservice.getTodaysStatement().subscribe((response) => {
      this.statementservice.statements = response as Statement[];
      let date_ob = new Date(response[0].date);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      const today = date + "-" + month + "-" + year;
      this.statementservice.today=today

      let sum1=0;
      let sum2=0;


      this.statementservice.statements.forEach((i)=>{
        let inc = i.income;
        if(inc === undefined){
          inc = 0;
        }
        sum1=sum1+inc;
      })

      this.statementservice.tIncome=sum1;

      this.statementservice.statements.forEach((i)=>{
        let exp = i.expense;
        if(exp === undefined){
          exp = 0;
        }
        sum2=sum2+exp;
      })

      this.statementservice.tExpense=sum2;
     
    });
  }

}
