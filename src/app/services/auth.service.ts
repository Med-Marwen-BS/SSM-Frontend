import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginReq } from '../models/LoginReq.model';
import { RegisterRequest } from '../models/RegisterReq.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http : HttpClient) { 
    if(this.isLogged()){
      this.isTokenExpired().subscribe(data=>{
        console.log(data);
        if(data.data == false) console.log("works");
        else if(data.data == true) this.logout();
      })
    }

   }

  register(registerRequest:RegisterRequest): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"user-service/auth/register",registerRequest);
  }
  login(loginReq:LoginReq): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"user-service/auth/signIn",loginReq);
  }

  addTeamToUser(teamId:string,email:string): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"user-service/addTeamToUser",{teamId:teamId,email:email});
  }
  getUserByUsername(username:any): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/getByUsername/"+username);
  }
  getUserByToken(): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/getByToken");
  }
  isTokenExpired(): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/isTokenExpired");
  }
  leaveTeam(): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/leaveTeam");
  }
  
  setLoginInformations(token:string,username:string){
    localStorage.setItem('token',token)
    localStorage.setItem('username',username)
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload()

  }
  isLogged():boolean{
    
    return localStorage.getItem('token')?true:false;
  }
}

