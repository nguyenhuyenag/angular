import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { Role } from './model/role';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.admin] } },
  {
    path: 'component', canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'datepicker', pathMatch: 'full' },
      { path: 'datepicker', component: DatepickerComponent }
    ]
  },
  // other
  { path: '', redirectTo: 'home', pathMatch: 'full' },                    // default
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] }  // catch all
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
