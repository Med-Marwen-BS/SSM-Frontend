import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  calledList:any ;

  constructor(private http : HttpClient) { }

  getCategories(teamId:any): Observable<any> {
    return this.http.get<any>(environment.url_gateway+"team-service/category/getAll/"+teamId);
  }
  addCategory(category:any): Observable<any> {
    return this.http.post<any>(environment.url_gateway+"team-service/category/save",category);
  }
  updateCategory(category:any): Observable<any> {
    return this.http.put<any>(environment.url_gateway+"team-service/category/update",category);
  }
  getCategoryById(id : string):Observable<any>{
    return this.http.get<any>(environment.url_gateway+"team-service/category/get/"+id) ;
  }
}
