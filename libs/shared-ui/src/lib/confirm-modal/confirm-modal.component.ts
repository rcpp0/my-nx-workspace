import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Confirmation modal component for user confirmations.
 *
 * Displays a Bootstrap modal dialog with customizable title, message, and button labels.
 * Emits events when the user confirms or cancels the action.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-confirm-modal
 *   [isOpen]="showModal"
 *   title="Supprimer la commande"
 *   message="Êtes-vous sûr de vouloir supprimer cette commande ?"
 *   (confirmed)="onConfirm()"
 *   (cancelled)="onCancel()"
 * />
 * ```
 *
 * ### With Custom Button Labels
 * ```html
 * <lib-confirm-modal
 *   [isOpen]="showModal"
 *   title="Confirmer l'action"
 *   message="Cette action est irréversible."
 *   confirmLabel="Oui, supprimer"
 *   cancelLabel="Annuler"
 *   confirmVariant="danger"
 *   (confirmed)="onConfirm()"
 *   (cancelled)="onCancel()"
 * />
 * ```
 *
 * ### With Auto-Close
 * ```html
 * <lib-confirm-modal
 *   [isOpen]="showModal"
 *   title="Confirmation"
 *   message="Action confirmée"
 *   [autoClose]="true"
 *   (confirmed)="onConfirm()"
 * />
 * ```
 *
 * @see https://getbootstrap.com/docs/5.3/components/modal/
 * @category Shared UI
 */
@Component({
  selector: 'lib-confirm-modal',
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
  /**
   * Controls the visibility of the modal
   * @default false
   */
  isOpen = input<boolean>(false);

  /**
   * Modal title displayed in the header
   * @default 'Confirmation'
   */
  title = input<string>('Confirmation');

  /**
   * Modal message displayed in the body
   * @default 'Êtes-vous sûr de vouloir continuer ?'
   */
  message = input<string>('Êtes-vous sûr de vouloir continuer ?');

  /**
   * Label for the confirm button
   * @default 'Confirmer'
   */
  confirmLabel = input<string>('Confirmer');

  /**
   * Label for the cancel button
   * @default 'Annuler'
   */
  cancelLabel = input<string>('Annuler');

  /**
   * Bootstrap variant for the confirm button
   * @default 'primary'
   */
  confirmVariant = input<
    'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  >('primary');

  /**
   * Bootstrap variant for the cancel button
   * @default 'secondary'
   */
  cancelVariant = input<
    'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  >('secondary');

  /**
   * Whether to automatically close the modal after confirmation
   * @default false
   */
  autoClose = input<boolean>(false);

  /**
   * Emitted when the user confirms the action
   * @event
   */
  confirmed = output<void>();

  /**
   * Emitted when the user cancels the action
   * @event
   */
  cancelled = output<void>();

  /**
   * Internal signal to track modal visibility state
   * @internal
   */
  #visible = signal<boolean>(false);

  /**
   * Computed visibility state based on isOpen input
   * @computed
   */
  protected visible = computed(() => this.#visible());

  /**
   * Computed CSS classes for the modal backdrop
   * @internal
   */
  protected backdropClasses = computed(() => {
    return this.visible() ? 'modal-backdrop fade show' : '';
  });

  /**
   * Computed CSS classes for the modal dialog
   * @internal
   */
  protected modalClasses = computed(() => {
    return this.visible() ? 'modal fade show' : 'modal fade';
  });

  /**
   * Computed CSS classes for the confirm button
   * @internal
   */
  protected confirmButtonClasses = computed(() => {
    return `btn btn-${this.confirmVariant()}`;
  });

  /**
   * Computed CSS classes for the cancel button
   * @internal
   */
  protected cancelButtonClasses = computed(() => {
    return `btn btn-${this.cancelVariant()}`;
  });

  constructor() {
    // Sync isOpen input with internal visible signal
    effect(() => {
      this.#visible.set(this.isOpen());
    });
  }

  /**
   * Handles the confirm button click
   * @internal
   */
  protected onConfirm(): void {
    this.confirmed.emit();
    if (this.autoClose()) {
      this.#visible.set(false);
    }
  }

  /**
   * Handles the cancel button click
   * @internal
   */
  protected onCancel(): void {
    this.cancelled.emit();
    this.#visible.set(false);
  }

  /**
   * Handles the backdrop click to close the modal
   * @internal
   */
  protected onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }

  /**
   * Handles the ESC key press to close the modal
   * @internal
   */
  protected onEscapeKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Escape' && this.visible()) {
      this.onCancel();
    }
  }
}

