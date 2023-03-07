import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private authservice: AuthService,
    private dialogref: MatDialogRef<UpdatepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  editdata: any;
  ngOnInit(): void {
    this.authservice.GetAllRole().subscribe((res) => {
      this.rolelist = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.authservice.Getbycode(this.data.usercode).subscribe((res) => {
        this.editdata = res;
        this.registerForm.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          password: this.editdata.password,
          email: this.editdata.email,
          gender: this.editdata.gender,
          role: this.editdata.role,
          isactive: this.editdata.isactive,
        });
      });
    }
  }
  rolelist: any;
  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  });

  updateUser() {
    if (this.registerForm.valid) {
      this.authservice
        .Updateuser(this.registerForm.value.id, this.registerForm.value)
        .subscribe((res) => {
          this.toastr.success('Updated successfully.');
          this.dialogref.close();
        });
    } else {
      this.toastr.warning('Please select Role');
    }
  }
}
