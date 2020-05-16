import { Component, OnInit } from '@angular/core';

import { IncomeService } from '../../shared/income.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  providers: [IncomeService]
})
export class IncomeComponent implements OnInit {



  constructor(public incomeservice: IncomeService) { }





  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.incomeservice.selectedIncome = {
      _id: "",
      company: "Akshaya Paral",
      service: "",
      bankcharge: 0,
      servicecharge: 0,
      bankservicecharge: 0,
    }
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    this.incomeservice.postIncome(form.value).subscribe((response) => {
      this.resetForm(form);
    });
  }

}
