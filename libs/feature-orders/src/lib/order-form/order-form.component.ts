import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  output,
  computed,
  effect,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Order, CreateOrder, UpdateOrder } from '@mini-crm/data-access';

/**
 * Reusable order form component.
 *
 * Displays a form for creating or editing an order.
 * Automatically calculates totalHt and totalTtc based on nbDays, tjm, and tauxTva.
 *
 * @usageNotes
 * ### Basic Usage (Create Mode)
 * ```html
 * <lib-order-form (save)="onSave($event)" (cancel)="onCancel()" />
 * ```
 *
 * ### Edit Mode
 * ```html
 * <lib-order-form
 *   [order]="selectedOrder"
 *   (save)="onSave($event)"
 *   (cancel)="onCancel()"
 * />
 * ```
 *
 * @see OrderListComponent
 * @see OrderAddComponent
 * @see OrderEditComponent
 * @category Feature Orders
 */
@Component({
  selector: 'lib-order-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  private readonly fb = inject(FormBuilder);

  /**
   * Order to edit (null for create mode)
   * @default null
   */
  order = input<Order | null>(null);

  /**
   * Emitted when form is submitted with valid data
   * @event
   * @param orderData - Order data (CreateOrder or UpdateOrder)
   */
  save = output<CreateOrder | UpdateOrder>();

  /**
   * Emitted when cancel button is clicked
   * @event
   */
  cancel = output<void>();

  /**
   * Reactive form for order
   * @internal
   */
  readonly form = this.fb.nonNullable.group({
    customer: ['', [Validators.required, Validators.minLength(2)]],
    nbDays: [1, [Validators.required, Validators.min(1)]],
    tjm: [0, [Validators.required, Validators.min(0)]],
    tauxTva: [20, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  /**
   * Computed total HT (totalHt = nbDays * tjm)
   * @computed
   */
  readonly totalHt = computed(() => {
    const nbDays = this.form.value.nbDays ?? 0;
    const tjm = this.form.value.tjm ?? 0;
    return nbDays * tjm;
  });

  /**
   * Computed total TTC (totalTtc = totalHt * (1 + tauxTva / 100))
   * @computed
   */
  readonly totalTtc = computed(() => {
    const totalHt = this.totalHt();
    const tauxTva = this.form.value.tauxTva ?? 0;
    return totalHt * (1 + tauxTva / 100);
  });

  /**
   * Effect to patch form when order input changes
   * @internal
   */
  constructor() {
    effect(() => {
      const orderValue = this.order();
      if (orderValue) {
        this.form.patchValue({
          customer: orderValue.customer,
          nbDays: orderValue.nbDays,
          tjm: orderValue.tjm,
          tauxTva: orderValue.tauxTva,
        });
      } else {
        this.form.reset({
          customer: '',
          nbDays: 1,
          tjm: 0,
          tauxTva: 20,
        });
      }
    });
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

    const formValue = this.form.value;
    const orderValue = this.order();

    if (orderValue) {
      // Edit mode
      const updateData: UpdateOrder = {
        id: orderValue.id,
        customer: formValue.customer!,
        nbDays: formValue.nbDays!,
        tjm: formValue.tjm!,
        tauxTva: formValue.tauxTva!,
      };
      this.save.emit(updateData);
    } else {
      // Create mode
      const createData: CreateOrder = {
        customer: formValue.customer!,
        nbDays: formValue.nbDays!,
        tjm: formValue.tjm!,
        tauxTva: formValue.tauxTva!,
      };
      this.save.emit(createData);
    }
  }

  /**
   * Handles cancel action
   * @internal
   */
  protected onCancel(): void {
    this.cancel.emit();
  }

  /**
   * Gets error message for customer field
   * @internal
   */
  protected getCustomerError(): string | null {
    const customerControl = this.form.get('customer');
    if (customerControl?.hasError('required') && customerControl.touched) {
      return 'Le client est requis';
    }
    if (customerControl?.hasError('minlength') && customerControl.touched) {
      return 'Le nom du client doit contenir au moins 2 caractères';
    }
    return null;
  }

  /**
   * Gets error message for nbDays field
   * @internal
   */
  protected getNbDaysError(): string | null {
    const nbDaysControl = this.form.get('nbDays');
    if (nbDaysControl?.hasError('required') && nbDaysControl.touched) {
      return 'Le nombre de jours est requis';
    }
    if (nbDaysControl?.hasError('min') && nbDaysControl.touched) {
      return 'Le nombre de jours doit être au moins 1';
    }
    return null;
  }

  /**
   * Gets error message for tjm field
   * @internal
   */
  protected getTjmError(): string | null {
    const tjmControl = this.form.get('tjm');
    if (tjmControl?.hasError('required') && tjmControl.touched) {
      return 'Le TJM est requis';
    }
    if (tjmControl?.hasError('min') && tjmControl.touched) {
      return 'Le TJM doit être positif';
    }
    return null;
  }

  /**
   * Gets error message for tauxTva field
   * @internal
   */
  protected getTauxTvaError(): string | null {
    const tauxTvaControl = this.form.get('tauxTva');
    if (tauxTvaControl?.hasError('required') && tauxTvaControl.touched) {
      return 'Le taux de TVA est requis';
    }
    if (tauxTvaControl?.hasError('min') && tauxTvaControl.touched) {
      return 'Le taux de TVA doit être positif';
    }
    if (tauxTvaControl?.hasError('max') && tauxTvaControl.touched) {
      return 'Le taux de TVA ne peut pas dépasser 100%';
    }
    return null;
  }
}

