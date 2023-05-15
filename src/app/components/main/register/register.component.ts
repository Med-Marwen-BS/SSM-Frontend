import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerReq:any={
    firstName : "",
    lastName : "",
    email : "",
    username : "",
    password: "",
    confirm_password:"",
    role : "USER",
    sexe : "HOMME"
  };
  isLoggedIn = true;


  registerForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',Validators.required),
    confirm_password : new FormControl('',Validators.required),
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    email :new FormControl('',Validators.required),
    // sexe : new FormControl('',Validators.required)
    
  })
  
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(this.isLoggedIn) this.router.navigate(['/listTeam'])

  }

  onSubmit(){
    if(this.registerReq.password !== this.registerReq.confirm_password ){
      this.registerForm.controls['confirm_password'].setErrors({'incorrect': true});
    }
    if(this.registerForm.valid){
      console.log(this.registerForm.get("username"));
      console.log(this.registerReq);
      
      this.authService.register(this.registerReq).subscribe(data=>{
        console.log(data);
        
        this.authService.setLoginInformations(data.token,this.registerReq.username);
        this.router.navigate(['/']).then(()=> window.location.reload())
        
      },err=>{
        console.log(err);
        
        Swal.fire({
        title: err.error.errorMessage+'!',
        text: '',
        icon: 'error',
        confirmButtonText: 'ok'
      })},()=>{
      })
    }else{
      console.log("notvalid");
      
      this.registerForm.markAllAsTouched();

    }

  }

}
