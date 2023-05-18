import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  id!:any ;
  isLoggedIn = true;
  category!:any;
  playerList!:any;

  constructor(private playerService:PlayerService,private categoryService:CategoryService,private activatedroute:ActivatedRoute,private config: NgSelectConfig,
    private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
  
    if(!this.isLoggedIn) this.router.navigate(['/login'])
    this.id=this.activatedroute.snapshot.params['id'];
    if(this.id!=null){
      this.categoryService.getCategoryById(this.id).subscribe(data=>{
        this.category = data;
        this.playerService.getPlayers(this.id).subscribe(data=>{
          this.playerList=data
        })
        //this.team.country=countries.find(c=>c.name===data.country)
      });
    }
  }


}
