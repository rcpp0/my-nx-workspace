import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { OrderEditComponent } from './order-edit.component';
import { OrdersService } from '@mini-crm/data-access';
import { UpdateOrder, Order } from '@mini-crm/data-access';

describe('OrderEditComponent', () => {
  let component: OrderEditComponent;
  let fixture: ComponentFixture<OrderEditComponent>;
  let ordersService: OrdersService;
  let route: ActivatedRoute;

  const mockOrder: Order = {
    id: 1,
    customer: 'Test Client',
    nbDays: 5,
    tjm: 500,
    tauxTva: 20,
    totalHt: 2500,
    totalTtc: 3000,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderEditComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: vi.fn(() => '1'),
              },
            },
          },
        },
        {
          provide: OrdersService,
          useValue: {
            loading: vi.fn(() => false),
            error: vi.fn(() => null),
            orders: vi.fn(() => [mockOrder]),
            getById: vi.fn((id) => (id === 1 ? mockOrder : undefined)),
            getAll: vi.fn(),
            update: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderEditComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    route = TestBed.inject(ActivatedRoute);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load order on initialization', () => {
    expect(ordersService.getAll).toHaveBeenCalled();
  });

  it('should call update service when onSave is called', () => {
    const orderData: UpdateOrder = {
      id: 1,
      customer: 'Updated Client',
      nbDays: 5,
      tjm: 500,
      tauxTva: 20,
    };

    component.onSave(orderData);

    expect(ordersService.update).toHaveBeenCalledWith(orderData);
  });
});

