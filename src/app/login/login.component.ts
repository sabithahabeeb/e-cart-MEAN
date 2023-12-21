import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginForm = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb: FormBuilder, private toaster: ToasterService, private api: ApiService, private router: Router) { }
  Login() {
    if (this.LoginForm.valid) {

      const password = this.LoginForm.value.password
      const email = this.LoginForm.value.email
      const user = { password, email }
      this.api.LoginAPI(user).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toaster.showSuccess(`${res.existingUser.username} logined successfully`)
          sessionStorage.setItem("username", res.existingUser.username)
          sessionStorage.setItem("token", res.token)
          this.api.getwishlistCount()
          this.LoginForm.reset()
          this.router.navigateByUrl("")
        },
        error: (data: any) => {
          this.toaster.showError(data.error)
        }
      })

    } else {
      this.toaster.showWarning('InvalidForm')
    }

  }
}
