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
    role : "UTILISATEUR",
    sexe : ""
  };

  registerForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',Validators.required),
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    email :new FormControl('',Validators.required),
    sexe : new FormControl('',Validators.required)
    
  })
  
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
   
  }

  onSubmit(){
    console.log(this.registerForm.get("username"));
    console.log(this.registerReq);
    
    this.authService.register(this.registerReq).subscribe(data=>{
      console.log(data);
      localStorage.setItem('token',data.token)
      this.router.navigate(['/']).then(()=> window.location.reload())
      
    },err=>{Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'ok'
    })},()=>{
    })
  }

}
