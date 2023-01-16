import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  message: string = '';
  errorMessage: string = '';

  registerForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    // repeatPassword: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.registerForm.value) {
      console.log(this.registerForm.value, 'Submitted');
      this.authService.registerUser().subscribe((resp) => {
        this.registerForm.reset();
        this.message = resp;
        // this.router.navigate(['/Login']);
      });
    } else {
    }
  }

  // Access element's value

  get userName(): FormControl {
    return this.registerForm.get('userName') as FormControl;
  }

  get password() {
    return this.registerForm.get('userPassword') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }
}
