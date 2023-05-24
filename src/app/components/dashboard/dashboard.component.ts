import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlayerStatService } from 'src/app/services/player-stat.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  id!:any ;
  isLoggedIn = true;
  category!:any;
  playerList!:any;
  calledPlayerList:any=[];
  user:any
  team:any

  constructor(private playerService:PlayerStatService,private categoryService:CategoryService,private activatedroute:ActivatedRoute,private config: NgSelectConfig,
    private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
  
    if(!this.isLoggedIn) this.router.navigate(['/login'])
    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;
      this.team = data.data.team
      this.playerService.getStats(this.team.id).subscribe(data=>{
        this.playerList=data
      })
  
    
    });

  }

  toMatch(){
    // this.categoryService.calledList = this.calledPlayerList;
    this.router.navigate(['newMatch',this.category.id])
  }
  toPlayer(player:any){
    debugger

    this.router.navigate(['addPlayer',player.goals.player.category.id,player.goals.id]) ;
  }

}
