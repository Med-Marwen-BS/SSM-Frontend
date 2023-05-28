import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlayerStatService } from 'src/app/services/player-stat.service';
import { PlayerService } from 'src/app/services/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  

  isLoggedIn = true;
  username!:any
  user:any
  categories:any

  constructor(private playerStatService:PlayerStatService,private playerService:PlayerService,private categoryService:CategoryService,private authService:AuthService,private router:Router,private activatedroute:ActivatedRoute){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(!this.isLoggedIn) this.router.navigate(['/login'])
    //if(this.isLoggedIn) this.router.navigate(['/listTeam'])
    this.authService.getUserByToken().subscribe(data=>{
      this.user=data.data
      this.user.password="";
      
    })
   
  }

  onSubmit(){
    if(this.user.password.length<6 ){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'password must have at least 6 characters',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.authService.update(this.user.id,{password:this.user.password}).subscribe(data=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'your passwored is changed',
          showConfirmButton: false,
          timer: 1500
        })
      },()=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Try again',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }
}
