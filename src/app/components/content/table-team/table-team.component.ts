import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-table-team',
  templateUrl: './table-team.component.html',
  styleUrls: ['./table-team.component.css']
})
export class TableTeamComponent implements OnInit {
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
