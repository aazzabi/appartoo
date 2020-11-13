import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/security/auth.guard';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './pages/register/register.component';
import {GetPangolinResolver} from './services/resolvers/get.pangolin.resolver';
import {IsAuthenticatedGuard} from './services/security/is.authenticated.guard';
import {GetAllUnknownPangolinResolver} from './services/resolvers/get.all.unknown.pangolin.resolver';
import {GetProfilePangolinResolver} from './services/resolvers/get.profile.pangolin.resolver';
import {MyProfileComponent} from './profile/my.profile.component';
import {EditProfileComponent} from './editProfile/edit.profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: {pangolin: GetPangolinResolver, allUnknownPangolin: GetAllUnknownPangolinResolver}
  },
  {path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard] , resolve: {profile: GetProfilePangolinResolver}},
  {path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuard] , resolve: {profile: GetProfilePangolinResolver}},
  {path: 'login', component: LoginComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [IsAuthenticatedGuard]},
  { path: '**', component: HomeComponent }
];
export const ROUTING = RouterModule.forRoot(routes);
