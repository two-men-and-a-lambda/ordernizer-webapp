import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import * as sha256  from 'crypto-js/sha256';
import * as hmacSHA512  from 'crypto-js/hmac-sha512';
import * as Base64 from 'crypto-js/enc-base64';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false;
  email_address: string = "";
  password: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onSignIn(form: NgForm){
    if (form.valid) {
      this.isLoading = true;

      const username= this.email_address;
      const clientId= environment.cognitoAppClientId // Your client id here
      const client_secret = environment.COGNITO_CLIENT_SECRET;

      const hashDigest = sha256(client_secret);
      const hmac = hmacSHA512(hashDigest, `${username}${clientId}`)
      const secretHash = Base64.stringify(hmac);

      let authenticationDetails = new AuthenticationDetails({
          Username: username,
          Password: this.password,
          ValidationData: {SecretHash: secretHash}

          
      });
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: clientId, // Your client id here
        SecretHash: secretHash

      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.email_address, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.router.navigate(["home"])
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
        },
      });
    }
  }
}