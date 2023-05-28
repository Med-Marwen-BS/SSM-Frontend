import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlayerStatService } from 'src/app/services/player-stat.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  isLoggedIn = true;
  id!:any


  constructor(private playerStatService:PlayerStatService,private playerService:PlayerService,private categoryService:CategoryService,private authService:AuthService,private router:Router,private activatedroute:ActivatedRoute){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(!this.isLoggedIn) this.router.navigate(['/login'])
    //if(this.isLoggedIn) this.router.navigate(['/listTeam'])
    this.id=this.activatedroute.snapshot.params['id'];
   
  }
}
