import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@mini-crm/data-access';
import { RegisterRequest } from '@mini-crm/data-access';

/**
 * Sign-up component for user registration.
 *
 * Displays a registration form with email, password, and password confirmation fields.
 * Handles form validation and navigation after successful registration.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-sign-up />
 * ```
 *
 * The component automatically redirects to `/orders` after successful registration.
 *
 * @see AuthService
 * @see SignInComponent
 * @category Feature Auth
 */
@Component({
  selector: 'lib-sign-up',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  /**
   * Reactive form for sign-up
   * @internal
   */
  readonly form = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  /**
   * Loading state during registration
   * @internal
   */
  #loading = signal(false);

  /**
   * Error message to display
   * @internal
   */
  #error = signal<string | null>(null);

  /**
   * Loading state (readonly)
   * @readonly
   */
  readonly loading = computed(() => this.#loading());

  /**
   * Error message (readonly)
   * @readonly
   */
  readonly error = computed(() => this.#error());

  /**
   * Custom validator to check if passwords match
   * @internal
   */
  private passwordMatchValidator(group: any) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  /**
   * Handles form submission
   * @internal
   */
  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.#loading.set(true);
    this.#error.set(null);

    const credentials: RegisterRequest = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.authService.signUp(credentials).subscribe({
      next: () => {
        this.#loading.set(false);
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.#loading.set(false);
        this.#error.set(
          err.error?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.'
        );
      },
    });
  }

  /**
   * Gets error message for email field
   * @internal
   */
  protected getEmailError(): string | null {
    const emailControl = this.form.get('email');
    if (emailControl?.hasError('required') && emailControl.touched) {
      return 'L\'email est requis';
    }
    if (emailControl?.hasError('email') && emailControl.touched) {
      return 'L\'email n\'est pas valide';
    }
    return null;
  }

  /**
   * Gets error message for password field
   * @internal
   */
  protected getPasswordError(): string | null {
    const passwordControl = this.form.get('password');
    if (passwordControl?.hasError('required') && passwordControl.touched) {
      return 'Le mot de passe est requis';
    }
    if (
      passwordControl?.hasError('minlength') &&
      passwordControl.touched
    ) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    return null;
  }

  /**
   * Gets error message for confirm password field
   * @internal
   */
  protected getConfirmPasswordError(): string | null {
    const confirmPasswordControl = this.form.get('confirmPassword');
    if (
      confirmPasswordControl?.hasError('required') &&
      confirmPasswordControl.touched
    ) {
      return 'La confirmation du mot de passe est requise';
    }
    if (
      this.form.hasError('passwordMismatch') &&
      confirmPasswordControl?.touched
    ) {
      return 'Les mots de passe ne correspondent pas';
    }
    return null;
  }
}

