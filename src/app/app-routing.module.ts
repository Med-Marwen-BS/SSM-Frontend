import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/main/login/login.component';
import { RegisterComponent } from './components/main/register/register.component';
import { AddTeamComponent } from './components/content/team/add-team/add-team.component';
import { ListTeamsComponent } from './components/content/team/list-teams/list-teams.component';
import { MyTeamComponent } from './components/content/team/my-team/my-team.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addTeam', component:AddTeamComponent },
  { path: 'addTeam/:id', component:AddTeamComponent },
  { path: 'myTeam', component:MyTeamComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'listTeam', component:ListTeamsComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }