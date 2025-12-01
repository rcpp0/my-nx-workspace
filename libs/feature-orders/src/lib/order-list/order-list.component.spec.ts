import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { OrderListComponent } from './order-list.component';
import { OrdersService } from '@mini-crm/data-access';
import { Order } from '@mini-crm/data-access';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let ordersService: OrdersService;

  const mockOrders: Order[] = [
    {
      id: 1,
      customer: 'Client 1',
      nbDays: 5,
      tjm: 500,
      tauxTva: 20,
      totalHt: 2500,
      totalTtc: 3000,
    },
    {
      id: 2,
      customer: 'Client 2',
      nbDays: 3,
      tjm: 400,
      tauxTva: 20,
      totalHt: 1200,
      totalTtc: 1440,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderListComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: OrdersService,
          useValue: {
            orders: vi.fn(() => mockOrders),
            loading: vi.fn(() => false),
            error: vi.fn(() => null),
            getAll: vi.fn(),
            delete: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll on initialization', () => {
    expect(ordersService.getAll).toHaveBeenCalled();
  });

  it('should display orders from service', () => {
    expect(component.orders().length).toBe(2);
  });

  it('should open delete modal when onDeleteOrder is called', () => {
    const order = mockOrders[0];
    component.onDeleteOrder(order);

    expect(component.orderToDelete()).toBe(order);
    expect(component.isDeleteModalOpen()).toBe(true);
  });

  it('should close delete modal when onCancelDelete is called', () => {
    component.onDeleteOrder(mockOrders[0]);
    component.onCancelDelete();

    expect(component.orderToDelete()).toBeNull();
    expect(component.isDeleteModalOpen()).toBe(false);
  });

  it('should call delete service when onConfirmDelete is called', () => {
    const order = mockOrders[0];
    component.onDeleteOrder(order);
    component.onConfirmDelete();

    expect(ordersService.delete).toHaveBeenCalledWith(order.id);
    expect(component.orderToDelete()).toBeNull();
  });

  it('should format currency correctly', () => {
    const formatted = component.formatCurrency(1234.56);
    expect(formatted).toContain('1');
    expect(formatted).toContain('234');
  });
});

