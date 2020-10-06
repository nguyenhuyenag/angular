import { Component } from '@angular/core';
import { User } from './model/user';
import { Role } from './model/role';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.listComponent.sort((a, b) => (a.path.length > b.path.length) ? 1 : -1);
  }

  currentUser: User;
  path = "component";

  listComponent = [
    { "path": this.path + "/datepicker", "name": "datepicker" },
  ];

  get isAdmin() {
    return (this.currentUser && this.currentUser.role === Role.admin);
  }

  public logout() {
    this.authService.logout();
  }

}
