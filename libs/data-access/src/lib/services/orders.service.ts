import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { CreateOrder, Order, UpdateOrder } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(API_CONFIG);
  private readonly apiUrl = `${this.config.apiUrl}/orders`;

  readonly orders = signal<Order[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  getAll(forceRefresh = false) {
    if (!forceRefresh && this.orders().length > 0) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<Order[]>(this.apiUrl)
      .pipe(
        tap((orders) => this.orders.set(orders)),
        catchError((err) => {
          this.error.set(
            'Une erreur est survenue lors du chargement des commandes.',
          );
          return throwError(() => err);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe();
  }

  getById(id: number): Order | undefined {
    return this.orders().find((order) => order.id === id);
  }

  create(orderData: CreateOrder) {
    const { totalHt, totalTtc } = this.calculateTotals(orderData);
    const payload: Omit<Order, 'id'> = {
      ...orderData,
      totalHt,
      totalTtc,
    };

    this.loading.set(true);
    this.error.set(null);

    this.http
      .post<Order>(this.apiUrl, payload)
      .pipe(
        tap(() => this.getAll(true)),
        catchError((err) => {
          this.error.set(
            'Une erreur est survenue lors de la création de la commande.',
          );
          return throwError(() => err);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe();
  }

  update(orderData: UpdateOrder) {
    const { totalHt, totalTtc } = this.calculateTotals(orderData);
    const payload: Order = {
      ...orderData,
      totalHt,
      totalTtc,
    };

    this.loading.set(true);
    this.error.set(null);

    this.http
      .put<Order>(`${this.apiUrl}/${orderData.id}`, payload)
      .pipe(
        tap(() => this.getAll(true)),
        catchError((err) => {
          this.error.set(
            'Une erreur est survenue lors de la mise à jour de la commande.',
          );
          return throwError(() => err);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe();
  }

  delete(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.getAll(true)),
        catchError((err) => {
          this.error.set(
            'Une erreur est survenue lors de la suppression de la commande.',
          );
          return throwError(() => err);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe();
  }

  private calculateTotals(
    data: Pick<Order, 'nbDays' | 'tjm' | 'tauxTva'>,
  ): { totalHt: number; totalTtc: number } {
    const totalHt = data.nbDays * data.tjm;
    const totalTtc = totalHt * (1 + data.tauxTva / 100);
    return { totalHt, totalTtc };
  }
}


