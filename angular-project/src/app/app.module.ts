import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { JwtInterceptor } from './helper/jwt.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './guard/auth.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateParserFormatter } from './config/datepicker/dateparser.formatter';
import { DatepickerI18n, I18n } from './config/datepicker/datepicker.i18n';
import { DatepickerComponent } from './component/datepicker/datepicker.component';

@NgModule({
  declarations: [       //  <- component
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    DatepickerComponent
  ],
  imports: [            // <- module
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [          // <- service
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    I18n,
    { provide: NgbDatepickerI18n, useClass: DatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: DateParserFormatter },
    AuthInterceptor,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
