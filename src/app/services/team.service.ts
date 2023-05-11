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
  addTeams(team:any): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"team-service/team/save",team);
  }
}
