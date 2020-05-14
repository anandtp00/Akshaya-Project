import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';

import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { SideBarComponent } from './layout-component/side-bar/side-bar.component';
import { NavBarComponent } from './layout-component/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponentComponent,
    LayoutComponentComponent,
    SideBarComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
