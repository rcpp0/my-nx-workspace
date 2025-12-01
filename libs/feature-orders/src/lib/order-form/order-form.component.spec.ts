import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './order-form.component';
import { Order } from '@mini-crm/data-access';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFormComponent, ReactiveFormsModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
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
      customer: 'Test Client',
      nbDays: 5,
      tjm: 500,
      tauxTva: 20,
    });

    expect(component.form.valid).toBe(true);
  });

  it('should calculate totalHt correctly', () => {
    component.form.patchValue({
      nbDays: 5,
      tjm: 500,
    });

    expect(component.totalHt()).toBe(2500);
  });

  it('should calculate totalTtc correctly', () => {
    component.form.patchValue({
      nbDays: 5,
      tjm: 500,
      tauxTva: 20,
    });

    expect(component.totalTtc()).toBe(3000);
  });

  it('should patch form when order input is set', async () => {
    const order: Order = {
      id: 1,
      customer: 'Test Client',
      nbDays: 5,
      tjm: 500,
      tauxTva: 20,
      totalHt: 2500,
      totalTtc: 3000,
    };

    fixture.componentRef.setInput('order', order);
    await fixture.whenStable();

    expect(component.form.value.customer).toBe('Test Client');
    expect(component.form.value.nbDays).toBe(5);
    expect(component.form.value.tjm).toBe(500);
    expect(component.form.value.tauxTva).toBe(20);
  });

  it('should emit save event with CreateOrder when order is null', () => {
    const saveSpy = vi.fn();
    component.save.subscribe(saveSpy);

    component.form.patchValue({
      customer: 'New Client',
      nbDays: 3,
      tjm: 400,
      tauxTva: 20,
    });

    component.onSubmit();

    expect(saveSpy).toHaveBeenCalledWith({
      customer: 'New Client',
      nbDays: 3,
      tjm: 400,
      tauxTva: 20,
    });
  });

  it('should emit save event with UpdateOrder when order is set', async () => {
    const order: Order = {
      id: 1,
      customer: 'Test Client',
      nbDays: 5,
      tjm: 500,
      tauxTva: 20,
      totalHt: 2500,
      totalTtc: 3000,
    };

    fixture.componentRef.setInput('order', order);
    await fixture.whenStable();

    const saveSpy = vi.fn();
    component.save.subscribe(saveSpy);

    component.form.patchValue({
      customer: 'Updated Client',
    });

    component.onSubmit();

    expect(saveSpy).toHaveBeenCalledWith({
      id: 1,
      customer: 'Updated Client',
      nbDays: 5,
      tjm: 500,
      tauxTva: 20,
    });
  });

  it('should emit cancel event when cancel is clicked', () => {
    const cancelSpy = vi.fn();
    component.cancel.subscribe(cancelSpy);

    component.onCancel();

    expect(cancelSpy).toHaveBeenCalled();
  });
});

