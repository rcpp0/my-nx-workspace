import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default isOpen false', () => {
    expect(component.isOpen()).toBe(false);
  });

  it('should have default title "Confirmation"', () => {
    expect(component.title()).toBe('Confirmation');
  });

  it('should have default message', () => {
    expect(component.message()).toBe('Êtes-vous sûr de vouloir continuer ?');
  });

  it('should have default confirmLabel "Confirmer"', () => {
    expect(component.confirmLabel()).toBe('Confirmer');
  });

  it('should have default cancelLabel "Annuler"', () => {
    expect(component.cancelLabel()).toBe('Annuler');
  });

  it('should have default confirmVariant "primary"', () => {
    expect(component.confirmVariant()).toBe('primary');
  });

  it('should have default cancelVariant "secondary"', () => {
    expect(component.cancelVariant()).toBe('secondary');
  });

  it('should have default autoClose false', () => {
    expect(component.autoClose()).toBe(false);
  });

  it('should show modal when isOpen is true', async () => {
    fixture.componentRef.setInput('isOpen', true);
    await fixture.whenStable();

    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal).toBeTruthy();
    expect(modal.classList.contains('show')).toBe(true);
  });

  it('should hide modal when isOpen is false', async () => {
    fixture.componentRef.setInput('isOpen', true);
    await fixture.whenStable();

    fixture.componentRef.setInput('isOpen', false);
    await fixture.whenStable();

    const modal = fixture.nativeElement.querySelector('.modal.show');
    expect(modal).toBeFalsy();
  });

  it('should display custom title', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('title', 'Custom Title');
    await fixture.whenStable();

    const titleElement = fixture.nativeElement.querySelector('.modal-title');
    expect(titleElement.textContent.trim()).toBe('Custom Title');
  });

  it('should display custom message', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('message', 'Custom message');
    await fixture.whenStable();

    const messageElement = fixture.nativeElement.querySelector('.modal-body p');
    expect(messageElement.textContent.trim()).toBe('Custom message');
  });

  it('should emit confirmed event when confirm button is clicked', async () => {
    fixture.componentRef.setInput('isOpen', true);
    await fixture.whenStable();

    const confirmedSpy = vi.fn();
    component.confirmed.subscribe(confirmedSpy);

    const confirmButton = fixture.nativeElement.querySelector(
      '.modal-footer button:last-child'
    );
    confirmButton.click();
    await fixture.whenStable();

    expect(confirmedSpy).toHaveBeenCalled();
  });

  it('should emit cancelled event when cancel button is clicked', async () => {
    fixture.componentRef.setInput('isOpen', true);
    await fixture.whenStable();

    const cancelledSpy = vi.fn();
    component.cancelled.subscribe(cancelledSpy);

    const cancelButton = fixture.nativeElement.querySelector(
      '.modal-footer button:first-child'
    );
    cancelButton.click();
    await fixture.whenStable();

    expect(cancelledSpy).toHaveBeenCalled();
  });

  it('should close modal when cancel button is clicked', async () => {
    fixture.componentRef.setInput('isOpen', true);
    await fixture.whenStable();

    const cancelButton = fixture.nativeElement.querySelector(
      '.modal-footer button:first-child'
    );
    cancelButton.click();
    await fixture.whenStable();

    const modal = fixture.nativeElement.querySelector('.modal.show');
    expect(modal).toBeFalsy();
  });

  it('should apply correct variant classes to confirm button', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('confirmVariant', 'danger');
    await fixture.whenStable();

    const confirmButton = fixture.nativeElement.querySelector(
      '.modal-footer button:last-child'
    );
    expect(confirmButton.classList.contains('btn-danger')).toBe(true);
  });

  it('should apply correct variant classes to cancel button', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('cancelVariant', 'warning');
    await fixture.whenStable();

    const cancelButton = fixture.nativeElement.querySelector(
      '.modal-footer button:first-child'
    );
    expect(cancelButton.classList.contains('btn-warning')).toBe(true);
  });

  it('should auto-close when autoClose is true and confirmed', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('autoClose', true);
    await fixture.whenStable();

    const confirmButton = fixture.nativeElement.querySelector(
      '.modal-footer button:last-child'
    );
    confirmButton.click();
    await fixture.whenStable();

    const modal = fixture.nativeElement.querySelector('.modal.show');
    expect(modal).toBeFalsy();
  });

  it('should not auto-close when autoClose is false and confirmed', async () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('autoClose', false);
    await fixture.whenStable();

    const confirmButton = fixture.nativeElement.querySelector(
      '.modal-footer button:last-child'
    );
    confirmButton.click();
    await fixture.whenStable();

    // Modal should still be visible (unless parent closes it)
    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal).toBeTruthy();
  });
});

