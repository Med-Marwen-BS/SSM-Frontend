import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginReq } from 'src/app/models/LoginReq.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginReq:any={
    username:"",
    password:""
  };

  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',Validators.required)
    
  })


  constructor(private authService:AuthService){}
  ngOnInit(): void {
   
  }

  onSubmit(){
    console.log(this.loginForm.get("username"));
    console.log(this.loginReq);
    
    this.authService.login(this.loginReq).subscribe(data=>{
      console.log(data);
      
    })
  }

}
