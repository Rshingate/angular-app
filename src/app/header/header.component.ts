import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{

  isAuth:boolean = false;
  userSub : Subscription;

  constructor(private auth:AuthService){}

  ngOnInit(){
      this.userSub = this.auth.userEmit.subscribe(user => {
          this.isAuth =! !user;
      })
  }

  ngOnDestroy(){
      this.userSub.unsubscribe();
  }

  logOut(){
    this.auth.logOut();
  }
  
}
