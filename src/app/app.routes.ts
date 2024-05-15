import { Routes } from '@angular/router';
import {UserPageComponent} from "./components/user-page/user-page.component";
import {AppComponent} from "./app.component";
import {loggedGuardGuard} from "./routeGuards/logged-guard.guard";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component')
        .then(m => m.LoginComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/users/users.component')
        .then(m => m.UsersComponent),
    canActivate: [loggedGuardGuard]
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./components/user-page/user-page.component')
        .then(m => m.UserPageComponent),
    canActivate: [loggedGuardGuard]
  },
];
