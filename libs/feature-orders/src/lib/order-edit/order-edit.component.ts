import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdersService } from '@mini-crm/data-access';
import { UpdateOrder, Order, CreateOrder } from '@mini-crm/data-access';
import { OrderFormComponent } from '../order-form/order-form.component';
import { SpinnerComponent } from '@mini-crm/shared-ui';

/**
 * Order edit component for editing existing orders.
 *
 * Uses OrderFormComponent to display the form and handles order updates.
 * Loads order data based on route parameter and navigates back to order list after successful update or cancellation.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-order-edit />
 * ```
 *
 * The component expects an `id` route parameter and automatically navigates to `/orders` after save or cancel.
 *
 * @see OrderFormComponent
 * @see OrdersService
 * @category Feature Orders
 */
@Component({
  selector: 'lib-order-edit',
  imports: [CommonModule, OrderFormComponent, SpinnerComponent],
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderEditComponent {
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * Current order being edited
   * @internal
   */
  #order = signal<Order | null>(null);

  /**
   * Loading state during update
   * @internal
   */
  #loading = signal(false);

  /**
   * Error message to display
   * @internal
   */
  #error = signal<string | null>(null);

  /**
   * Track if we've initiated an update operation
   * @internal
   */
  #hasInitiatedUpdate = false;

  /**
   * Current order (readonly)
   * @readonly
   */
  readonly order = computed(() => this.#order());

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
   * Load order data on initialization
   * @internal
   */
  constructor() {
    // Load orders first
    this.ordersService.getAll();

    // Get order ID from route and load order
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!orderId) {
      this.#error.set('ID de commande manquant');
      return;
    }

    // Wait for orders to load, then find the order
    effect(() => {
      const orders = this.ordersService.orders();
      const loading = this.ordersService.loading();
      
      if (!loading && orders.length > 0) {
        const order = this.ordersService.getById(orderId);
        if (order) {
          this.#order.set(order);
        } else {
          this.#error.set('Commande non trouvée');
        }
      }
    });

    effect(() => {
      const error = this.ordersService.error();
      if (error) {
        this.#error.set(error);
      }
    });

    effect(() => {
      const loading = this.ordersService.loading();
      this.#loading.set(loading);
      
      // Navigate to list when update is complete and no error
      // Only navigate if we initiated the update operation
      if (
        this.#hasInitiatedUpdate &&
        !loading &&
        !this.ordersService.error() &&
        this.ordersService.orders().length > 0
      ) {
        this.#hasInitiatedUpdate = false;
        this.router.navigate(['/orders']);
      }
    });
  }

  /**
   * Handles form save event
   * @internal
   */
  protected onSave(orderData: CreateOrder | UpdateOrder): void {
    this.#error.set(null);
    this.#hasInitiatedUpdate = true;
    // In edit mode, orderData is always UpdateOrder
    this.ordersService.update(orderData as UpdateOrder);
  }

  /**
   * Handles form cancel event
   * @internal
   */
  protected onCancel(): void {
    this.router.navigate(['/orders']);
  }
}

