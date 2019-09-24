import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot,CanLoad, CanActivate, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild,CanActivate,CanLoad {

  constructor(private authService: AuthService, private router: Router){}

  canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean>{
    return this.canActivate(route, state);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean>{
    return this.checkAuthState(state.url);
  }
  canLoad(route: Route, segments : UrlSegment[]): Observable<boolean>{
    const url = segments.map(s => '/${s}').join('');
    return this.checkAuthState(url).pipe(take(1));
  }
 
  private checkAuthState(redirect: string): Observable<boolean>{
    return this.authService.isAuthenticated.pipe(
      tap(is =>{
        if(!is){
          this.router.navigate(['/login'],{
            queryParams:{redirect}
        });
        }
      })
    )
  }
}
