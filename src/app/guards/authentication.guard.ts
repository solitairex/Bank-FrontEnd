import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate{
  constructor(private authService:AuthService,private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if(this.authService.isAuthenticated==true){
      return true;
    }else{
      this.router.navigateByUrl("/login")
     return false;

  }
}}
