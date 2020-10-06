import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: UserService) { }

  public listUser: User[] = [];

  ngOnInit() {
    this.service.getAllUser().subscribe(data => this.listUser = data);
  }

}
