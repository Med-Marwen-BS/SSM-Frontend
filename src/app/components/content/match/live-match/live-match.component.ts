import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatchService } from 'src/app/services/match.service';
import { PlayerStatService } from 'src/app/services/player-stat.service';
import Swal from 'sweetalert2';

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
  isCreator=false
  buttonDisplay=false

  constructor(private playerStatService:PlayerStatService,private matchService:MatchService,private activatedroute:ActivatedRoute,private categoryService: CategoryService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    //this.isLoggedIn = this.authService.isLogged();
    if (!this.isLoggedIn) this.router.navigate(['/login'])

    let matchId=this.activatedroute.snapshot.params['id'];
    if(matchId != null){
      this.matchService.getMatchById(matchId).subscribe(data1=>{
        this.match=data1
        this.team=data1.team
        this.playerStatService.getMatchById(matchId).subscribe(data2=>{
          this.playerStat=data2
          this.authService.getUserByToken().subscribe(data3 => {
            this.user = data3.data;
            this.buttonDisplay= data3.data.id == this.match.creator && this.match.status == "Live"
            this.isCreator= data3.data.id == this.match.creator
      
          });
        }
          
          
          )
      })
    }
    

  }

  incrementScore(code:any){

    if(code=='+'){
      this.match.opponentScore +=1
    }
    if(code=='-' && this.match.opponentScore !=0){
      this.match.opponentScore -=1
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
    this.match.myScore +=1
  }
  decrementGoals(playerId:any){
    let p = this.playerStat.find((p:any)=>playerId==p.player.id)
    if(p.goals!=0){
      p.goals = p.goals-1
      this.match.myScore -=1
    }
      
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

    this.matchService.updateScore(this.match).subscribe((data:any)=>{
      this.playerStatService.updateMatch(this.playerStat).subscribe(data=>{
        if(data){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'stats updated',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },(err:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Try Again',
          showConfirmButton: false,
          timer: 1500
        })
      })
    },(err:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Try Again',
        showConfirmButton: false,
        timer: 1500
      })
    })


    
  }
  confirmStartMatch(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to start the match!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, start match!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.startMatch();
      }
    })
  }

  confirmFineshMatch(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to finish the match!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, finish match!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.finishMatch();
      }
    })
  }

  startMatch(){
    this.matchService.updateToLive(this.match.id).subscribe(data=>{
      this.ngOnInit()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Match started',
        showConfirmButton: false,
        timer: 1500
      })
    },(err:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Try Again',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }
  finishMatch(){
    this.matchService.updateToFinished(this.match.id).subscribe(data=>{
      this.ngOnInit()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Match finished and saved',
        showConfirmButton: false,
        timer: 1500
      })
    },(err:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Try Again',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  status():any{
    if(this.match.status=='NotStarted'){
      return this.match.data+' '+this.match.time
    }
    else if(this.match.status=='Finished'){
      return 'Finished'
    }else{
      return 'Live'
    }
  }




}
