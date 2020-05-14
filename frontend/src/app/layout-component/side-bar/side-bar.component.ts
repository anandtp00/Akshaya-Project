import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin', title: 'Dashboard',  icon: 'pe-7s-graph', class: 'space' },
    { path: '/user', title: 'Income',  icon:'pe-7s-note2', class: 'space' },
    { path: '/table', title: 'Expense',  icon:'pe-7s-note2', class: 'space' },
    { path: '/typography', title: 'Statement',  icon:'pe-7s-news-paper', class: 'space' },
    // { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' }
];

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit(){
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
};

}
