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
  title = 'SSM';

  constructor(private authService:AuthService,private router:Router){
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    console.log(this.isLoggedIn);
    const url:string=this.router.url;
    console.log(url);
    
  }
  
  
}
