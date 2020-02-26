import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})

@Injectable()
export class ServersComponent implements OnInit {

  username: string = '';
  showSecret = false;
  data = [];
  users  = []; 
  
  constructor(private http: HttpClient) {}

  // ShowSecretMessage(): Observable<any> {
  //  // this.showSecret = !this.showSecret;
  //   return this.http.get('http://localhost:3000').subscribe((res => console.log(res));
  // }

  ngOnInit() {
  }

  ShowSecretMessage() {
    //this.showSecret = !this.showSecret;
    //this.data.push(new Date());
      this.http.get('http://localhost:3000').subscribe((res : any[])=>{
     // console.log(res);
      this.users = res;
      });
  }

  resetFlag() {
    if (this.username === '') {
      return true;
    }
  }

  resetContent() {
    this.username = '';
  }

}
