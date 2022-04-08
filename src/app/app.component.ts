/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Danish Sharma Student ID: 148201205 Date: April 8, 2022
*
* Netlify Url: https://stalwart-cactus-dbec6b.netlify.app/
*
* User API: https://sheltered-cliffs-63870.herokuapp.com/
********************************************************************************/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import User from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchString : string = "";
  token : any = {};

  handleSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } }); 
    this.searchString = "";
  }

  constructor(private router : Router, private auth: AuthService) {};

  ngOnInit(): void {
    this.searchString = "";
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken(); 
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
