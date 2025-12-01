import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { OrdersService } from './orders.service';
import { API_CONFIG } from '../config/api.config';
import { CreateOrder, Order, UpdateOrder } from '../models/order.model';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/orders';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: API_CONFIG,
          useValue: { apiUrl: 'http://localhost:3000' },
        },
      ],
    });

    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Initialisation', () => {
    it('devrait être créé', () => {
      expect(service).toBeTruthy();
    });

    it('devrait initialiser les signals avec des valeurs par défaut', () => {
      expect(service.orders()).toEqual([]);
      expect(service.loading()).toBe(false);
      expect(service.error()).toBeNull();
    });
  });

  describe('getAll', () => {
    it('devrait charger toutes les commandes', () => {
      // Arrange
      const mockOrders: Order[] = [
        {
          id: 1,
          customer: 'Test Corp',
          nbDays: 5,
          tjm: 500,
          tauxTva: 20,
          totalHt: 2500,
          totalTtc: 3000,
        },
        {
          id: 2,
          customer: 'Another Corp',
          nbDays: 10,
          tjm: 600,
          tauxTva: 20,
          totalHt: 6000,
          totalTtc: 7200,
        },
      ];

      // Act
      service.getAll();
      expect(service.loading()).toBe(true);

      // Assert
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockOrders);

      expect(service.orders()).toEqual(mockOrders);
      expect(service.loading()).toBe(false);
      expect(service.error()).toBeNull();
    });

    it('ne devrait pas faire de requête si les commandes sont déjà chargées', () => {
      // Arrange
      const mockOrders: Order[] = [
        {
          id: 1,
          customer: 'Test Corp',
          nbDays: 5,
          tjm: 500,
          tauxTva: 20,
          totalHt: 2500,
          totalTtc: 3000,
        },
      ];

      // Act - Premier chargement
      service.getAll();
      const req1 = httpMock.expectOne(apiUrl);
      req1.flush(mockOrders);

      // Act - Deuxième appel sans forceRefresh
      service.getAll();

      // Assert - Pas de nouvelle requête
      httpMock.expectNone(apiUrl);
    });

    it('devrait forcer le rafraîchissement avec forceRefresh=true', () => {
      // Arrange
      const mockOrders1: Order[] = [
        {
          id: 1,
          customer: 'Test Corp',
          nbDays: 5,
          tjm: 500,
          tauxTva: 20,
          totalHt: 2500,
          totalTtc: 3000,
        },
      ];
      const mockOrders2: Order[] = [
        ...mockOrders1,
        {
          id: 2,
          customer: 'New Corp',
          nbDays: 3,
          tjm: 400,
          tauxTva: 20,
          totalHt: 1200,
          totalTtc: 1440,
        },
      ];

      // Act - Premier chargement
      service.getAll();
      const req1 = httpMock.expectOne(apiUrl);
      req1.flush(mockOrders1);

      // Act - Rafraîchissement forcé
      service.getAll(true);
      expect(service.loading()).toBe(true);

      // Assert
      const req2 = httpMock.expectOne(apiUrl);
      expect(req2.request.method).toBe('GET');
      req2.flush(mockOrders2);

      expect(service.orders()).toEqual(mockOrders2);
      expect(service.loading()).toBe(false);
    });

    it('devrait gérer les erreurs HTTP', () => {
      // Act
      service.getAll();

      // Assert
      const req = httpMock.expectOne(apiUrl);
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(service.error()).toBe(
        'Une erreur est survenue lors du chargement des commandes.',
      );
      expect(service.loading()).toBe(false);
    });
  });

  describe('getById', () => {
    it('devrait retourner une commande par son id', () => {
      // Arrange
      const mockOrders: Order[] = [
        {
          id: 1,
          customer: 'Test Corp',
          nbDays: 5,
          tjm: 500,
          tauxTva: 20,
          totalHt: 2500,
          totalTtc: 3000,
        },
        {
          id: 2,
          customer: 'Another Corp',
          nbDays: 10,
          tjm: 600,
          tauxTva: 20,
          totalHt: 6000,
          totalTtc: 7200,
        },
      ];

      service.orders.set(mockOrders);

      // Act
      const order = service.getById(1);

      // Assert
      expect(order).toEqual(mockOrders[0]);
    });

    it('devrait retourner undefined si la commande n\'existe pas', () => {
      // Arrange
      service.orders.set([]);

      // Act
      const order = service.getById(999);

      // Assert
      expect(order).toBeUndefined();
    });
  });

  describe('create', () => {
    it('devrait créer une commande avec calculs automatiques', () => {
      // Arrange
      const newOrder: CreateOrder = {
        customer: 'New Corp',
        nbDays: 5,
        tjm: 500,
        tauxTva: 20,
      };

      const createdOrder: Order = {
        id: 1,
        ...newOrder,
        totalHt: 2500, // 5 * 500
        totalTtc: 3000, // 2500 * 1.20
      };

      // Act
      service.create(newOrder);
      expect(service.loading()).toBe(true);

      // Assert - Vérifier la requête POST
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        customer: 'New Corp',
        nbDays: 5,
        tjm: 500,
        tauxTva: 20,
        totalHt: 2500,
        totalTtc: 3000,
      });
      req.flush(createdOrder);

      // Assert - Vérifier le rafraîchissement automatique
      const refreshReq = httpMock.expectOne(apiUrl);
      expect(refreshReq.request.method).toBe('GET');
      refreshReq.flush([createdOrder]);

      expect(service.loading()).toBe(false);
      expect(service.error()).toBeNull();
    });

    it('devrait gérer les erreurs lors de la création', () => {
      // Arrange
      const newOrder: CreateOrder = {
        customer: 'New Corp',
        nbDays: 5,
        tjm: 500,
        tauxTva: 20,
      };

      // Act
      service.create(newOrder);

      // Assert
      const req = httpMock.expectOne(apiUrl);
      req.flush('Error', { status: 400, statusText: 'Bad Request' });

      expect(service.error()).toBe(
        'Une erreur est survenue lors de la création de la commande.',
      );
      expect(service.loading()).toBe(false);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour une commande avec calculs automatiques', () => {
      // Arrange
      const updatedOrder: UpdateOrder = {
        id: 1,
        customer: 'Updated Corp',
        nbDays: 10,
        tjm: 600,
        tauxTva: 20,
      };

      const savedOrder: Order = {
        ...updatedOrder,
        totalHt: 6000, // 10 * 600
        totalTtc: 7200, // 6000 * 1.20
      };

      // Act
      service.update(updatedOrder);
      expect(service.loading()).toBe(true);

      // Assert - Vérifier la requête PUT
      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({
        id: 1,
        customer: 'Updated Corp',
        nbDays: 10,
        tjm: 600,
        tauxTva: 20,
        totalHt: 6000,
        totalTtc: 7200,
      });
      req.flush(savedOrder);

      // Assert - Vérifier le rafraîchissement automatique
      const refreshReq = httpMock.expectOne(apiUrl);
      expect(refreshReq.request.method).toBe('GET');
      refreshReq.flush([savedOrder]);

      expect(service.loading()).toBe(false);
      expect(service.error()).toBeNull();
    });

    it('devrait gérer les erreurs lors de la mise à jour', () => {
      // Arrange
      const updatedOrder: UpdateOrder = {
        id: 1,
        customer: 'Updated Corp',
        nbDays: 10,
        tjm: 600,
        tauxTva: 20,
      };

      // Act
      service.update(updatedOrder);

      // Assert
      const req = httpMock.expectOne(`${apiUrl}/1`);
      req.flush('Error', { status: 404, statusText: 'Not Found' });

      expect(service.error()).toBe(
        'Une erreur est survenue lors de la mise à jour de la commande.',
      );
      expect(service.loading()).toBe(false);
    });
  });

  describe('delete', () => {
    it('devrait supprimer une commande et rafraîchir la liste', () => {
      // Act
      service.delete(1);
      expect(service.loading()).toBe(true);

      // Assert - Vérifier la requête DELETE
      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      // Assert - Vérifier le rafraîchissement automatique
      const refreshReq = httpMock.expectOne(apiUrl);
      expect(refreshReq.request.method).toBe('GET');
      refreshReq.flush([]);

      expect(service.loading()).toBe(false);
      expect(service.error()).toBeNull();
    });

    it('devrait gérer les erreurs lors de la suppression', () => {
      // Act
      service.delete(1);

      // Assert
      const req = httpMock.expectOne(`${apiUrl}/1`);
      req.flush('Error', { status: 404, statusText: 'Not Found' });

      expect(service.error()).toBe(
        'Une erreur est survenue lors de la suppression de la commande.',
      );
      expect(service.loading()).toBe(false);
    });
  });

  describe('calculateTotals (privé, testé via create/update)', () => {
    it('devrait calculer correctement totalHt et totalTtc via create', () => {
      // Arrange
      const newOrder: CreateOrder = {
        customer: 'Test',
        nbDays: 5,
        tjm: 650,
        tauxTva: 20,
      };

      // Act
      service.create(newOrder);

      // Assert - Vérifier les calculs dans le body de la requête
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.body.totalHt).toBe(3250); // 5 * 650
      expect(req.request.body.totalTtc).toBe(3900); // 3250 * 1.20
      req.flush({ id: 1, ...req.request.body });

      // Rafraîchissement
      httpMock.expectOne(apiUrl).flush([]);
    });

    it('devrait calculer correctement avec un tauxTva différent', () => {
      // Arrange
      const newOrder: CreateOrder = {
        customer: 'Test',
        nbDays: 3,
        tjm: 600,
        tauxTva: 10, // 10% au lieu de 20%
      };

      // Act
      service.create(newOrder);

      // Assert
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.body.totalHt).toBe(1800); // 3 * 600
      expect(req.request.body.totalTtc).toBe(1980); // 1800 * 1.10
      req.flush({ id: 1, ...req.request.body });

      // Rafraîchissement
      httpMock.expectOne(apiUrl).flush([]);
    });
  });
});

