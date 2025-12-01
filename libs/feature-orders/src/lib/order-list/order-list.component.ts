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
import { Order } from '@mini-crm/data-access';
import { ConfirmModalComponent } from '@mini-crm/shared-ui';
import { SpinnerComponent } from '@mini-crm/shared-ui';

/**
 * Order list component for displaying all orders.
 *
 * Smart component that manages order data using OrdersService.
 * Displays orders in a Bootstrap table with actions (edit, delete).
 * Uses ConfirmModal for delete confirmation.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-order-list />
 * ```
 *
 * The component automatically loads orders on initialization.
 *
 * @see OrdersService
 * @see OrderFormComponent
 * @see ConfirmModalComponent
 * @category Feature Orders
 */
@Component({
  selector: 'lib-order-list',
  imports: [CommonModule, ConfirmModalComponent, SpinnerComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);

  /**
   * Order to delete (for confirmation modal)
   * @internal
   */
  #orderToDelete = signal<Order | null>(null);

  /**
   * Orders from service (readonly)
   * @readonly
   */
  readonly orders = computed(() => this.ordersService.orders());

  /**
   * Loading state from service (readonly)
   * @readonly
   */
  readonly loading = computed(() => this.ordersService.loading());

  /**
   * Error state from service (readonly)
   * @readonly
   */
  readonly error = computed(() => this.ordersService.error());

  /**
   * Order to delete (readonly)
   * @readonly
   */
  readonly orderToDelete = computed(() => this.#orderToDelete());

  /**
   * Whether delete confirmation modal is open
   * @computed
   */
  readonly isDeleteModalOpen = computed(() => !!this.#orderToDelete());

  /**
   * Load orders on component initialization
   * @internal
   */
  constructor() {
    effect(() => {
      // Load orders when component is initialized
      this.ordersService.getAll();
    });
  }

  /**
   * Navigates to add order page
   * @internal
   */
  protected onAddOrder(): void {
    this.router.navigate(['/orders/add']);
  }

  /**
   * Navigates to edit order page
   * @internal
   */
  protected onEditOrder(order: Order): void {
    this.router.navigate(['/orders/edit', order.id]);
  }

  /**
   * Opens delete confirmation modal
   * @internal
   */
  protected onDeleteOrder(order: Order): void {
    this.#orderToDelete.set(order);
  }

  /**
   * Handles delete confirmation
   * @internal
   */
  protected onConfirmDelete(): void {
    const order = this.#orderToDelete();
    if (order) {
      this.ordersService.delete(order.id);
      this.#orderToDelete.set(null);
    }
  }

  /**
   * Handles delete cancellation
   * @internal
   */
  protected onCancelDelete(): void {
    this.#orderToDelete.set(null);
  }

  /**
   * Formats number as currency
   * @internal
   */
  protected formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  }
}

