import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size "md"', () => {
    expect(component.size()).toBe('md');
  });

  it('should have default variant "primary"', () => {
    expect(component.variant()).toBe('primary');
  });

  it('should have default ariaLabel "Chargement..."', () => {
    expect(component.ariaLabel()).toBe('Chargement...');
  });

  it('should apply size class when size is "sm"', () => {
    fixture.componentRef.setInput('size', 'sm');
    await fixture.whenStable();

    const spinnerElement = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinnerElement.classList.contains('spinner-border-sm')).toBe(true);
  });

  it('should apply size class when size is "lg"', () => {
    fixture.componentRef.setInput('size', 'lg');
    await fixture.whenStable();

    const spinnerElement = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinnerElement.classList.contains('spinner-border-lg')).toBe(true);
    expect(spinnerElement.classList.contains('spinner-border')).toBe(true);
  });

  it('should apply variant class when variant is "danger"', () => {
    fixture.componentRef.setInput('variant', 'danger');
    await fixture.whenStable();

    const spinnerElement = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinnerElement.classList.contains('text-danger')).toBe(true);
  });

  it('should set aria-label attribute', () => {
    fixture.componentRef.setInput('ariaLabel', 'Loading data...');
    await fixture.whenStable();

    const spinnerElement = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinnerElement.getAttribute('aria-label')).toBe('Loading data...');
  });

  it('should have visually-hidden text for accessibility', () => {
    const hiddenText = fixture.nativeElement.querySelector('.visually-hidden');
    expect(hiddenText).toBeTruthy();
    expect(hiddenText.textContent).toBe('Chargement...');
  });
});

