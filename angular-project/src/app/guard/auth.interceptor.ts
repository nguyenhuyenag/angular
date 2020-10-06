import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    /**
     * Add authorization header with jwt token if available
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        const user = this.authService.getCurrentUser();
        if (user && token) {
            request = request.clone({
                headers: request.headers.set('Authorization', token)
            });
        }
        return next.handle(request);
    }
}
