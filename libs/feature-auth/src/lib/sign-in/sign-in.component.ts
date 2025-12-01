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
import { LoginRequest } from '@mini-crm/data-access';

/**
 * Sign-in component for user authentication.
 *
 * Displays a login form with email and password fields.
 * Handles form validation and navigation after successful authentication.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-sign-in />
 * ```
 *
 * The component automatically redirects to `/orders` after successful login.
 *
 * @see AuthService
 * @see SignUpComponent
 * @category Feature Auth
 */
@Component({
  selector: 'lib-sign-in',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  /**
   * Reactive form for sign-in
   * @internal
   */
  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * Loading state during authentication
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

    const credentials: LoginRequest = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.authService.signIn(credentials).subscribe({
      next: () => {
        this.#loading.set(false);
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.#loading.set(false);
        this.#error.set(
          err.error?.message || 'Erreur lors de la connexion. Veuillez réessayer.'
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
}

