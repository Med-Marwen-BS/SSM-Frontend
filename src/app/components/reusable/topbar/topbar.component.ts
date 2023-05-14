import { Component, ElementRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {


  constructor(private authService:AuthService,private router:Router){}
  logout(){
    this.authService.logout();
    window.location.reload()
    //this.router.navigate(['/']).then(()=> window.location.reload())
  }

}
