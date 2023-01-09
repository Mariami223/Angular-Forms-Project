import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscriber } from 'rxjs';
import { map } from 'rxjs';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private http: HttpClient) {}

  allUsers: User[] = [];
  userName: string = '';
  userPassword: string = '';
  isLoading: boolean = false;
  errorMessage: string = null;

  ngOnInit(): void {
    this.fetchUsers();
  }

  onUsersFetch() {
    this.fetchUsers();
  }
  deleteall() {
    this.deleteAllUsers();
  }

  // create users in database
  onSubmit(users: { userName: string; userPassword: string }) {
    console.log(users);

    this.http
      .post<{ name: string }>(
        'https://firstprojectangular-2e37a-default-rtdb.firebaseio.com/users.json',
        users
      )
      .subscribe(
        (resp) => {
          console.log(resp);
        },
        (error) => {
          console.log(error);
        }
      );
    this.userName = '';
    this.userPassword = '';
    alert(
      'გილოცავთ თქვენ წარმატებულად დარეგისტრირდით,მომხმარებლის სახელების სანახავად დააწექით სიის ნახვა ღილაკს'
    );
  }

  // display users from data base
  private fetchUsers() {
    this.isLoading = true;
    this.http
      .get<{ [key: string]: User }>(
        'https://firstprojectangular-2e37a-default-rtdb.firebaseio.com/users.json'
      )
      .pipe(
        map((resp) => {
          const users = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              users.push({ ...resp[key], id: key });
            }
          }
          return users;
        })
      )
      .subscribe(
        (users) => {
          console.log(users);
          this.allUsers = users;
          this.isLoading = false;
        },
        (err) => {
          this.errorMessage = err.message;
        }
      );
  }
  // delete one user which you choose
  deleteUser(id: string) {
    this.http
      .delete(
        'https://firstprojectangular-2e37a-default-rtdb.firebaseio.com/users/' +
          id +
          '.json'
      )
      .subscribe();
  }
  // delete all users
  deleteAllUsers() {
    this.http
      .delete(
        'https://firstprojectangular-2e37a-default-rtdb.firebaseio.com/users.json'
      )
      .subscribe();
  }
}
