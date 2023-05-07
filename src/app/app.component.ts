import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    localStorage.setItem("token","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJ3ZW5icyIsImlhdCI6MTY4MzA0MDk4MSwiZXhwIjoxNjgzMTg0OTgxfQ.HLKX7rZ6Ge7KQBqkapFh_gaORxSwIpl_CQEhHv-H074")    
  }
  title = 'SSM';
  
}
