import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { AuthService } from '../auth/auth.service';

import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

  onClickLogin(): void {
    if (this.isLoggedIn()){
      this.onLogout()
    }
    else{
      this.router.navigate(["login"])
    }
  }

  onLogout(): void {
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();
    this.router.navigate(["login"])
  }
  
}
