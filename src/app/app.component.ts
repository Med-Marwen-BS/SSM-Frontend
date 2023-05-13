import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = true;


  constructor(private authService:AuthService,private route:Router){
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    console.log(this.isLoggedIn);
    if(!this.isLoggedIn) this.route.navigate(['/login'])
    //localStorage.setItem("token","eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJ3ZW5icyIsImlhdCI6MTY4MzU4MjAwMCwiZXhwIjoxNjgzNzI2MDAwfQ.abBXO2xPbpH4Pyy6xUEyfBHtlSYDb6JhkrvJQoZcBW0")    
  }
  title = 'SSM';
  
}
