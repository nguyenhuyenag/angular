import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = this.authService.getToken();
        let user = this.authService.currentUserValue;
        if (user && token) {
            // check if route is restricted by role
            // if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
            if (!token) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['/login']);
        return false;
    }
}
