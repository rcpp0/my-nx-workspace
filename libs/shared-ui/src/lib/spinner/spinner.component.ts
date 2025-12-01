import { Component, ChangeDetectionStrategy, input } from '@angular/core';

/**
 * Spinner component for loading states.
 *
 * Displays a Bootstrap spinner with customizable size and color variant.
 * Uses Bootstrap's spinner-border utility classes.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-spinner />
 * ```
 *
 * ### With Custom Size
 * ```html
 * <lib-spinner [size]="'lg'" />
 * ```
 *
 * ### With Custom Variant
 * ```html
 * <lib-spinner [variant]="'danger'" />
 * ```
 *
 * ### Full Example
 * ```html
 * <lib-spinner [size]="'lg'" [variant]="'primary'" />
 * ```
 *
 * @see https://getbootstrap.com/docs/5.3/components/spinners/
 * @category Shared UI
 */
@Component({
  selector: 'lib-spinner',
  imports: [],
  template: `
    <div class="spinner-container">
      <div
        class="spinner-border"
        [class]="spinnerClasses()"
        role="status"
        [attr.aria-label]="ariaLabel()"
      >
        <span class="visually-hidden">{{ ariaLabel() }}</span>
      </div>
    </div>
  `,
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * Color variant using Bootstrap color utilities
   * @default 'primary'
   */
  variant = input<
    'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  >('primary');

  /**
   * Accessible label for screen readers
   * @default 'Chargement...'
   */
  ariaLabel = input<string>('Chargement...');

  /**
   * Computed CSS classes for the spinner
   * @internal
   */
  protected spinnerClasses = () => {
    const size = this.size();
    const variant = this.variant();
    const classes: string[] = ['spinner-border'];

    // Size classes
    if (size === 'sm') {
      classes.push('spinner-border-sm');
    } else if (size === 'lg') {
      classes.push('spinner-border-lg');
    }

    // Variant classes
    classes.push(`text-${variant}`);

    return classes.join(' ');
  };
}

