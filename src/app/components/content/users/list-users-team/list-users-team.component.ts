import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users-team',
  templateUrl: './list-users-team.component.html',
  styleUrls: ['./list-users-team.component.css']
})
export class ListUsersTeamComponent implements OnInit{

  collectionSize:any = 0
  page:any = 1
  pageSize:any = 5
  users!: any[];
  isLoggedIn = true;
  team:any
  user:any

  constructor(private teamService : TeamService ,private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(!this.isLoggedIn) this.router.navigate(['/login'])

    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;
      this.team = data.data.team
      this.authService.getUsersByTeamId(this.team.id).subscribe(userList=>{
        console.log(userList);
        
        this.users = userList.data ;
        this.collectionSize = this.users.length
      })
    });


  }


  deleteUser(user:any){
    let msg1="Confirm delete from team!"
    let msg2="delete : "+user.username

    Swal.fire({
      title: msg1,
      text: msg2,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUserFromTeam(user.id).subscribe(data=>{
          this.ngOnInit()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User '+user.username+' deleted',
            showConfirmButton: false,
            timer: 1500
          })
    
        },()=>{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Try Again',
            showConfirmButton: false,
            timer: 1500
          })
    
        })
        
      }
    })
  }

  async addTeamToUser() {

    const { value: email } = await Swal.fire({
      title: 'Add User By Email',
      input: 'email',
      inputLabel: 'email address',
      inputPlaceholder: 'Enter your email address'
    })
    if (email) {

      this.authService.addTeamToUser(this.team.id, email).subscribe(data => {
        this.ngOnInit()
        Swal.fire({
          title: 'user added with success!',
          text: '',
          icon: 'success',
          confirmButtonText: 'ok'
        })
      }, (err) => {

        console.log(err);

        Swal.fire({
          title: 'check if the user exist or have a team!',
          text: '',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }, () => {

      })
    }

  }


}
