import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { OrderAddComponent } from './order-add.component';
import { OrdersService } from '@mini-crm/data-access';
import { CreateOrder } from '@mini-crm/data-access';

describe('OrderAddComponent', () => {
  let component: OrderAddComponent;
  let fixture: ComponentFixture<OrderAddComponent>;
  let ordersService: OrdersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAddComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: OrdersService,
          useValue: {
            loading: vi.fn(() => false),
            error: vi.fn(() => null),
            orders: vi.fn(() => []),
            create: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAddComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create service when onSave is called', () => {
    const orderData: CreateOrder = {
      customer: 'Test Client',
      nbDays: 5,
      tjm: 500,
      tauxTva: 20,
    };

    component.onSave(orderData);

    expect(ordersService.create).toHaveBeenCalledWith(orderData);
  });
});

