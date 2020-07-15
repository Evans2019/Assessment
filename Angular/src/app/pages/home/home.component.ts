import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('home-page');
  }

  ngOnDestroy() {
    // tslint:disable-next-line: prefer-const
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('home-page');
  }
}
