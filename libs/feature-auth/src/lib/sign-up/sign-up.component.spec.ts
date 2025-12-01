import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up.component';
import { AuthService } from '@mini-crm/data-access';
import { of, throwError } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            signUp: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
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
      confirmPassword: 'password123',
    });

    expect(component.form.valid).toBe(true);
  });

  it('should show error when passwords do not match', () => {
    component.form.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'different',
    });
    component.form.get('confirmPassword')?.markAsTouched();

    const error = component.getConfirmPasswordError();
    expect(error).toBeTruthy();
    expect(error).toContain('correspondent pas');
  });

  it('should call authService.signUp on submit with valid form', async () => {
    const signUpSpy = vi
      .spyOn(authService, 'signUp')
      .mockReturnValue(
        of({
          accessToken: 'token',
          user: { id: 1, email: 'test@example.com' },
        })
      );

    component.form.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    component.onSubmit();
    await fixture.whenStable();

    expect(signUpSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should not call authService.signUp when form is invalid', () => {
    const signUpSpy = vi.spyOn(authService, 'signUp');

    component.form.patchValue({
      email: '',
      password: '',
      confirmPassword: '',
    });

    component.onSubmit();

    expect(signUpSpy).not.toHaveBeenCalled();
  });

  it('should display error message on signUp failure', async () => {
    vi.spyOn(authService, 'signUp').mockReturnValue(
      throwError(() => ({ error: { message: 'Email already exists' } }))
    );

    component.form.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    component.onSubmit();
    await fixture.whenStable();

    expect(component.error()).toBeTruthy();
    expect(component.error()).toContain('Email already exists');
  });
});

