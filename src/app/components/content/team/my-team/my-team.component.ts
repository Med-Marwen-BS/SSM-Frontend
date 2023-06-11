import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { countries } from 'src/app/components/store/country-data-store';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  id!: any;
  user!: any;
  team: any = {
    name: "",
    country: "",
    creator: {}
  };
  adminTeam=false
  selectedCountry!: string;
  public countries: any = countries.map(c => c.name);
  isLoggedIn = true;


  teamForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    country: new FormControl('', Validators.required)

  })


  constructor(private teamService: TeamService, private activatedroute: ActivatedRoute, private config: NgSelectConfig,
    private authService: AuthService, private router: Router,private location: Location) { }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if (!this.isLoggedIn) this.router.navigate(['/login'])

    this.authService.getUserByToken().subscribe(data => {
      this.user = data.data;
      this.team = data.data.team
      if(this.user.id==this.team.creatorId) this.adminTeam=true

    });



    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same 
    // bindValue in most of the place. 
    // You can also override bindValue for the specified template 
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';
    // this.activatedroute.paramMap.subscribe(params => { 
    //   this.id = params.get('id'); 
    // });

    // else{
    //   this.team={id:this.id,name:"",country:""};
    // }
  }
  isCreator() {
    if(this.team!=null)
      return this.user.id == this.team.creatorId
    else return false ;
  }

  update(e: any) {
    this.team.country = e.target.value
  }

  onSubmit() {
    console.log(this.team.creator);

    if (this.teamForm.valid) {
      this.teamService.updateTeam({ id: this.team.id, name: this.team.name, country: this.team.country, creatorId: "" }).subscribe(data => {
        Swal.fire({
          title: 'success!',
          text: '',
          icon: 'success',
          confirmButtonText: 'ok'
        })

      }, (err) => {
        Swal.fire({
          title: 'Team with the same name and country exist!',
          text: '',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }, () => { })

    } else {
      console.log("notvalid");

      this.teamForm.markAllAsTouched();

    }


  }
  async addTeamToUser() {

    const { value: email } = await Swal.fire({
      title: 'Add User By Email',
      input: 'email',
      inputLabel: 'email address',
      inputPlaceholder: 'Enter your email address'
    })
    if (email) {

      this.authService.addTeamToUser(this.team.id, email).subscribe(data => {

        Swal.fire({
          title: 'user added with success!',
          text: '',
          icon: 'success',
          confirmButtonText: 'ok'
        })
      }, (err) => {

        console.log(err);

        Swal.fire({
          title: 'check if the user exist or have a team!',
          text: '',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }, () => {

      })
    }

  }
  leaveTeam(){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, leave it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.leaveTeam().subscribe(data=>{
          if(data.data === "success")
            Swal.fire(
              'Leave!',
              'You leaved the team.',
              'success'
            )
          else if(data.data==='failed')
          Swal.fire(
            'Leave!',
            'Something went wrong.',
            'error'
          )
        },err=>{
          
    
        },()=>{
          window.location.reload();
        })
      }
    })
  }

}