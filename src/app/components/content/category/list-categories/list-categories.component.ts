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

  deleteUser(user:any){
    let msg1="Confirm delete from team!"
    let msg2="delete category "

    Swal.fire({
      title: msg1,
      text: msg2,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      // if (result.isConfirmed) {
      //   this.authService.deleteUserFromTeam(user.id).subscribe(data=>{
      //     this.ngOnInit()
      //     Swal.fire({
      //       position: 'top-end',
      //       icon: 'success',
      //       title: 'User '+user.username+' deleted',
      //       showConfirmButton: false,
      //       timer: 1500
      //     })
    
      //   },()=>{
      //     Swal.fire({
      //       position: 'top-end',
      //       icon: 'error',
      //       title: 'Try Again',
      //       showConfirmButton: false,
      //       timer: 1500
      //     })
    
      //   })
        
      // }
    })
  }

}
