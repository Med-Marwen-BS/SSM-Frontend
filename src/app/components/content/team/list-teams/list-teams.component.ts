import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.css']
})
export class ListTeamsComponent implements OnInit{

  collectionSize:any = 0
  page:any = 1
  pageSize:any = 5
  teams!: any[];
  isLoggedIn = true;
  user:any
  team:any
  adminTeam=false

  constructor(private teamService : TeamService ,private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(!this.isLoggedIn) this.router.navigate(['/login'])

    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;
      this.team = data.data.team
      this.adminTeam = this.team.creatorId == this.user.id
      if(this.user.role!='SUPER_ADMIN'&&this.user.role!='ADMIN'){
      
        this.router.navigate(['/login'])
      }
    });

    this.teamService.getTeams().subscribe(teamsList=>{
      console.log(teamsList);
      
      this.teams = teamsList ;
      this.collectionSize = this.teams.length
    })
  }


  refreshCountries() {
	
	}

  deleteUser(user:any){
    let msg1="Confirm delete team!"
    let msg2="delete "

    Swal.fire({
      title: msg1,
      text: msg2,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      // if (result.isConfirmed) {
      //   this.authService.deleteUserFromTeam(user.id).subscribe(data=>{
      //     this.ngOnInit()
      //     Swal.fire({
      //       position: 'top-end',
      //       icon: 'success',
      //       title: 'User '+user.username+' deleted',
      //       showConfirmButton: false,
      //       timer: 1500
      //     })
    
      //   },()=>{
      //     Swal.fire({
      //       position: 'top-end',
      //       icon: 'error',
      //       title: 'Try Again',
      //       showConfirmButton: false,
      //       timer: 1500
      //     })
    
      //   })
        
      // }
    })
  }

}

