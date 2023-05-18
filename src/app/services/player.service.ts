import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http : HttpClient) { }

  getPlayers(categoryId:any): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"team-service/player/getAll/"+categoryId);
  }
  addPlayer(player:any): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"team-service/player/save",player);
  }
  updatePlayer(player:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"team-service/player/update",player);
  }
  getPlayerById(id : string):Observable<any>{
    return this.http.get<any>(environment.url_gateway+"team-service/player/get/"+id) ;
  }
}
