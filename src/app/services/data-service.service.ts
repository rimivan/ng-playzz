import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {User} from "../models/User";
import {Router} from "@angular/router";
import {signalState} from "@ngrx/signals";

type UserState = { username: string; isAdmin: boolean };

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  user$ = new Subject<User>();

  loginState = signalState<UserState>({
    username: '',
    isAdmin: false,
  });

  constructor(private router: Router) { }

  sendData(data: any) {
    this.user$.next(data);
  }

  isLogged(): boolean {
    // return !!sessionStorage.getItem('logged');
    return !!this.loginState().username;
  }

  redirectTo(path: string) {
    this.router.navigateByUrl(path)
  }
}
