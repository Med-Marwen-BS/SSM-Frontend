import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit{

  user:any
  adminCategory:boolean=false
  team:any

  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.authService.getUserByToken().subscribe(data=>{
      this.user=data.data
      this.team=data.data.team
      this.adminCategory=this.user.adminCategory
      
    })
  }


  logout(){
    this.authService.logout();
    window.location.reload()
    //this.router.navigate(['/']).then(()=> window.location.reload())
  }

}
