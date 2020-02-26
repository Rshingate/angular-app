import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl,Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  //@ViewChild(NgForm) submitForm:NgForm;
  answer:string = '';
  userForm:FormGroup;
  userNames = ['Avi','Rahul007'];
  submitted:boolean = false;

  //PIPES
  servers = [
    {
       'name':'Alpha',
       'instanceType':'stable',
       'provider':'aws',
       'status':'online',
       'price' : '100',
       'date' : new Date()
    },
    {
      'name':'Beta',
      'instanceType':'stable',
      'provider':'godaddy',
      'status':'offline',
      'price' : '200',
      'date' : new Date()
   },
   {
      'name':'Gyama',
      'instanceType':'unstable',
      'provider':'aws',
      'status':'online',
      'price' : '500',
      'date' : new Date()
    },
    {
      'name':'Alpha-D',
      'instanceType':'unstable',
      'provider':'aws',
      'status':'offline',
      'price' : '200',
      'date' : new Date()
   }
  ];

  queryString = '';

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.userForm = new FormGroup({
        'username' : new FormControl(null,[Validators.required,this.validateUsername.bind(this)]),
        'email' : new FormControl(null,[Validators.required,Validators.email]),
        'secret' : new FormControl(null,[Validators.required]),
        'secret_answer' : new FormControl(null)
    });

    this.getUsers();
   // this.deleteUsers();
  }

  onSubmit(form:NgForm)
  {
    this.submitted = true;
    //console.log(this.submitForm);  //ANOTHER METHOD GET FORM OBJECT
    console.log(form.value);
  }

  onSubmitReactive(){
   //console.log(this.userForm.value);

    //SEND HTTP TO FIREBASE
    this.http.post('https://angular-app-f8910.firebaseio.com/users.json',this.userForm.value)
    .subscribe(response => {
        console.log(response);
    });

  }


  private getUsers()
  {
      //SEND HTTP GET
      this.http.get('https://angular-app-f8910.firebaseio.com/users.json',
      {
        params : new HttpParams().set('print','pretty'),
        headers : new HttpHeaders({'custom-header':'c'}),
        responseType:'json'
      })
      .pipe(
        map(responseData => {
            const userArray =[];
            for(let item in responseData)
            {
              userArray.push({...responseData[item],id:item});
            }
          return userArray;  
        })
      )
      .subscribe(posts => {
        console.log(posts);
        },error => {
            console.log(error);
        } );
  }

  private deleteUsers()
  {
    this.http.delete('https://angular-app-f8910.firebaseio.com/users.json')
    .subscribe(responseData => {
      console.log(responseData);
    })
  }

  validateUsername(control:FormControl){
     if(this.userNames.indexOf(control.value) !== -1)
     {
        return { validUsername: true };
     }
     return null;
  }
}
