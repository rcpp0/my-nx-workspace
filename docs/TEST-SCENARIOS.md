# Scénarios de Test - Mini CRM

Documentation des scénarios de test pour le projet Mini CRM avec Vitest et Lighthouse CI.

## Table des matières

1. [Tests Unitaires Vitest](#tests-unitaires-vitest)
2. [Tests d'Intégration API](#tests-dintégration-api)
3. [Tests Lighthouse CI](#tests-lighthouse-ci)
4. [Scénarios de Test E2E](#scénarios-de-test-e2e)

---

## Tests Unitaires Vitest

### Configuration

Les tests unitaires utilisent **Vitest** (par défaut dans Angular 20) avec `HttpTestingController` pour mocker les requêtes HTTP.

**Commandes disponibles :**

```bash
# Exécuter tous les tests
npm test

# Mode watch (re-exécution automatique)
npm run test:watch

# Avec couverture de code
npm run test:coverage
```

### Scénarios de Test - AuthService

#### ✅ Initialisation

- [x] Le service devrait être créé
- [x] Les signals devraient être initialisés avec des valeurs par défaut (`token` = `null`, `user` = `null`, `isAuthenticated` = `false`)

#### ✅ Connexion (signIn)

- [x] Devrait authentifier un utilisateur et mettre à jour les signals (`token`, `user`, `isAuthenticated`)
- [x] Devrait retourner un `Observable<AuthResponse>` avec un délai simulé (~500ms)
- [x] Le signal `isAuthenticated` devrait passer à `true` après connexion réussie

#### ✅ Inscription (signUp)

- [x] Devrait créer un compte et mettre à jour les signals
- [x] Devrait retourner un `Observable<AuthResponse>` avec un délai simulé

#### ✅ Déconnexion (logout)

- [x] Devrait réinitialiser les signals (`token` = `null`, `user` = `null`, `isAuthenticated` = `false`)

### Scénarios de Test - OrdersService

#### ✅ Initialisation

- [x] Le service devrait être créé
- [x] Les signals devraient être initialisés (`orders` = `[]`, `loading` = `false`, `error` = `null`)

#### ✅ Chargement des commandes (getAll)

- [x] Devrait charger toutes les commandes depuis l'API (`GET /orders`)
- [x] Devrait mettre à jour le signal `loading` pendant la requête
- [x] Devrait mettre à jour le signal `orders` avec les données reçues
- [x] Ne devrait pas faire de requête si les commandes sont déjà chargées (cache)
- [x] Devrait forcer le rafraîchissement avec `forceRefresh=true`
- [x] Devrait gérer les erreurs HTTP (500, 404, etc.) et mettre à jour le signal `error`

#### ✅ Récupération par ID (getById)

- [x] Devrait retourner une commande par son `id` depuis le cache local
- [x] Devrait retourner `undefined` si la commande n'existe pas

#### ✅ Création de commande (create)

- [x] Devrait calculer automatiquement `totalHt` et `totalTtc` avant l'envoi
  - Formule : `totalHt = nbDays * tjm`
  - Formule : `totalTtc = totalHt * (1 + tauxTva / 100)`
- [x] Devrait envoyer une requête `POST /orders` avec le payload complet
- [x] Devrait rafraîchir automatiquement la liste après création réussie
- [x] Devrait gérer les erreurs HTTP (400, 500, etc.)

#### ✅ Mise à jour de commande (update)

- [x] Devrait recalculer automatiquement `totalHt` et `totalTtc`
- [x] Devrait envoyer une requête `PUT /orders/:id` avec le payload complet
- [x] Devrait rafraîchir automatiquement la liste après mise à jour réussie
- [x] Devrait gérer les erreurs HTTP (404, 500, etc.)

#### ✅ Suppression de commande (delete)

- [x] Devrait envoyer une requête `DELETE /orders/:id`
- [x] Devrait rafraîchir automatiquement la liste après suppression réussie
- [x] Devrait gérer les erreurs HTTP (404, 500, etc.)

#### ✅ Calculs automatiques (calculateTotals)

- [x] Devrait calculer correctement `totalHt` et `totalTtc` avec tauxTva = 20%
- [x] Devrait calculer correctement avec un tauxTva différent (ex: 10%)

### Exemple de Test Vitest

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { OrdersService } from './orders.service';
import { API_CONFIG } from '../config/api.config';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_CONFIG, useValue: { apiUrl: 'http://localhost:3000' } },
      ],
    });

    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes non traitées
  });

  it('devrait charger toutes les commandes', () => {
    const mockOrders = [
      { id: 1, customer: 'Test', nbDays: 5, tjm: 500, tauxTva: 20, totalHt: 2500, totalTtc: 3000 },
    ];

    service.getAll();
    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne('http://localhost:3000/orders');
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);

    expect(service.orders()).toEqual(mockOrders);
    expect(service.loading()).toBe(false);
  });
});
```

---

## Tests d'Intégration API

### Vérification json-server

**Prérequis :** Le fichier `db.json` doit être présent à la racine du projet.

**Commandes :**

```bash
# Démarrer json-server seul
npm run server

