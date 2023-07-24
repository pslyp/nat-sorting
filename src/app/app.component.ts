import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `  
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div class="container">
        <a class="navbar-brand" href="#">NAT Sorting</a>
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" routerLink="/home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" routerLink="/total">Total</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" routerLink="/receive">Receive</a>
          </li>   
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" routerLink="/to-assembly">To Assembly</a>
          </li>       
          <li class="nav-item">
            <a class="nav-link" routerLinkActive="active" routerLink="/sorting">Sorting</a>
          </li>
        </ul>
      </div>
    </nav>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent { }