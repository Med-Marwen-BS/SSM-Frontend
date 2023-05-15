import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginReq } from 'src/app/models/LoginReq.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = true;


  loginReq:any={
    username:"",
    password:""
  };

  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',Validators.required)
    
  })


  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(this.isLoggedIn) this.router.navigate(['/listTeam'])
   
  }

  onSubmit(){
    console.log(this.loginForm.get("username"));
    console.log(this.loginReq);
    if(this.loginForm.valid){
      this.authService.login(this.loginReq).subscribe(data=>{
        console.log(data);
  
        this.authService.setLoginInformations(data.token,this.loginReq.username);
  
        this.router.navigate(['/']).then(()=> window.location.reload())
        
       } ,err=>{
          console.log(err);
          
          Swal.fire({
          title:'username or password incorrect!',
          text: '',
          icon: 'error',
          confirmButtonText: 'ok'
        })},()=>{
        })
    }else{
      console.log("notvalid");
      
      this.loginForm.markAllAsTouched();

    }
    
  }

}
