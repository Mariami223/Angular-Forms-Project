import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}
  message: string = '';
  errorMessage: string = '';

  registerForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    // repeatPassword: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.http
        .post(
          'https://localhost:7153/api/Register/registration',
          this.registerForm.value,
          { responseType: 'text' }
        )
        .subscribe((resp) => {
          console.log(resp);
          this.registerForm.reset();
          this.message = resp;
        });
      console.log(this.registerForm.value, 'Submitted');
    } else {
      console.log('Error');
    }
  }

  // Access element's value

  get userName(): FormControl {
    return this.registerForm.get('userName') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }
}
