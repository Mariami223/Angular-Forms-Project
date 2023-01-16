import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message: string = '';
  errorMessage: string = null;

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: Router,
    private authService: AuthService,
    private hhtp: HttpClient
  ) {}
  ngOnInit(): void {}

  loginObj: any = [];

  onLogin() {
    if (this.loginForm.valid) {
      this.hhtp
        .post(
          'https://localhost:7153/api/User/CreateUser',
          this.loginForm.value,
          { responseType: 'text' }
        )
        .subscribe(
          (resp) => {
            console.log(resp);
            this.loginObj.push(this.loginForm.value);
            localStorage.setItem('user', JSON.stringify(this.loginObj));
            this.message = resp;
            this.loginForm.reset();
            this.route.navigate(['/user']);
          },
          (err) => {
            this.errorMessage = err.error;
          }
        );
    } else {
      console.log('somethingwrong');
    }
  }

  get userName(): FormControl {
    return this.loginForm.get('userName') as FormControl;
  }

  get userPassword() {
    return this.loginForm.get('userPassword') as FormControl;
  }
}
