import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlayerStatService } from 'src/app/services/player-stat.service';
import { PlayerService } from 'src/app/services/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  

  isLoggedIn = true;
  username!:any
  user:any
  categories:any

  constructor(private playerStatService:PlayerStatService,private playerService:PlayerService,private categoryService:CategoryService,private authService:AuthService,private router:Router,private activatedroute:ActivatedRoute){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(!this.isLoggedIn) this.router.navigate(['/login'])
    //if(this.isLoggedIn) this.router.navigate(['/listTeam'])
    this.username=this.activatedroute.snapshot.params['username'];
    this.authService.getUserByUsername(this.username).subscribe(data=>{
      this.user=data.data
      this.categoryService.getCategories(this.user.team.id).subscribe(data=>{
        this.categories = data
      })
      
    })
   
  }

  onSubmit(){
    if(this.user.adminCategory ){
      if(this.user.categoryId == null){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'You must choose a category',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        this.authService.changeCategoryRole(this.user.id,this.user.adminCategory,this.user.categoryId).subscribe(data=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User updated category role',
            showConfirmButton: false,
            timer: 1500
          })
        },()=>{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'try again',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    }else{
      this.authService.changeCategoryRole(this.user.id,this.user.adminCategory,this.user.categoryId).subscribe(data=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User updated category role',
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
