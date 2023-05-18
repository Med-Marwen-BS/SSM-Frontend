import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/main/login/login.component';
import { RegisterComponent } from './components/main/register/register.component';
import { AddTeamComponent } from './components/content/team/add-team/add-team.component';
import { ListTeamsComponent } from './components/content/team/list-teams/list-teams.component';
import { MyTeamComponent } from './components/content/team/my-team/my-team.component';
import { AddCategoryComponent } from './components/content/category/add-category/add-category.component';
import { ListCategoriesComponent } from './components/content/category/list-categories/list-categories.component';
import { AddPlayerComponent } from './components/content/player/add-player/add-player.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addTeam', component:AddTeamComponent },
  { path: 'addTeam/:id', component:AddTeamComponent },
  { path: 'myTeam', component:MyTeamComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'listTeam', component:ListTeamsComponent },
  { path: 'addCategory', component:AddCategoryComponent },
  { path: 'addCategory/:id', component:AddCategoryComponent },
  { path: 'listCategories', component:ListCategoriesComponent },
  { path: 'addPlayer', component:AddPlayerComponent },
  { path: 'addPlayer/:categotyId', component:AddPlayerComponent },
  { path: 'addPlayer/:categotyId/:playerId', component:AddPlayerComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }