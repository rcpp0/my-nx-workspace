import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureOrders } from './feature-orders';

describe('FeatureOrders', () => {
  let component: FeatureOrders;
  let fixture: ComponentFixture<FeatureOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
