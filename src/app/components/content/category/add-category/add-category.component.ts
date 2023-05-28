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
  calledPlayerList:any=[];
  user!:any
  team!:any
  adminTeam=false
  adminCategory=false

  constructor(private playerService:PlayerService,private categoryService:CategoryService,private activatedroute:ActivatedRoute,private config: NgSelectConfig,
    private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
  
    if(!this.isLoggedIn) this.router.navigate(['/login'])
    this.id=this.activatedroute.snapshot.params['id'];
    

    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;
      this.team = data.data.team
      this.adminTeam = this.team.creatorId == this.user.id
      
      this.adminCategory = this.user.adminCategory && (this.user.categoryId==this.id)
    });


   
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

  toMatch(){
    // this.categoryService.calledList = this.calledPlayerList;
    this.router.navigate(['newMatch',this.category.id])
  }

  // onCheckboxChange(e:any,playerid:any){
  //   debugger
  //   if(e.target.checked){
  //     let exist =this.calledPlayerList.find((id:any)=> id ==playerid);
  //     if(exist==null){
  //       this.calledPlayerList.push(playerid);
  //     }
  //   }else{
  //     this.calledPlayerList = this.calledPlayerList.filter((id:any)=>id!=playerid);
  //   }
  // }


}
