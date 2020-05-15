import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { IncomeComponent } from './layout-component/income/income.component';
import { DashboardComponent } from './layout-component/dashboard/dashboard.component';
import { ExpenseComponent } from './layout-component/expense/expense.component';
import { StatementComponent } from './layout-component/statement/statement.component';



const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponentComponent,
    children:[
      { path: 'income', component: IncomeComponent},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'expense', component: ExpenseComponent},
      { path: 'statement', component: StatementComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
