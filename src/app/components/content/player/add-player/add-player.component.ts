import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent {
  model!:any;
  isLoggedIn = true;

  player:any={
    firstName:"",
    lastName:"",
    email:"",
    birthDate:"",
    phoneNumber:"",
    height:"",
    width:"",
    sexe:""
    };

  playerForm = new FormGroup({
    firstName : new FormControl('',[Validators.required]),
    lastName : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    birthDate : new FormControl('',Validators.required),
    phoneNumber : new FormControl('',Validators.required),
    height : new FormControl('',Validators.required),
    width : new FormControl('',Validators.required),
    sexe : new FormControl('',Validators.required),
    
  })

  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    //if(this.isLoggedIn) this.router.navigate(['/listTeam'])
   
  }

  onSubmit(){

    if(this.playerForm.valid){
        
    }else{
      this.playerForm.markAllAsTouched();

    }
  }


}
