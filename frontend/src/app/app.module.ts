import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';

import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { SideBarComponent } from './layout-component/side-bar/side-bar.component';
import { NavBarComponent } from './layout-component/nav-bar/nav-bar.component';
import { ExpenseComponent } from './layout-component/expense/expense.component';
import { DashboardComponent } from './layout-component/dashboard/dashboard.component';
import { IncomeComponent } from './layout-component/income/income.component';
import { StatementComponent } from './layout-component/statement/statement.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [
    AppComponent,
    AdminComponentComponent,
    LayoutComponentComponent,
    SideBarComponent,
    NavBarComponent,
    StatementComponent,
    IncomeComponent,
    DashboardComponent,
    ExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
