import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{

  collectionSize:any = 0
  page:any = 1
  pageSize:any = 5
  users!: any[];
  isLoggedIn = true;

  constructor(private teamService : TeamService ,private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(!this.isLoggedIn) this.router.navigate(['/login'])

    this.authService.getAllUsers().subscribe(userList=>{
      console.log(userList);
      
      this.users = userList.data ;
      this.collectionSize = this.users.length
    })
  }


  newRole(user:any) {
    Swal.fire({
      title: 'Confirm changing role?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change role!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.changeRole(user.username,user.role).subscribe(data=>{
          Swal.fire(
            'Success!',
            '!',
            'success'
          )
        },()=>{
          if(user.role === "ADMIN")
          {
            user.role = "USER"
          }else{
            user.role = "ADMIN"
          }
          Swal.fire(
            'Error On role changing!',
            '!',
            'error'
          )
        })
      }else{
        if(user.role === "ADMIN")
        {
          user.role = "USER"
        }else{
          user.role = "ADMIN"
        }
        
      }
    })
	}

}
