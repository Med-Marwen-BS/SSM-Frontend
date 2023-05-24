import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http : HttpClient) { }
  getTeams(): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"team-service/team/getAll");
  }
  addTeam(team:any): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"team-service/team/save/"+localStorage.getItem('username'),team);
  }
  updateTeam(team:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"team-service/team/update",team);
  }
  getTeamById(id : string):Observable<any>{
    return this.http.get<any>(environment.url_gateway+"team-service/team/get/"+id) ;
  }
  deleteTeamById(id : string):Observable<any>{
    return this.http.delete<any>(environment.url_gateway+"team-service/team/delete/"+id) ;
  }

}
