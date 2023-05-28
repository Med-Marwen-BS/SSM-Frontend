import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlayerStatService } from 'src/app/services/player-stat.service';
import { PlayerService } from 'src/app/services/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  model!:any;
  isLoggedIn = true;
  categotyId!:any
  playerId!:any
  playerStats:any[]=[];
  update=false

  collectionSize:any = 0
  page:any = 1
  pageSize:any = 5
  teams!: any[];

  player:any={
    firstName:"",
    lastName:"",
    email:"",
    birthdate:"",
    phoneNumber:"",
    height:"",
    width:"",
    position:"",
    // sexe:"",
    category:null
  };

  user!:any
  team!:any
  adminTeam=false
  adminCategory=false

  playerForm = new FormGroup({
    firstName : new FormControl('',[Validators.required]),
    lastName : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    birthdate : new FormControl('',Validators.required),
    phoneNumber : new FormControl('',Validators.required),
    height : new FormControl('',Validators.required),
    width : new FormControl('',Validators.required),
    position : new FormControl('',Validators.required),
    // sexe : new FormControl('',Validators.required),
    
  })

  constructor(private playerStatService:PlayerStatService,private playerService:PlayerService,private categoryService:CategoryService,private authService:AuthService,private router:Router,private activatedroute:ActivatedRoute){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();

    this.categotyId=this.activatedroute.snapshot.params['categotyId'];



    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;
      this.team = data.data.team
      this.adminTeam = this.team.creatorId == this.user.id
      
      this.adminCategory = this.user.adminCategory && (this.user.categoryId==this.categotyId)
      if(!this.adminCategory&&!this.adminTeam){
        this.router.navigate(['login'])
      }
    });
    //if(this.isLoggedIn) this.router.navigate(['/listTeam'])
    this.categotyId=this.activatedroute.snapshot.params['categotyId'];
    this.playerId=this.activatedroute.snapshot.params['playerId'];
    if(this.categotyId!=null){
      this.categoryService.getCategoryById(this.categotyId).subscribe(data=>{
        this.player.category = data;
        
        if(this.playerId!=null){
          this.playerService.getPlayerById(this.playerId).subscribe(data=>{
            this.player=data 
          })
          this.playerStatService.getByPlayerId(this.playerId).subscribe(data=>{
            this.playerStats = data;
            this.collectionSize=data.length
            this.update=true
            
          })
        }
        //this.team.country=countries.find(c=>c.name===data.country)
      });
    }
   
  }

  onSubmit(){
    //this.player.birthDate = '1995-11-11'
    console.log(this.player);
    
    if(this.playerId==null){
      if(this.playerForm.valid){
        this.playerService.addPlayer(this.player).subscribe(data=>{
          Swal.fire({
            title:'Created Successefuly!',
            text: '',
            icon: 'success',
            confirmButtonText: 'ok'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(['addPlayer',this.categotyId,data.id])
            }
          })
        },err=>{
          Swal.fire({
            title:'Error!',
            text: '',
            icon: 'error',
            confirmButtonText: 'ok'
          })
        })
      }else{
        this.playerForm.markAllAsTouched();

      }
    }else{
      if(this.playerForm.valid){
        this.playerService.updatePlayer(this.player).subscribe(data=>{
          Swal.fire({
            title:'Updated Successefuly!',
            text: '',
            icon: 'success',
            confirmButtonText: 'ok'
          })
        },err=>{
          Swal.fire({
            title:'Error!',
            text: '',
            icon: 'error',
            confirmButtonText: 'ok'
          })
        })
      }else{
        this.playerForm.markAllAsTouched();

      }
    }

  }


}
