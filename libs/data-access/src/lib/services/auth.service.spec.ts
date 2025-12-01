import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from '../models/auth.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });

    service = TestBed.inject(AuthService);
  });

  describe('Initialisation', () => {
    it('devrait être créé', () => {
      expect(service).toBeTruthy();
    });

    it('devrait initialiser les signals avec des valeurs par défaut', () => {
      expect(service.token()).toBeNull();
      expect(service.user()).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('signIn', () => {
    it('devrait authentifier un utilisateur et mettre à jour les signals', (done) => {
      // Arrange
      const credentials: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Act
      service.signIn(credentials).subscribe({
        next: (response) => {
          // Assert
          expect(response.accessToken).toBe('mock-access-token');
          expect(response.user.email).toBe(credentials.email);
          expect(service.token()).toBe('mock-access-token');
          expect(service.user()?.email).toBe(credentials.email);
          expect(service.isAuthenticated()).toBe(true);
          done();
        },
      });
    });

    it('devrait retourner un Observable avec un délai', (done) => {
      // Arrange
      const credentials: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };
      const startTime = Date.now();

      // Act
      service.signIn(credentials).subscribe({
        next: () => {
          // Assert
          const elapsed = Date.now() - startTime;
          expect(elapsed).toBeGreaterThanOrEqual(400); // Au moins 400ms de délai
          done();
        },
      });
    });
  });

  describe('signUp', () => {
    it('devrait créer un compte et mettre à jour les signals', (done) => {
      // Arrange
      const credentials: RegisterRequest = {
        email: 'newuser@example.com',
        password: 'password123',
      };

      // Act
      service.signUp(credentials).subscribe({
        next: (response) => {
          // Assert
          expect(response.accessToken).toBe('mock-access-token');
          expect(response.user.email).toBe(credentials.email);
          expect(service.token()).toBe('mock-access-token');
          expect(service.user()?.email).toBe(credentials.email);
          expect(service.isAuthenticated()).toBe(true);
          done();
        },
      });
    });
  });

  describe('logout', () => {
    it('devrait déconnecter l\'utilisateur et réinitialiser les signals', (done) => {
      // Arrange
      const credentials: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Act - Connexion puis déconnexion
      service.signIn(credentials).subscribe({
        next: () => {
          expect(service.isAuthenticated()).toBe(true);

          service.logout();

          // Assert
          expect(service.token()).toBeNull();
          expect(service.user()).toBeNull();
          expect(service.isAuthenticated()).toBe(false);
          done();
        },
      });
    });
  });

  describe('isAuthenticated computed', () => {
    it('devrait retourner false quand token est null', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('devrait retourner true quand token est présent', (done) => {
      // Arrange
      const credentials: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Act
      service.signIn(credentials).subscribe({
        next: () => {
          // Assert
          expect(service.isAuthenticated()).toBe(true);
          done();
        },
      });
    });
  });
});

