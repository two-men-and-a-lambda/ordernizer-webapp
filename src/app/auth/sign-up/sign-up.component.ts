import { Component, OnInit } from '@angular/core';
import { CognitoUserPool,CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface formDataInterface {
  "name": string;
  "family_name": string;
  "email": string;
  "phone_number": string;
  [key: string]: string;
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading:boolean = false;
  fname:string = '';
  lname:string = '';

  email:string = '';
  mobileNo:string = '+1';

  username:string='';
  password:string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {}

  onSignup(form: NgForm){
    if (form.valid) {
     this.isLoading = true;
     var poolData = {
       UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
       ClientId: environment.cognitoAppClientId // Your client id here
     };
     var userPool = new CognitoUserPool(poolData);
     var attributeList = [];
     let formData:formDataInterface = {
       "name": this.fname,
       "family_name": this.lname,
       "email": this.email,
       "phone_number": this.mobileNo,
     }

     for (let key  in formData) {
       let attrData = {
         Name: key,
         Value: formData[key]
       }
       let attribute = new CognitoUserAttribute(attrData);
       attributeList.push(attribute)
     }
     userPool.signUp(this.username, this.password, attributeList, [], (
       err,
       result
     ) => {
       this.isLoading = false;
       if (err) {
         alert(err.message || JSON.stringify(err));
         return;
       }
       alert('User created succesfully. Check email for verification link')
       this.router.navigate(['/login']);
     });
    }
 }
}