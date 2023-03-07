import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './appServices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  title = 'angularauth15';
  ismenurequired=false;
  isadminuser=false;
  constructor(private router:Router, private authService:AuthService){

  }
  ngDoCheck(): void {
    let currenturl=this.router.url;
    if(currenturl=='/login'|| currenturl=='/register'){
      this.ismenurequired=false;
    }else{
      this.ismenurequired=true;
    }
    if(this.authService.GetUserrole()==='admin'){
      this.isadminuser=true
    }else{
      this.isadminuser=false;
    }
  }
}
