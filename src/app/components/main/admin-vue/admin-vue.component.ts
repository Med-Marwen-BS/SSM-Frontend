import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-vue',
  templateUrl: './admin-vue.component.html',
  styleUrls: ['./admin-vue.component.css']
})
export class AdminVueComponent {
  constructor(private authService:AuthService){}
  logout(){
    this.authService.logout();
  }
}
