import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DataServiceService} from "../../services/data-service.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
    NgOptimizedImage
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users: any | User[];
  selectedUser: User = {
    username: '',
    email: ''
  };

  displayedColumns: string[] = ['username', 'email', 'image', 'action'];

  constructor(private http: HttpClient, private router: Router, private dataService: DataServiceService) {
  }
  ngOnInit() {
    this.fetchUsers();

    this.dataService.user$.subscribe(data => {
      console.log("Data", data);
      this.selectedUser.username = data.username;
      this.selectedUser.email = data.email;
    });
  }

  private fetchUsers() {
    this.http.get('https://dummyjson.com/users')
      .subscribe({
        next: (data: any) => {
          this.users = data.users;
        },
        error: (error) => {},
        complete: () => {}
      });
  }

  linkTo(user: any) {
    this.router.navigate([`/user/${user.id}`]);
  }

  selectUser(user: any) {
    this.dataService.sendData(user)
  }
}
