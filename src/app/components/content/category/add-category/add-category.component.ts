import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  id!:any ;
  isLoggedIn = true;
  category!:any;

  constructor(private categoryService:CategoryService,private activatedroute:ActivatedRoute,private config: NgSelectConfig,
    private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
  
    if(!this.isLoggedIn) this.router.navigate(['/login'])
    this.id=this.activatedroute.snapshot.params['id'];
    if(this.id!=null){
      this.categoryService.getCategoryById(this.id).subscribe(data=>{
        this.category = data;
        //this.team.country=countries.find(c=>c.name===data.country)
      });
    }
  }


}
