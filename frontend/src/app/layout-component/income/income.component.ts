import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { IncomeService } from '../../shared/income.service';
import { Income } from '../../shared/income.model';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';



// let ts = Date.now();
// let date_ob = new Date(ts);
// let date = date_ob.getDate();
// let month = date_ob.getMonth() + 1;
// let year = date_ob.getFullYear();
// const today = date + "-" + month + "-" + year;

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  providers: [IncomeService]
})
export class IncomeComponent implements OnInit {

  constructor(public incomeservice: IncomeService, private router: Router) { }




  ngOnInit(): void {
    this.todaysIncome();

  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.incomeservice.selectedIncome = {
      _id: "",
      service: "",
      bankcharge: 0,
      servicecharge: 0,
      bankservicecharge: 0,
    };
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.incomeservice.postIncome(form.value).subscribe((response) => {
      this.resetForm(form);
      this.todaysIncome();
    });
  }

  todaysIncome() {
    this.incomeservice.getTodaysIncome().subscribe((response) => {
      this.incomeservice.incomes = response as Income[];
      let date_ob = new Date(response[0].date);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      const today = date + "-" + month + "-" + year;
      this.incomeservice.today=today

      let sum1=0;
      let sum2=0;
      let sum3=0;
      this.incomeservice.incomes.forEach((element=>{
       sum1=sum1+element.bankcharge;
       sum2=sum2+element.servicecharge;
       sum3=sum3+element.bankservicecharge;
      }));
      this.incomeservice.tbc=sum1;
      this.incomeservice.tsc=sum2;
      this.incomeservice.tbsc=sum3;

      let sum4=0;
      this.incomeservice.incomes.forEach((element)=>{
        sum4=sum4+element.bankcharge+element.servicecharge+element.bankservicecharge;
      });
      this.incomeservice.tinc=sum4;
    });
  }
  

  onDelete(_id: String, form: NgForm){
    if(confirm("Are you sure to delete this record?")==true){
      this.incomeservice.deleteIncome(_id).subscribe((response)=>{
        this.todaysIncome();
        this.resetForm(form);
      })
    }
  }

}
