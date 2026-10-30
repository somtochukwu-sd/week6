import { Component, inject, signal } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form, FormField, required, email, minLength, submit } from '@angular/forms/signals';
import { LoginService } from '../../services/login.service';
import { ThemeService } from '../../services/theme.service';

// WEEK 6 — Login page
// - Signal Forms with a validation schema on every input (from Week 5)
// - onSubmit now hands the credentials to LoginService TWICE:
//     1. loginWithPromise()  -> Promise with resolve / reject, logs the
//        submitted credentials on success
//     2. loginWithObservable() -> Observable whose pipe() chain uppercases
//        the credentials BEFORE they are logged in the service
interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink, NgClass, NgStyle],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // 1. The form's data lives in a signal
  loginModel = signal<LoginData>({ email: '', password: '', rememberMe: false });

  // 2. form() creates the signal form + the VALIDATION SCHEMA for each input
  loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Enter a valid email address' });

    required(path.password, { message: 'Password is required' });
    minLength(path.password, 6, { message: 'Password must be at least 6 characters' });
  });

  message = signal('');

  // WEEK 6: greeting via a writable signal + navbar colour stream
  name = signal('Login');
  bgColor = signal('');
  theme = inject(ThemeService);
  private loginService = inject(LoginService);

  constructor() {
    this.theme.selectedColor$.pipe(takeUntilDestroyed()).subscribe((hex) => this.bgColor.set(hex));
  }

  // 3. submit() marks every field as touched and only runs if the form is valid
  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.loginForm, async () => {
      const credentials = this.loginModel();
      try {
        // 1) Promise version — resolves and logs the credentials in the service
        const resolved = await this.loginService.loginWithPromise(credentials);

        // 2) Observable version — pipe() uppercases the credentials before logging
        this.loginService.loginWithObservable(resolved).subscribe();

        this.message.set(`Welcome back, ${resolved.email}! Login resolved — check the browser console for both logs.`);
      } catch (error) {
        this.message.set('Login failed — the promise was rejected.');
      }
      return undefined;
    });
  }
}
