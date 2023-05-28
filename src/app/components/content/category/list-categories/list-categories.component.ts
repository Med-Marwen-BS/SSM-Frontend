import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { TeamService } from 'src/app/services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  collectionSize: any = 0
  page: any = 1
  pageSize: any = 5
  categoriesList!: any[];
  isLoggedIn = true;
  user!:any
  team!:any
  adminTeam=false

  constructor(private categoryService: CategoryService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if (!this.isLoggedIn) this.router.navigate(['/login'])

    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;
      this.team = data.data.team
      this.adminTeam = this.team.creatorId == this.user.id

      this.categoryService.getCategories(this.team.id).subscribe(categoriesList => {
        console.log(categoriesList);
  
        this.categoriesList = categoriesList.reverse();
        this.collectionSize = this.categoriesList.length
      })
    });



  }


  async addCategory() {


    const { value: name } = await Swal.fire({
      title: 'Category Name',
      input: 'text',
      inputLabel: 'Your category name',
      inputPlaceholder: 'Enter your category name'
    })

    if (name) {
      //Swal.fire(`Entered email: ${name}`)
      this.categoryService.addCategory({name:name,team:this.team}).subscribe(data=>{
            console.log(data);
            Swal.fire({
              title:'success!',
              text: '',
              icon: 'success',
              confirmButtonText: 'ok'
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              this.ngOnInit()
            })
      },err=>{
        Swal.fire({
          title:'Name already Used!',
          text: '',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      },()=>{

      }
      )

    }

  }
  refreshCountries() {

  }

}
