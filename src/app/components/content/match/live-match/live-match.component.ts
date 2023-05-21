import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatchService } from 'src/app/services/match.service';

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

  constructor(private matchService:MatchService,private activatedroute:ActivatedRoute,private categoryService: CategoryService, private authService: AuthService, private router: Router) { }
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


}
