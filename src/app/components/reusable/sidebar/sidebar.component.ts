import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  user:any
  adminCategory:boolean=false
  team:any
  admin=false
  adminTeam =false

  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.getUserByToken().subscribe(data=>{
      this.user=data.data
      this.team=data.data.team
      this.adminCategory=this.user.adminCategory
      this.admin = this.user.role=='SUPER_ADMIN' || this.user.role=='ADMIN'
      this.adminTeam = this.team.creatorId == this.user.id
      
    })
  }



}
