import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatchService } from 'src/app/services/match.service';
import { PlayerStatService } from 'src/app/services/player-stat.service';
import { PlayerService } from 'src/app/services/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.css']
})
export class NewMatchComponent implements OnInit {
  categoryId!:any ;
  create =true
  matchId!:any ;
  match:any={
    opponent:"",
    date:"",
    time:"",
    category:{},
    team:{},
    status:"NotStarted"

  };
  playerList!:any;
  user!:any
  category!:any

  isLoggedIn = true;
  calledPlayerList:any=[];
  team!:any
  adminTeam=false
  adminCategory=false

  matchForm = new FormGroup({
    opponent : new FormControl('',[Validators.required]),
    date : new FormControl('',[Validators.required]),
    time : new FormControl('',Validators.required)
    
  })


  constructor(private playerStatService:PlayerStatService,private playerService:PlayerService,private matchService:MatchService,private categoryService:CategoryService,private activatedroute:ActivatedRoute,private config: NgSelectConfig,
    private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    let username =localStorage.getItem('username');
    this.authService.getUserByToken().subscribe(data=>{
      this.user =data.data 
      //this.match.creator =data.data 
    });

    if(!this.isLoggedIn) this.router.navigate(['/login'])
    

    this.categoryId=this.activatedroute.snapshot.params['categoryId'];

    
    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;
      this.team = data.data.team
      this.adminTeam = this.team.creatorId == this.user.id
      
      this.adminCategory = this.user.adminCategory && (this.user.categoryId==this.categoryId)
      if(!this.adminCategory&&!this.adminTeam){
        this.router.navigate(['login'])
      }
    });


    this.matchId=this.activatedroute.snapshot.params['matchId'];
    if(this.matchId==null){
      if(this.categoryId!=null){
        this.categoryService.getCategoryById(this.categoryId).subscribe(data=>{
          this.match.category = data;
          this.match.team=data.team
          this.playerService.getPlayers(this.categoryId).subscribe(p=>{
            this.playerList=p
          })
          //this.team.country=countries.find(c=>c.name===data.country)
        });
      }
    }else{
      this.create = false
      this.matchService.getMatchById(this.matchId).subscribe(data=>{
        this.match=data
        console.log(data);
        
      })
      this.playerStatService.getMatchById(this.matchId).subscribe(data=>{
        
        this.playerList = data.map((ps:any)=>ps.player)
      })
    }

  }

  onSubmit(){
    console.log(this.match);
    
    if(this.matchForm.valid){
      if(this.matchId==null){
        if(this.calledPlayerList.length<1){
          Swal.fire({
            title:'Select 1 player at least!',
            text: '',
            icon: 'error',
            confirmButtonText: 'ok'
          })
        }else{
          this.matchService.addMatch({match:this.match,playersIds:this.calledPlayerList}).subscribe(data=>{
            Swal.fire({
              title:'success!',
              text: '',
              icon: 'success',
              confirmButtonText: 'ok'
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.router.navigate(['newMatch',this.categoryId,data.id])
              }
            })
            
            console.log(data);
            
          },()=>{
            Swal.fire({
              title:'Creation Error!',
              text: '',
              icon: 'error',
              confirmButtonText: 'ok'
            })
          },()=>{})
        }
      }else{
        this.matchService.updateMatch(this.match).subscribe(data=>{
          Swal.fire({
            title:'success!',
            text: '',
            icon: 'success',
            confirmButtonText: 'ok'
          })
          
        },()=>{
          Swal.fire({
            title:'Updating Error!',
            text: '',
            icon: 'error',
            confirmButtonText: 'ok'
          })
        },()=>{})
      }
    }else{
      console.log("notvalid");
      
      this.matchForm.markAllAsTouched();

    }

 
  }
  onCheckboxChange(e:any,playerid:any){
    
    if(e.target.checked){
      let exist =this.calledPlayerList.find((id:any)=> id ==playerid);
      if(exist==null){
        this.calledPlayerList.push(playerid);
      }
    }else{
      this.calledPlayerList = this.calledPlayerList.filter((id:any)=>id!=playerid);
    }
  }
}
