import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authservice: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  userdata: any;
  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });
  proceedlogin() {
    if (this.loginForm.valid) {
      this.authservice.Getbycode(this.loginForm.value.id).subscribe((res) => {
        this.userdata = res;
        console.log(this.userdata);
        if (this.userdata.password === this.loginForm.value.password) {
          if (this.userdata.isactive) {
            sessionStorage.setItem('username', this.userdata.id);
            sessionStorage.setItem('userrole', this.userdata.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contact admin', 'In Active User');
          }
        } else {
          this.toastr.error('Invalid credential');
        }
      });
    }
  }
}
