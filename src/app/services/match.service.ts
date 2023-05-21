import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http : HttpClient) { }
  getMatchByTeamAndDate(teamId:any,date:any): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"team-service/match/getByDate/"+teamId+"/"+date);
  }
  addMatch(match:any): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"team-service/match/save",match);
  }
  updateMatch(match:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"team-service/match/update",match);
  }
  getMatchById(id : string):Observable<any>{
    return this.http.get<any>(environment.url_gateway+"team-service/match/get/"+id) ;
  }

  updateScore(match:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"team-service/match/updateScore",match);
  }
  updateToLive(matchId:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"team-service/match/updateToLive/"+matchId,{});
  }
  updateToFinished(matchId:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"team-service/match/updateToFinished/"+matchId,{});
  }
}
