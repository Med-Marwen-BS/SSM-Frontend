import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatchService } from 'src/app/services/match.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-match-landing',
  templateUrl: './match-landing.component.html',
  styleUrls: ['./match-landing.component.css']
})
export class MatchLandingComponent implements OnInit {

  collectionSize: any = 0
  page: any = 1
  pageSize: any = 5
  matchList!: any[];
  isLoggedIn = true;
  user!:any
  team!:any

  todayDate=new Date();
  currentYear = this.todayDate.getFullYear();
  currentMonth = this.todayDate.getMonth()+1;
  currentDay = this.todayDate.getDate();

  finalMonth:any;
  finalDay:any;

  adminTeam=false
  adminCategory=false

  date = "1995-05-07"

  constructor(private matchService:MatchService,private categoryService: CategoryService, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if (!this.isLoggedIn) this.router.navigate(['/login'])
    this.intitalizeDate()
    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;
      this.team = data.data.team
      this.search();

      this.adminTeam = this.team.creatorId == this.user.id
      
      // this.categoryService.getCategories(this.team.id).subscribe(categoriesList => {
      //   console.log(categoriesList);
  
      //   this.categoriesList = categoriesList.reverse();
      //   this.collectionSize = this.categoriesList.length
      // })

    });

    


  }

  editButtonRole(categoryId:string){
    return this.adminTeam || (this.user.adminCategory && (this.user.categoryId==categoryId))
  }


  async addMatch() {


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
  intitalizeDate() {
        
    if(this.currentMonth < 10){
      this.finalMonth = '0'+this.currentMonth
    }else this.finalMonth=this.currentMonth
    if(this.currentDay < 10){
      this.finalDay = '0'+this.currentDay
    }else this.finalDay=this.currentDay

    this.date = this.currentYear+'-'+this.finalMonth+'-'+this.finalDay
  }

  search(){
    console.log(this.date);
    
    this.matchService.getMatchByTeamAndDate(this.team.id,this.date).subscribe(data=>{
      this.matchList=data
    })

  }

  formatDate(time: string): string {
    return time.slice(0, -3);
  }
}
