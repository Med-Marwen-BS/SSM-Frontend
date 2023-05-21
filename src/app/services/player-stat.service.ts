import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatService {

  constructor(private http : HttpClient) { }

  getMatchById(matchId : string):Observable<any>{
    return this.http.get<any>(environment.url_gateway+"team-service/playerStats/get/"+matchId) ;
  }

  getByPlayerId(playerId : string):Observable<any>{
    return this.http.get<any>(environment.url_gateway+"team-service/playerStats/getByPlayer/"+playerId) ;
  }

  updateMatch(ps:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"team-service/playerStats/update",ps);
  }
}
