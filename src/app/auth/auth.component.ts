import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from './auth.service';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin = true;
  error :string = null;
  isLoading:boolean = false;
  observ : Observable<Object>;


  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  switchForms(){
    this.isLogin = !this.isLogin;
  }

  onSubmit(form:NgForm){

  if(!form.valid)
  {
    return;
  }

   var email = form.value.email;
   var password = form.value.password
   this.isLoading = true;

  if(this.isLogin){
    this.observ = this.authService.login(email,password);
  }
  else{
    this.observ = this.authService.signUp(email,password);
  }

  this.observ.subscribe(data => {
    this.isLoading = false;
    this.error = null;
    this.router.navigate(['/recipes']);
   },
   errorMessage  => {
     this.error = errorMessage;
     this.isLoading = false;
   })


   form.reset()

  }
}
