import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { countries } from 'src/app/components/store/country-data-store';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  id!:any ;
  team!:any;
  selectedCountry!:string;
  public countries:any = countries
  isLoggedIn = true;


  teamForm = new FormGroup({
    name : new FormControl('',[Validators.required]),
    country : new FormControl('',Validators.required)
    
  })


  constructor(private teamService:TeamService,private activatedroute:ActivatedRoute,private config: NgSelectConfig,
    private  authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogged();
    if(!this.isLoggedIn) this.router.navigate(['/login'])

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
    this.id=this.activatedroute.snapshot.params['id'];
    if(this.id!=null){
      this.teamService.getTeamById(this.id).subscribe(data=>{
        this.team = data;
        this.team.country=countries.find(c=>c.name===data.country)
      });
    }else{
      this.team={id:this.id,name:"",country:""};
    }
  }

  onSubmit(){
    console.log("test");
    if(this.id==null){
      this.teamService.addTeams({name:this.team.name,country:this.team.country}).subscribe(data=>{
        console.log(data);
        
      })
    }else{
      this.teamService.addTeams({id:this.team.id,name:this.team.name,country:this.team.country.name}).subscribe(data=>{
        console.log(data);
        
      })
    }
 
  }

}
