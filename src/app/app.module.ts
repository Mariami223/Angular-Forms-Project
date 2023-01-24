import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CartComponent } from './cart/cart.component';

const appRoute: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  { path: 'user', component: UserComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,

    RegisterFormComponent,
    NotFoundPageComponent,
    LoginComponent,
    UserComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
