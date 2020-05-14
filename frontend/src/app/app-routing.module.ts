import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponentComponent } from './layout-component/layout-component.component';



const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
