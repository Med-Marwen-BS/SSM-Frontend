import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isLoggedIn = true;


  loginReq:any={
    username:""
  };

  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    
  })


  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(this.isLoggedIn) this.router.navigate(['/dashboard'])
   
  }

  onSubmit(){
    console.log(this.loginForm.get("username"));
    console.log(this.loginReq);
    if(this.loginForm.valid){
      this.authService.reset(this.loginReq).subscribe((data:any)=>{
        console.log(data);
        Swal.fire({
          title:'Email sent!',
          text: 'You will find an email in your inbox containing the new password.', 
          icon: 'success',
          confirmButtonText: 'ok'
        }).then((result)=>{
          if(result.isConfirmed){
            this.router.navigate(['login'])
          }
        }
        )

        
       } ,(err:any)=>{
          
          Swal.fire({
          title:'username incorrect!',
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