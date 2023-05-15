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

  
  constructor(private http : HttpClient) { }

  register(registerRequest:RegisterRequest): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"user-service/auth/register",registerRequest);
  }
  login(loginReq:LoginReq): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"user-service/auth/signIn",loginReq);
  }

  getUserByUsername(username:any): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/getByUsername/"+username);
  }
  getUserByToken(): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/getByToken");
  }
  
  setLoginInformations(token:string,username:string){
    localStorage.setItem('token',token)
    localStorage.setItem('username',username)
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
  isLogged():boolean{
    
    return localStorage.getItem('token')?true:false;
  }
}

