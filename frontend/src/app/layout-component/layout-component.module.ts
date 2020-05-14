import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { StatementComponent } from './statement/statement.component';



@NgModule({
  declarations: [DashboardComponent,
     IncomeComponent,
    ExpenseComponent,
    StatementComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutComponentModule { }
