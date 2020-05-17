import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


import { ExpenseService } from '../../shared/expense.service';
import { Expense} from '../../shared/expense.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers: [ExpenseService]
})
export class ExpenseComponent implements OnInit {

  constructor(public expenseservice: ExpenseService, private router: Router) { }

  ngOnInit(): void {
    this.todaysExpense();
  }
  resetForm(form: NgForm) {
    form.resetForm();
    this.expenseservice.selectedExpense = {
      _id: "",
      expensereason: "",
      amount: 0
    };
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.expenseservice.postExpense(form.value).subscribe((response) => {
      this.resetForm(form);
    });
  }

  todaysExpense(){
    this.expenseservice.getTodaysExpense().subscribe((response)=>{
      this.expenseservice.expenses=response as Expense[];
    });
  }

}
