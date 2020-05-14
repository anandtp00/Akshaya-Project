import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeComponent } from './income/income.component';
import { ExpenseComponent } from './expense/expense.component';
import { StatementComponent } from './statement/statement.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
    { path: 'income', component: IncomeComponent
    },
    { path: 'expense',component: ExpenseComponent
    },
    { path: 'statement',component: StatementComponent
    },
    { path: 'dashboard',component: DashboardComponent
 }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
