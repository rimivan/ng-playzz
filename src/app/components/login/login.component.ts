import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {User} from "../../models/User";
import {Router, RouterOutlet} from "@angular/router";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {DataServiceService} from "../../services/data-service.service";
import {patchState} from "@ngrx/signals";
import {MatDialog} from "@angular/material/dialog";
import {LoginDialogComponent} from "./login-dialog/login-dialog.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    MatInput,
    MatFormField,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @Output() loginEmitter = new EventEmitter<any | User>();

  user: string = 'kminchelle';
  pwd: string = '0lelplR';

  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router, private dataService: DataServiceService) {
  }

  ngOnInit(): void {
  }

  onLogin() {
    const body = {
      username: this.user,
      password: this.pwd,
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post('https://dummyjson.com/auth/login', body, httpOptions)
      .subscribe({
        next: (response: any) => {
          console.log("User: ", response)
          this.router.navigateByUrl('/users')
          this.loginEmitter.emit(response)

          // sessionStorage.setItem('logged', response.username)
          patchState(this.dataService.loginState, {username: response.username, isAdmin: false})

        },
        error: (error) => {
        }
      });
  }
}
