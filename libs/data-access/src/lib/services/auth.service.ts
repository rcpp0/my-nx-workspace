import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenSignal = signal<string | null>(null);
  private readonly userSignal = signal<User | null>(null);

  readonly token = computed(() => this.tokenSignal());
  readonly user = computed(() => this.userSignal());
  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  signIn(credentials: LoginRequest): Observable<AuthResponse> {
    const mockUser: User = { id: 1, email: credentials.email };
    const mockResponse: AuthResponse = {
      accessToken: 'mock-access-token',
      user: mockUser,
    };

    return of(mockResponse).pipe(
      delay(500),
      map((response) => {
        this.tokenSignal.set(response.accessToken);
        this.userSignal.set(response.user);
        return response;
      }),
    );
  }

  signUp(credentials: RegisterRequest): Observable<AuthResponse> {
    const mockUser: User = { id: 2, email: credentials.email };
    const mockResponse: AuthResponse = {
      accessToken: 'mock-access-token',
      user: mockUser,
    };

    return of(mockResponse).pipe(
      delay(500),
      map((response) => {
        this.tokenSignal.set(response.accessToken);
        this.userSignal.set(response.user);
        return response;
      }),
    );
  }

  logout(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }
}


