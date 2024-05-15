import {Component, effect, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {UsersComponent} from "./components/users/users.component";
import {User} from "./models/User";
import {DataServiceService} from "./services/data-service.service";
import {MatToolbarRow} from "@angular/material/toolbar";
import {MatChipTrailingIcon} from "@angular/material/chips";
import {patchState} from "@ngrx/signals";
import {TableRowState} from "./stores/AppData.store";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, UsersComponent, RouterLink, RouterLinkActive, MatToolbarRow, MatChipTrailingIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ng-adv-1';
  dataStore = inject(TableRowState);

  loggedUser: any | User = null;
  selectedUser: User = {
    username: '',
    email: ''
  };

  constructor(protected dataService: DataServiceService) {
    effect(() => console.log('userState', this.dataService.loginState()));
  }

  ngOnInit() {
  }


  onLogin(loggedUser: any | User) {
    console.log(loggedUser)
    this.loggedUser = loggedUser;
  }

  onLogout() {
    // sessionStorage.removeItem('logged');
    patchState(this.dataService.loginState, {username: '', isAdmin: false})

    this.dataService.redirectTo('/login')
  }
}
