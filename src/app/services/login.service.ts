import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Credentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * WEEK 6 — LoginService
 *
 * Requirement: simulate the login submission TWO ways.
 *
 * 1. loginWithPromise — a real Promise with explicit `resolve` and `reject`.
 *    On success it logs the submitted credentials in the service.
 *
 * 2. loginWithObservable — the same submission as an Observable, where the
 *    rxjs `pipe` operator chain (map + tap) transforms the credentials to
 *    UPPERCASE before they are logged in the service.
 */
@Injectable({ providedIn: 'root' })
export class LoginService {
  // 1) Promise-based login with resolve / reject
  loginWithPromise(credentials: Credentials): Promise<Credentials> {
    return new Promise((resolve, reject) => {
      // setTimeout simulates a network round-trip to a real server
      setTimeout(() => {
        if (this.isValid(credentials)) {
          // RESOLVE — success: log the submitted credentials inside the service
          console.log('[LoginService] Promise resolved — submitted credentials:', credentials);
          resolve(credentials);
        } else {
          // REJECT — failure
          reject(new Error('Invalid credentials: email and password are required'));
        }
      }, 800);
    });
  }

  // 2) Same functionality as an Observable.
  //    pipe() + map() uppercase the credentials BEFORE they are logged.
  loginWithObservable(credentials: Credentials): Observable<Credentials> {
    return of(credentials).pipe(
      map((c) => ({
        ...c,
        email: c.email.toUpperCase(),
        password: c.password.toUpperCase(),
      })),
      tap((uppercased) =>
        console.log('[LoginService] Observable — credentials uppercased with pipe:', uppercased),
      ),
    );
  }

  private isValid({ email, password }: Credentials): boolean {
    return email.trim().length > 3 && password.length >= 6;
  }
}
