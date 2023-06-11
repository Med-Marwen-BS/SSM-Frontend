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
  notifications:any
  notSize=0

  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.authService.getUserByToken().subscribe(data=>{
      this.user=data.data
      this.team=data.data.team
      this.adminCategory=this.user.adminCategory
      this.authService.getNotifications(this.user.id).subscribe(data=>{
        this.notifications = data.reverse()
        this.notSize = this.notifications.filter((n:any)=>n.status!="READ").length
      })
      
    })
  }


  logout(){
    this.authService.logout();
    window.location.reload()
    //this.router.navigate(['/']).then(()=> window.location.reload())
  }

  read(id:any){
    debugger
    this.authService.readNotifications(id).subscribe((data)=>{
    },()=>{},()=>{ 
    });
    window.location.reload()
  }

}
