import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatchService } from 'src/app/services/match.service';
import { PlayerStatService } from 'src/app/services/player-stat.service';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrls: ['./live-match.component.css']
})
export class LiveMatchComponent implements OnInit {

  isLoggedIn = true;
  user!:any
  match!:any
  team!:any
  playerStat!:any

  constructor(private playerStatService:PlayerStatService,private matchService:MatchService,private activatedroute:ActivatedRoute,private categoryService: CategoryService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    //this.isLoggedIn = this.authService.isLogged();
    if (!this.isLoggedIn) this.router.navigate(['/login'])
    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;

    });
    let matchId=this.activatedroute.snapshot.params['id'];
    if(matchId != null){
      this.matchService.getMatchById(matchId).subscribe(data=>{
        this.match=data
        this.team=data.team
        this.playerStatService.getMatchById(matchId).subscribe(data=>
          this.playerStat=data
          )
      })
    }
    

  }

  incrementScore(teamCode:any){
    if(teamCode=='A'){
      this.match.myScore +=1
    }
    if(teamCode=='B'){
      this.match.opponentScore +=1
    }
  }

  incrementShot(playerId:any){
    let p = this.playerStat.find((p:any)=>playerId==p.player.id)
    p.shots = p.shots+1
  }
  decrementShot(playerId:any){
    let p = this.playerStat.find((p:any)=>playerId==p.player.id)
    if(p.shots!=0)
      p.shots = p.shots-1
  }

  incrementGoals(playerId:any){
    let p = this.playerStat.find((p:any)=>playerId==p.player.id)
    p.goals = p.goals+1
  }
  decrementGoals(playerId:any){
    let p = this.playerStat.find((p:any)=>playerId==p.player.id)
    if(p.goals!=0)
      p.goals = p.goals-1
  }

  incrementSaves(playerId:any){
    let p = this.playerStat.find((p:any)=>playerId==p.player.id)
    p.saves = p.saves+1
  }
  decrementSaves(playerId:any){
    let p = this.playerStat.find((p:any)=>playerId==p.player.id)
    if(p.saves!=0)
      p.saves = p.saves-1
  }

  incrementMinutes(playerId:any){
    let p = this.playerStat.find((p:any)=>playerId==p.player.id)
    if(p.minutes!=60)
      p.minutes = p.minutes+1
  }
  decrementMinutes(playerId:any){
    let p = this.playerStat.find((p:any)=>playerId==p.player.id)
    if(p.minutes!=0)
      p.minutes = p.minutes-1
  }

  update(){
    //TODO : Update
    // this.playerStat.map((ps:any)=>{

    //   this.playerStatService.
    // })
  }


}
