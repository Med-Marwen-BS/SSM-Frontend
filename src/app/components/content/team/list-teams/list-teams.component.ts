import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';

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

  constructor(private teamService : TeamService ,private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(!this.isLoggedIn) this.router.navigate(['/login'])

    this.teamService.getTeams().subscribe(teamsList=>{
      console.log(teamsList);
      
      this.teams = teamsList ;
      this.collectionSize = this.teams.length
    })
  }


  refreshCountries() {
	
	}

}

