import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private router: Router, private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(this.getCurrentUser());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    private user: User;
    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;
    private loginUrl = environment.apiUrl + "/auth/login";

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public login(username: String, password: String): Observable<boolean> {
        let headers = new HttpHeaders({
            "Content-Type": "application/json;charset=utf-8"
        });
        let body = JSON.stringify({ username: username, password: password });
        return this.http.post<any>(this.loginUrl, body, { headers: headers, observe: "response" }).pipe(map(
            resp => {
                if (resp.headers.has("Authorization")) {
                    // login successful if there's a jwt token in the response
                    this.user = JSON.parse(JSON.stringify(resp.body));
                    let token = resp.headers.get("Authorization");
                    localStorage.setItem("token", token);
                    localStorage.setItem("currentUser", JSON.stringify(this.user));
                    this.currentUserSubject.next(this.user);
                    return true;
                }
                return false;
            }
        ));
    }

    public logout() {
        this.currentUserSubject.next(null);
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        this.router.navigate(["login"]);
    }

    public getToken(): string {
        return localStorage.getItem("token");
    }

    public getCurrentUser(): User {
        return JSON.parse(localStorage.getItem("currentUser"));
    }
}
