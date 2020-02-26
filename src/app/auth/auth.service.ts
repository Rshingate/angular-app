import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmit = new BehaviorSubject<User>(null);

  constructor(private http:HttpClient){}

  signUp(email:string,password:string)
  {
    return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAlydrlF8l_rfYjOkj43-DLMBuevP-ag8I',
      {
        email:email,
        password : password,
        returnSecureToken : true
      }
      )
      .pipe(catchError(this.handleError),
      tap(responseData => {
        const date = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        const user = new User(responseData.email,responseData.localId,responseData.idToken,date);
        this.userEmit.next(user);
        localStorage.setItem('userData',JSON.stringify(user));
      })
      );
  }

  login(email:string,password:string)
  {
      return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAlydrlF8l_rfYjOkj43-DLMBuevP-ag8I',
      {
        email:email,
        password : password,
        returnSecureToken : true
      }
      )
      .pipe(
      catchError(this.handleError),
      tap(responseData => {
          const date = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
          const user = new User(responseData.email,responseData.localId,responseData.idToken,date);
          this.userEmit.next(user);
          localStorage.setItem('userData',JSON.stringify(user));
      })
      );
  }

  autoLogin(){
      const userData = JSON.parse(localStorage.getItem('userData'));
      this.userEmit.next(userData);
  }

  logOut()
  {
    localStorage.setItem('userData','');
    this.userEmit.next(null);
  }

  private handleError(errorResponse:HttpErrorResponse)
  {
    let errorMessage = 'An unknown error occured!!';
    switch(errorResponse.error.error.message){
    case 'EMAIL_NOT_FOUND' :
      errorMessage = 'Email Not Found!!';
    case 'EMAIL_EXISTS' :
      errorMessage = 'Email Already Exists!!';
    case 'INVALID_PASSWORD' :
        errorMessage = 'This password is incorrect.';
    }


    return throwError(errorMessage);

  }

}
