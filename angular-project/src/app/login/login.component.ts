import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { DisplayMessage } from '../model/display-message';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    errorMsg: any;
    returnUrl: string;
    failed = false;
    isLoading = false;
    submitted = false;
    avatar = "assets/images/avatar.png";
    cat_ok = "assets/images/cat_ok.png";
    loading = "assets/images/loading.gif";
    cat_unknown = "assets/images/cat_unknown.png";
    notification: DisplayMessage;

    private loginForm = new FormGroup({
        username: new FormControl("user", Validators.required),
        password: new FormControl("123456", Validators.required)
    });

    // getter
    get f() { return this.loginForm.controls; }

    ngOnInit() {
        this.authService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || "/";
    }

    public login() {
        this.failed = false;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.login(this.f.username.value, this.f.password.value).subscribe(
            success => {
                console.log(success);
                this.router.navigateByUrl(this.returnUrl);
                this.router.navigateByUrl("admin");
            }, error => {
                console.log(error);
                this.failed = true;
                this.isLoading = false;
                this.notification = { type: 'error', content: 'The username or password is incorrect' };
            }
        );
    }
}
