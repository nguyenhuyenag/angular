import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Globals } from '../util/globals';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // https://bootsnipp.com/snippets/z8699

  constructor(private userService: UserService) {
    this.loadingGif = Globals.LOADING;
  }

  submitted = false;
  loadingGif: string;
  isLoading = false;
  errorMsg = "is required";

  registerForm = new FormGroup({
    username: new FormControl("angular", Validators.required),
    fullName: new FormControl("angular", Validators.required),
    email: new FormControl("angular@email.com", [Validators.required, Validators.email]),
    password: new FormControl("angular", Validators.required),
    passwordConfirm: new FormControl("", Validators.required),
  });

  get f() { return this.registerForm.controls; }

  ngOnInit() {

  }

  public register() {
    this.submitted = true;
    // password & password nhập lại khác nhau
    if (this.f.password.value != this.f.passwordConfirm.value) {
      return;
    }
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.register(this.registerForm.value).subscribe(
      success => {
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      }
    );

  }

}
