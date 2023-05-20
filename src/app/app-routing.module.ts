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
import { MatchLandingComponent } from './components/content/match/match-landing/match-landing.component';
import { NewMatchComponent } from './components/content/match/new-match/new-match.component';
import { LiveMatchComponent } from './components/content/match/live-match/live-match.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'addTeam', component:AddTeamComponent },
  { path: 'addTeam/:id', component:AddTeamComponent },
  { path: 'myTeam', component:MyTeamComponent },
  { path: 'listTeam', component:ListTeamsComponent },
  { path: 'addCategory', component:AddCategoryComponent },
  { path: 'addCategory/:id', component:AddCategoryComponent },
  { path: 'listCategories', component:ListCategoriesComponent },
  { path: 'addPlayer', component:AddPlayerComponent },
  { path: 'addPlayer/:categotyId', component:AddPlayerComponent },
  { path: 'addPlayer/:categotyId/:playerId', component:AddPlayerComponent },
  { path: 'matchLanding', component:MatchLandingComponent },
  { path: 'newMatch', component:NewMatchComponent },
  { path: 'newMatch/:categoryId', component:NewMatchComponent },
  { path: 'newMatch/:categoryId/:matchId', component:NewMatchComponent },
  { path: 'live/:id', component:LiveMatchComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }