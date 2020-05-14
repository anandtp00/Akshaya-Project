import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { StatementComponent } from './statement/statement.component';
import { LayoutRoutingModule } from './layout-component-routing.module';




@NgModule({
  declarations: [DashboardComponent,
    IncomeComponent,
    ExpenseComponent,
    StatementComponent],
  imports: [
    CommonModule, BrowserModule,
    LayoutRoutingModule,
  ]
})
export class LayoutComponentModule { }
