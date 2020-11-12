import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/security/auth.guard';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './pages/register/register.component';
import {GetPangolinResolver} from './services/resolvers/get.pangolin.resolver';
import {IsAuthenticatedGuard} from './services/security/is.authenticated.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard], resolve: {pangolin: GetPangolinResolver}},
  {path: 'login', component: LoginComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [IsAuthenticatedGuard]}
];
export const ROUTING = RouterModule.forRoot(routes);
