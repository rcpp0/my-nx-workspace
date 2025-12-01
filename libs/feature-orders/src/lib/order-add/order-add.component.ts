import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdersService } from '@mini-crm/data-access';
import { CreateOrder } from '@mini-crm/data-access';
import { OrderFormComponent } from '../order-form/order-form.component';
import { SpinnerComponent } from '@mini-crm/shared-ui';

/**
 * Order add component for creating new orders.
 *
 * Uses OrderFormComponent to display the form and handles order creation.
 * Navigates back to order list after successful creation or cancellation.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-order-add />
 * ```
 *
 * The component automatically navigates to `/orders` after save or cancel.
 *
 * @see OrderFormComponent
 * @see OrdersService
 * @category Feature Orders
 */
@Component({
  selector: 'lib-order-add',
  imports: [CommonModule, OrderFormComponent, SpinnerComponent],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderAddComponent {
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);

  /**
   * Loading state during creation
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
   * Service loading state (readonly)
   * @readonly
   */
  readonly serviceLoading = computed(() => this.ordersService.loading());

  /**
   * Service error state (readonly)
   * @readonly
   */
  readonly serviceError = computed(() => this.ordersService.error());

  /**
   * Track if we've initiated a create operation
   * @internal
   */
  #hasInitiatedCreate = false;

  /**
   * Subscribe to service error changes
   * @internal
   */
  constructor() {
    effect(() => {
      const error = this.ordersService.error();
      if (error) {
        this.#error.set(error);
      }
    });

    effect(() => {
      const loading = this.ordersService.loading();
      this.#loading.set(loading);
      
      // Navigate to list when creation is complete and no error
      // Only navigate if we initiated the create operation
      if (
        this.#hasInitiatedCreate &&
        !loading &&
        !this.ordersService.error() &&
        this.ordersService.orders().length > 0
      ) {
        this.#hasInitiatedCreate = false;
        this.router.navigate(['/orders']);
      }
    });
  }

  /**
   * Handles form save event
   * @internal
   */
  protected onSave(orderData: CreateOrder): void {
    this.#error.set(null);
    this.#hasInitiatedCreate = true;
    this.ordersService.create(orderData);
  }

  /**
   * Handles form cancel event
   * @internal
   */
  protected onCancel(): void {
    this.router.navigate(['/orders']);
  }
}

