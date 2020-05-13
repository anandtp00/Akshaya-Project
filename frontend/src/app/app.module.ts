import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponentComponent } from './body-component/body-component.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponentComponent,
    AdminComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
