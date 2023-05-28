import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/reusable/sidebar/sidebar.component';
import { AdminVueComponent } from './components/main/admin-vue/admin-vue.component';
import { RegisterComponent } from './components/main/register/register.component';
import { LoginComponent } from './components/main/login/login.component';
import { ResetPasswordComponent } from './components/main/reset-password/reset-password.component';
import { AppRoutingModule } from './app-routing.module';
import { TopbarComponent } from './components/reusable/topbar/topbar.component';
import { TableTeamComponent } from './components/content/table-team/table-team.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProvider } from './http-interceptor.service';
import { AddTeamComponent } from './components/content/team/add-team/add-team.component';
import { ListTeamsComponent } from './components/content/team/list-teams/list-teams.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyTeamComponent } from './components/content/team/my-team/my-team.component';
import { AddCategoryComponent } from './components/content/category/add-category/add-category.component';
import { ListCategoriesComponent } from './components/content/category/list-categories/list-categories.component';
import { AddPlayerComponent } from './components/content/player/add-player/add-player.component';
import { NewMatchComponent } from './components/content/match/new-match/new-match.component';
import { LiveMatchComponent } from './components/content/match/live-match/live-match.component';
import { MatchLandingComponent } from './components/content/match/match-landing/match-landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListUserComponent } from './components/content/users/list-user/list-user.component';
import { ListUsersTeamComponent } from './components/content/users/list-users-team/list-users-team.component';
import { DetailUserComponent } from './components/content/users/detail-user/detail-user.component';
import { MyProfileComponent } from './components/content/users/my-profile/my-profile.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AdminVueComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    TopbarComponent,
    TableTeamComponent,
    ListTeamsComponent,
    AddTeamComponent,
    MyTeamComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    AddPlayerComponent,
    NewMatchComponent,
    LiveMatchComponent,
    MatchLandingComponent,
    DashboardComponent,
    ListUserComponent,
    ListUsersTeamComponent,
    DetailUserComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,NgSelectModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
