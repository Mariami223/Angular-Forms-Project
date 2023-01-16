import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userName: string = '';

  constructor(private route: Router) {}
  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('user'));
    console.log(data, 'es');
    this.userName = data[0].userName;
  }

  onLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }
}
