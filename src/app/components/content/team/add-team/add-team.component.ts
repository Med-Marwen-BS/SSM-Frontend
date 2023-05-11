import { Component } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {

  constructor(private teamService:TeamService){}

  onSubmit(){
    console.log("test");
    this.teamService.addTeams({name:"marwen bs team",country:"tunisie"}).subscribe(data=>{
      console.log(data);
      
    })
  }

}
