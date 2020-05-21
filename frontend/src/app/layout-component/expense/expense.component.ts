import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


import { ExpenseService } from '../../shared/expense.service';
import { Expense } from '../../shared/expense.model';
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
    if (form.value._id == "") {
      this.expenseservice.postExpense(form.value).subscribe((response) => {
        this.resetForm(form);
        this.todaysExpense();
      });
    } else {
      this.expenseservice.putExpense(form.value).subscribe((response) => {
        this.resetForm(form);
        this.todaysExpense();
      });
    }
  }

  todaysExpense() {
    this.expenseservice.getTodaysExpense().subscribe((response) => {
      this.expenseservice.expenses = response as Expense[];
      let date_ob = new Date(response[0].date);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      const today = date + "-" + month + "-" + year;
      this.expenseservice.today = today;

      let sum1 = 0;
      this.expenseservice.expenses.forEach((element => {
        sum1 = sum1 + element.amount;
      }));
      this.expenseservice.texp = sum1;
    });
  }

  onDelete(_id: String, form: NgForm) {
    this.expenseservice.deleteExpense(_id).subscribe((response) => {
      this.resetForm(form);
      this.todaysExpense();
      this.router.navigate['/'];
    })

  }

  onEdit(exp: Expense) {
    this.expenseservice.selectedExpense = exp;
  }


}
