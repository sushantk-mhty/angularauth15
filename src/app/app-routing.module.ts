import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './appComponents/home/home.component';
import { LoginComponent } from './appComponents/login/login.component';
import { RegisterComponent } from './appComponents/register/register.component';
import { UserlistingComponent } from './appComponents/userlisting/userlisting.component';
import { AuthGuard } from './appGuard/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserlistingComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
