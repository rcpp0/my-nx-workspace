import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in.component';
import { AuthService } from '@mini-crm/data-access';
import { of, throwError } from 'rxjs';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            signIn: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when fields are empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should have valid form when fields are filled correctly', () => {
    component.form.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(component.form.valid).toBe(true);
  });

  it('should show error when email is invalid', () => {
    component.form.patchValue({
      email: 'invalid-email',
      password: 'password123',
    });
    component.form.get('email')?.markAsTouched();

    const error = component.getEmailError();
    expect(error).toBeTruthy();
    expect(error).toContain('valide');
  });

  it('should show error when password is too short', () => {
    component.form.patchValue({
      email: 'test@example.com',
      password: '12345',
    });
    component.form.get('password')?.markAsTouched();

    const error = component.getPasswordError();
    expect(error).toBeTruthy();
    expect(error).toContain('6 caractères');
  });

  it('should call authService.signIn on submit with valid form', async () => {
    const signInSpy = vi
      .spyOn(authService, 'signIn')
      .mockReturnValue(
        of({
          accessToken: 'token',
          user: { id: 1, email: 'test@example.com' },
        })
      );

    component.form.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();
    await fixture.whenStable();

    expect(signInSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should not call authService.signIn when form is invalid', () => {
    const signInSpy = vi.spyOn(authService, 'signIn');

    component.form.patchValue({
      email: '',
      password: '',
    });

    component.onSubmit();

    expect(signInSpy).not.toHaveBeenCalled();
  });

  it('should display error message on signIn failure', async () => {
    vi.spyOn(authService, 'signIn').mockReturnValue(
      throwError(() => ({ error: { message: 'Invalid credentials' } }))
    );

    component.form.patchValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();
    await fixture.whenStable();

    expect(component.error()).toBeTruthy();
    expect(component.error()).toContain('Invalid credentials');
  });
});