# Démarrer json-server avec authentification
npm run server:auth

# Démarrer l'app Angular + json-server en parallèle
npm run dev
```

### Scénarios de Test API

#### ✅ Endpoints Orders

1. **GET /orders**
   - Devrait retourner la liste des commandes depuis `db.json`
   - Vérifier que les 3 commandes d'exemple sont présentes

2. **GET /orders/:id**
   - Devrait retourner une commande spécifique par ID
   - Devrait retourner 404 si l'ID n'existe pas

3. **POST /orders**
   - Devrait créer une nouvelle commande
   - Le body doit contenir : `customer`, `nbDays`, `tjm`, `tauxTva`, `totalHt`, `totalTtc`
   - Devrait retourner la commande créée avec un `id` auto-généré

4. **PUT /orders/:id**
   - Devrait mettre à jour une commande existante
   - Devrait retourner 404 si l'ID n'existe pas

5. **DELETE /orders/:id**
   - Devrait supprimer une commande
   - Devrait retourner 404 si l'ID n'existe pas

#### ✅ Endpoints Auth (json-server-auth)

1. **POST /register**
   - Devrait créer un nouvel utilisateur
   - Body : `{ "email": "user@example.com", "password": "password123" }`
   - Devrait retourner un `accessToken` et les données utilisateur

2. **POST /login**
   - Devrait authentifier un utilisateur existant
   - Body : `{ "email": "user@example.com", "password": "password123" }`
   - Devrait retourner un `accessToken` et les données utilisateur
   - Devrait retourner 401 si les credentials sont incorrects

### Test Manuel avec curl

```bash
# Tester GET /orders
curl http://localhost:3000/orders

# Tester POST /orders
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"customer":"Test Corp","nbDays":5,"tjm":500,"tauxTva":20,"totalHt":2500,"totalTtc":3000}'

# Tester POST /register
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## Tests Lighthouse CI

### Configuration

Le fichier `lighthouserc.json` configure Lighthouse CI pour auditer l'application en production.

**Commandes disponibles :**

```bash
# Audit complet (build + Lighthouse)
npm run audit

# Audit uniquement accessibilité
npm run audit:accessibility

# Audit uniquement performance
npm run audit:performance
```

### Scénarios de Test Lighthouse

#### ✅ Performance

- [x] Score minimum : **80/100** (warning si < 80)
- [x] Métriques vérifiées :
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)
  - Time to Interactive (TTI)
  - Total Blocking Time (TBT)
  - Cumulative Layout Shift (CLS)

#### ✅ Accessibilité

- [x] Score minimum : **90/100** (erreur si < 90)
- [x] Vérifications obligatoires :
  - `color-contrast` : Contraste des couleurs suffisant (erreur si non conforme)
  - `label` : Tous les inputs ont des labels associés (erreur si manquant)
  - `button-name` : Tous les boutons ont un nom accessible (erreur si manquant)
  - `link-name` : Tous les liens ont un nom accessible (erreur si manquant)
  - `image-alt` : Toutes les images ont un attribut `alt` (erreur si manquant)

#### ✅ Best Practices

