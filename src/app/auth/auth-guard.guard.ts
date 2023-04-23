import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){

  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth = this.authService.isLoggedIn()
    switch (state.url){
      case '/login': { 
        if(isAuth) {
          this.router.navigate(['home'])
          
        }
        return !isAuth;
        break;
      } 
      case '/signup': { 
        if(isAuth) {
          this.router.navigate(['home'])
        }
        return !isAuth;

        break;
      } 
      default: { 
        if(!isAuth) {
          this.router.navigate(['login'])
        }
        return isAuth;

 
         break; 
      } 
    }
    
    return isAuth;
  }
}