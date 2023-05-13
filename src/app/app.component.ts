import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  ngOnInit(): void {
    localStorage.setItem("token","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJ3ZW5icyIsImlhdCI6MTY4MzU4MjAwMCwiZXhwIjoxNjgzNzI2MDAwfQ.abBXO2xPbpH4Pyy6xUEyfBHtlSYDb6JhkrvJQoZcBW0")    
  }
  title = 'SSM';
  
}
