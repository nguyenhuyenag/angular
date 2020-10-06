import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  private registerUrl = environment.apiUrl + "/api/user/register";
  private getAllUserUrl = environment.apiUrl + "/admin/get-all-user";

  public register(data: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8"
    });
    return this.http.post(this.registerUrl, data, { headers: headers, observe: "response" });
  }

  public getAllUser(): Observable<User[]> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      "Authorization": localStorage.getItem("token")
    });
    return this.http.get<User[]>(this.getAllUserUrl, { headers: headers, observe: "body" }).pipe(
      map(res => { return res; })
    );
  }

}