- [x] Score minimum : **80/100** (warning si < 80)
- [x] Vérifications :
  - HTTPS (en production)
  - Console errors
  - Image optimization
  - Modern JavaScript

#### ✅ SEO

- [x] Score minimum : **90/100** (warning si < 90)
- [x] Vérifications :
  - Meta tags
  - Structured data
  - Mobile-friendly
  - Sitemap

### Exécution des Tests Lighthouse

1. **Build de production :**
   ```bash
   npm run build
   ```

2. **Lancement du serveur statique :**
   ```bash
   npx http-server dist/apps/mini-crm/browser -p 8080
   ```

3. **Exécution de Lighthouse CI :**
   ```bash
   npm run audit
   ```

4. **Vérification des résultats :**
   - Les rapports sont générés dans `.lighthouseci/`
   - Les scores sont comparés aux seuils définis dans `lighthouserc.json`

---

## Scénarios de Test E2E

### Scénarios à implémenter (Playwright/Cypress)

#### ✅ Authentification

1. **Connexion**
   - Accéder à `/auth/sign-in`
   - Remplir le formulaire avec des credentials valides
   - Vérifier la redirection vers `/orders`
   - Vérifier que le token est stocké

2. **Inscription**
   - Accéder à `/auth/sign-up`
   - Remplir le formulaire avec un nouvel email
   - Vérifier la redirection vers `/orders`
   - Vérifier que le token est stocké

3. **Déconnexion**
   - Cliquer sur le bouton de déconnexion
   - Vérifier la redirection vers `/auth/sign-in`
   - Vérifier que le token est supprimé

#### ✅ Gestion des Commandes

1. **Liste des commandes**
   - Accéder à `/orders`
   - Vérifier l'affichage de la liste des commandes
   - Vérifier l'affichage du spinner pendant le chargement
   - Vérifier l'affichage des erreurs si l'API échoue

2. **Création de commande**
   - Cliquer sur "Ajouter une commande"
   - Remplir le formulaire avec des données valides
   - Vérifier le calcul automatique de `totalHt` et `totalTtc`
   - Soumettre le formulaire
   - Vérifier la redirection vers `/orders`
   - Vérifier que la nouvelle commande apparaît dans la liste

3. **Modification de commande**
   - Cliquer sur "Modifier" pour une commande
   - Modifier les données du formulaire
   - Vérifier le recalcul automatique
   - Soumettre le formulaire
   - Vérifier la redirection et la mise à jour dans la liste

4. **Suppression de commande**
   - Cliquer sur "Supprimer" pour une commande
   - Confirmer dans la modal
   - Vérifier la suppression dans la liste

#### ✅ Navigation et Guards

1. **Protection des routes**
   - Accéder à `/orders` sans être authentifié
   - Vérifier la redirection vers `/auth/sign-in`
   - Vérifier la préservation de `returnUrl` dans les query params

2. **Navigation après authentification**
   - Se connecter depuis `/orders` (redirigé vers `/auth/sign-in`)
   - Vérifier la redirection vers `/orders` après connexion

---

## Checklist de Test

### Avant chaque commit

- [ ] Tous les tests Vitest passent (`npm test`)
- [ ] La couverture de code est > 80% (`npm run test:coverage`)
- [ ] Le linter passe sans erreur (`npm run lint`)
- [ ] L'application compile sans erreur (`npm run build`)
- [ ] json-server fonctionne avec `db.json` (`npm run server`)

### Avant chaque release

- [ ] Tous les tests Vitest passent
- [ ] Les tests Lighthouse CI passent (`npm run audit`)
- [ ] Les tests E2E passent (si implémentés)
- [ ] La documentation est à jour
- [ ] Les performances sont acceptables (Lighthouse score > 80)

---

## Ressources

- [Documentation Vitest](https://vitest.dev/)
- [Documentation Angular Testing](https://angular.dev/guide/testing)
- [Documentation Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Documentation json-server](https://github.com/typicode/json-server)
- [Documentation json-server-auth](https://github.com/jeremyben/json-server-auth)

---

**Dernière mise à jour :** 2024-12-19

