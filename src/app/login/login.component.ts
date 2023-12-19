import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginForm = this.fb.group({
   
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb:FormBuilder,private toaster:ToasterService){}
  Login(){
    if(this.LoginForm.valid){
     
    const password = this.LoginForm.value.password
    const email = this.LoginForm.value.email
    }else{
      this.toaster.showWarning('InvalidForm')
    }
    
  }
}
