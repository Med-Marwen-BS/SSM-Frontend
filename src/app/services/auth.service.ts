import { HttpClient, HttpParams } from '@angular/common/http';
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
    // if(this.isLogged()){
    //   this.isTokenExpired().subscribe(data=>{
    //     console.log(data);
    //     if(data.data == false) console.log("works");
    //     else if(data.data == true) this.logout();
    //   })
    // }

   }

   update(id:any,user:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"user-service/update/"+id,user);
  }

  register(registerRequest:RegisterRequest): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"user-service/auth/register",registerRequest);
  }
  login(loginReq:LoginReq): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"user-service/auth/signIn",loginReq);
  }

  reset(loginReq:LoginReq): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"user-service/auth/reset/"+loginReq.username,{});
  }

  addTeamToUser(teamId:string,email:string): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"user-service/addTeamToUser",{teamId:teamId,email:email});
  }

  unblockUser(userId:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"user-service/unblock/"+userId,{});
  }
  blockUser(userId:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"user-service/block/"+userId,{});
  }

  getUserByUsername(username:any): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/getByUsername/"+username);
  }

  changeRole(username:any,role:any): Observable<any> {
    let params = new HttpParams()
    .set('username', username)
    .set('role', role);

    return this.http.post<any>(environment.url_gateway+"user-service/changeRole",{},{params: params});
  }

  changeCategoryRole(id:any,adminCategory:any,categoryId:any): Observable<any> {
    let params = new HttpParams()
    .set('id', id)
    .set('categoryId', categoryId)
    .set('adminCategory', adminCategory);

    return this.http.post<any>(environment.url_gateway+"user-service/changeCategoryRole",{},{params: params});
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/getAllUsers");
  }
  getUsersByTeamId(teamId:any): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/getUsersByTeam/"+teamId);
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

  deleteUserFromTeam(id:string): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"user-service/deleteUserFromTeam/"+id);
  }

  getNotifications(id:string): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"team-service/notification/getAll/"+id);
  }
  readNotifications(id:string): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"team-service/notification/changeStatus/"+id);
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
    this.isTokenExpired().subscribe(data=>{
      console.log(data);
      if(data.data == false) console.log("works");
      else if(data.data == true) this.logout();
    },()=>{})
    return localStorage.getItem('token')?true:false;
  }
}

