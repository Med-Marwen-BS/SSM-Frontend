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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AdminVueComponent,
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    TopbarComponent,
    TableTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
