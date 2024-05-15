import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, RouterLinkActive, RouterOutlet} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable,
} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {
  MatCard, MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    RouterLinkActive,
    MatHeaderCellDef,
    FormsModule,
    MatInput,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardSubtitle,
    MatCardAvatar,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardImage,
    MatCardActions
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit{
  user: any = null;
  userRawData: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'age', 'email', 'image', 'action'];
  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Test ID:', params['id']);
      this.http.get(`https://dummyjson.com/user/${params['id']}`)
        .subscribe({
          next: (data: any) => {
            this.user = data;
            this.userRawData = {...data};
          },
          error: (error) => {},
          complete: () => {}
        });
    });
  }

  onDiscardEditRow(row: any) {
    console.log("Raw: ", this.userRawData)
    const tmp = this.userRawData;
    this.user = {...tmp};
  }

  onConfirmEditRow(row: any) {
    const body = {
      username: this.user.username,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.put('https://dummyjson.com/users/' + this.user.id, body, httpOptions)
      .subscribe({
        next: (response: any) => {
          console.log("User updated : ", response)

          // sessionStorage.setItem('logged', response.username)

        },
        error: (error) => {
        }
      });

  }
}
