import { Component, OnInit } from '@angular/core';
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
  constructor(private teamService : TeamService ){}
  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teamsList=>{
      console.log(teamsList);
      
      this.teams = teamsList ;
      this.collectionSize = this.teams.length
    })
  }


  refreshCountries() {
	
	}

}

