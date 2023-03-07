import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 constructor(private builder:FormBuilder, 
   private toastr: ToastrService,
   private authservice:AuthService,
   private router:Router
   ){}

 registerForm=this.builder.group({
    id:this.builder.control('', Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    gender:this.builder.control('male'),
    role:this.builder.control(''),
    isactive:this.builder.control(false)
 });
 proceedregister(){
  if(this.registerForm.valid){
      this.authservice.Proceedregister(this.registerForm.value).subscribe(res=>{
       this.toastr.success('Please contact admin for enable access','Registered Successfully!');
       this.router.navigate(['login']);
      });
  }else{
     this.toastr.warning('Please enter valid data!');
  }
 }
}
