import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from './services/security/auth.guard';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './pages/register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
export const ROUTING = RouterModule.forRoot(routes);
