# Mini CRM - Angular Training Starter

## INSTRUCTIONS IMPORTANTES

⚠️ **Avant de coder, utilise le MCP Angular configuré dans .cursor pour récupérer les best practices Angular 20.**
⚠️ **Respecte les rules Cursor configurées dans le projet (.cursor/rules/).**
⚠️ **Respecte SCRUPULEUSEMENT ces instructions sans rien inventer.**
⚠️ **Utilise les composants Bootstrap 5 autant que possible.**
⚠️ **Ne crée AUCUN fichier ou composant non spécifié dans ce prompt.**
⚠️ **Suis EXACTEMENT la structure de dossiers indiquée.**
⚠️ **TOUS les composants dans les libs (`libs/`) doivent utiliser le préfixe `lib-` pour leur selector (ex: `lib-spinner`, `lib-layout`, `lib-order-list`).**
⚠️ **Tout doit compiler et fonctionner immédiatement.**

---

## Contexte

Application Angular 20 existante créée avec Angular CLI. Créer un starter pour formation avec :

- Authentification préparée mais NON connectée à json-server-auth (à compléter en formation)
- Gestion de commandes 100% fonctionnelle avec json-server

---

## 1. Configuration Nx (nx.json et project.json)

**IMPORTANT** : Ce projet utilise Nx, donc on configure `nx.json` pour les generators globaux.

### A. Configuration globale (nx.json)

**Les generators sont déjà configurés dans `nx.json` avec :**

- SCSS par défaut pour apps et libs
- Vitest par défaut pour les tests
- **OnPush par défaut pour tous les composants**

Si ce n'est pas déjà fait, vérifier que `nx.json` contient :

```json
"generators": {
  "@nx/angular:application": {
    "e2eTestRunner": "none",
    "linter": "eslint",
    "style": "scss",
    "unitTestRunner": "vitest"
  },
  "@nx/angular:library": {
    "style": "scss",
    "unitTestRunner": "vitest"
  },
  "@nx/angular:component": {
    "changeDetection": "OnPush",
    "style": "scss"
  }
}
```

### B. Configuration de l'app (apps/mini-crm/project.json)

Dans `targets > build > options > styles` :

- node_modules/bootstrap/dist/css/bootstrap.min.css
- node_modules/bootstrap-icons/font/bootstrap-icons.css
- src/styles.scss

Dans `targets > build > options > scripts` (si nécessaire) :

- node_modules/bootstrap/dist/js/bootstrap.bundle.min.js

**Note** : Avec Nx, les styles sont généralement dans `src/styles.scss` et importés automatiquement.

---

## 1bis. Configuration ESLint - Contraintes de Dépendances Nx

**✅ DÉJÀ CONFIGURÉ** : Les contraintes de dépendances sont déjà en place dans `eslint.config.mjs`.

### Vérification de la configuration

Le fichier `eslint.config.mjs` (racine) contient les contraintes suivantes :

```javascript
depConstraints: [
  // L'app peut importer features, data-access et ui
  {
    sourceTag: 'type:app',
    onlyDependOnLibsWithTags: ['type:feature', 'type:data-access', 'type:ui'],
  },
  // Les features : data-access et ui (PAS d'autres features !)
  {
    sourceTag: 'type:feature',
    onlyDependOnLibsWithTags: ['type:data-access', 'type:ui'],
  },
  // ui peut importer data-access
  {
    sourceTag: 'type:ui',
    onlyDependOnLibsWithTags: ['type:data-access'],
  },
  // data-access ne peut rien importer
  {
    sourceTag: 'type:data-access',
    onlyDependOnLibsWithTags: [],
  },
];
```

**Ces règles garantissent :**

- ✅ L'app peut importer n'importe quelle lib
- ✅ Les features ne peuvent PAS importer d'autres features (évite le couplage)
- ✅ Les libs UI peuvent utiliser data-access
- ✅ Les libs data-access sont à la base (n'importent rien)

### Ajouter les tags dans project.json

**Pour chaque lib et app créée, ajouter les tags appropriés :**

```json
// apps/mini-crm/project.json
{
  "name": "mini-crm",
  "tags": ["type:app", "scope:mini-crm"]
}

// libs/shared-ui/project.json
{
  "name": "shared-ui",
  "tags": ["type:ui"]
}

// libs/data-access/project.json
{
  "name": "data-access",
  "tags": ["type:data-access"]
}

// libs/feature-auth/project.json
{
  "name": "feature-auth",
  "tags": ["type:feature", "scope:auth"]
}

// libs/feature-orders/project.json
{
  "name": "feature-orders",
  "tags": ["type:feature", "scope:orders"]
}

// libs/layout/project.json
{
  "name": "layout",
  "tags": ["type:ui"]
}
```

### Vérification

Après configuration, vérifier que les contraintes sont respectées :

```bash
npx nx lint mini-crm
```

---

## 2. Dépendances à installer

### Bootstrap et Bootstrap Icons

```bash
npm install bootstrap bootstrap-icons
```

### json-server (version exacte 0.17.4)

Consulter la documentation officielle : https://www.npmjs.com/package/json-server

```bash
npm install json-server@0.17.4 --save-dev
```

### json-server-auth (version exacte 2.1.0)

Consulter la documentation officielle : https://www.npmjs.com/package/json-server-auth?activeTab=readme

```bash
npm install json-server-auth@2.1.0 --save-dev
```

### Types Bootstrap (pour TypeScript)

```bash
npm install @types/bootstrap --save-dev
```

### Concurrently (pour lancer app + API en parallèle)

```bash
npm install concurrently --save-dev
```

### Scripts package.json

✅ **DÉJÀ CONFIGURÉS** : Les scripts suivants sont déjà en place dans `package.json`. Aucune modification nécessaire.

Vous pouvez vérifier que `package.json` contient bien :

```json
{
  "scripts": {
    "ng": "ng",
    "start": "nx serve mini-crm",
    "build": "nx build mini-crm",
    "watch": "nx build mini-crm --watch --configuration development",
    "test": "nx test mini-crm",
    "test:watch": "nx test mini-crm --watch",
    "test:coverage": "nx test mini-crm --coverage",
    "lint": "nx lint mini-crm",
    "server": "json-server --watch db.json --port 3000",
    "server:auth": "json-server-auth db.json --port 3000",
    "dev": "concurrently \"npm start\" \"npm run server\"",
    "graph": "nx graph",
    "graph:app": "nx graph --focus=mini-crm",
    "graph:affected": "nx graph --affected",
    "graph:ui": "nx graph --focus=shared-ui",
    "graph:data": "nx graph --focus=data-access",
    "graph:feature-auth": "nx graph --focus=feature-auth",
    "graph:feature-orders": "nx graph --focus=feature-orders",
    "graph:layout": "nx graph --focus=layout",
    "graph:libs": "nx graph --exclude=mini-crm",
    "graph:show": "nx show project mini-crm --web"
  }
}
```

---

## 3. Fichier db.json

Créer à la racine du projet.

```json
{
  "users": [],
  "orders": [
    {
      "id": 1,
      "customer": "Acme Corp",
      "nbDays": 5,
      "tjm": 650,
      "tauxTva": 20,
      "totalHt": 3250,
      "totalTtc": 3900
    },
    {
      "id": 2,
      "customer": "Tech Solutions",
      "nbDays": 10,
      "tjm": 700,
      "tauxTva": 20,
      "totalHt": 7000,
      "totalTtc": 8400
    },
    {
      "id": 3,
      "customer": "Digital Agency",
      "nbDays": 3,
      "tjm": 600,
      "tauxTva": 20,
      "totalHt": 1800,
      "totalTtc": 2160
    }
  ]
}
```

---

## 4. Structure Nx (libs et apps)

**IMPORTANT** : Ce projet utilise Nx avec une structure monorepo. Créer d'abord les libs Nx, puis organiser le code dedans.

### Étape 1 : Créer les libs Nx

```bash
# Lib UI partagée
npx nx g @nx/angular:library shared-ui --unitTestRunner=vitest

# Lib data-access
npx nx g @nx/angular:library data-access --unitTestRunner=vitest

# Lib feature-auth
npx nx g @nx/angular:library feature-auth --unitTestRunner=vitest

# Lib feature-orders
npx nx g @nx/angular:library feature-orders --unitTestRunner=vitest

# Lib layout (pour le layout system)
npx nx g @nx/angular:library layout --unitTestRunner=vitest
```

Nx génère automatiquement :

- Les alias TypeScript (`@mini-crm/shared-ui`, etc.)
- Le `project.json` pour chaque lib
- La structure de base dans `libs/`

### Étape 1bis : Configuration multi-environnement (API_CONFIG)

**⚠️ IMPORTANT** : Avant de créer les services API, configurer le système de configuration multi-environnement avec InjectionToken (voir `.cursor/rules/environments.mdc` pour les détails).

#### 1. Créer le token API_CONFIG dans data-access

**Fichier** : `libs/data-access/src/lib/config/api.config.ts`

```typescript
import { InjectionToken } from '@angular/core';

export interface ApiConfig {
  apiUrl: string;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');
```

#### 2. Exporter dans le barrel export de data-access

**Fichier** : `libs/data-access/src/index.ts`

```typescript
// Exporter le token (AVANT les services qui l'utilisent)
export * from './lib/config/api.config';
```

#### 3. Créer les fichiers environment dans l'app

**Fichier** : `apps/mini-crm/src/environments/environment.ts` (dev)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
};
```

**Fichier** : `apps/mini-crm/src/environments/environment.prod.ts` (prod)

```typescript
export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000', // Changer en production
};
```

#### 4. Configurer le provider dans app.config.ts

**Fichier** : `apps/mini-crm/src/app/app.config.ts`

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { API_CONFIG } from '@mini-crm/data-access';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    // ✅ Fournir la configuration API
    { provide: API_CONFIG, useValue: { apiUrl: environment.apiUrl } },
  ],
};
```

#### 5. Configurer fileReplacements dans project.json

**Fichier** : `apps/mini-crm/project.json`

Dans `targets > build > configurations > production`, ajouter :

```json
"fileReplacements": [
  {
    "replace": "apps/mini-crm/src/environments/environment.ts",
    "with": "apps/mini-crm/src/environments/environment.prod.ts"
  }
]
```

**Résultat** : Les services pourront utiliser `inject(API_CONFIG)` pour obtenir l'URL de l'API.

### Étape 2 : Structure dans les libs

```
libs/
├── shared-ui/
│   └── src/
│       └── lib/
│           ├── spinner/
│           │   ├── spinner.component.ts
│           │   └── spinner.component.scss
│           └── confirm-modal/
│               ├── confirm-modal.component.ts
│               ├── confirm-modal.component.html
│               └── confirm-modal.component.scss
├── data-access/
│   └── src/
│       └── lib/
│           ├── models/
│           │   ├── auth.model.ts
│           │   └── order.model.ts
│           └── services/
│               ├── auth.service.ts
│               └── orders.service.ts
├── feature-auth/
│   └── src/
│       └── lib/
│           ├── components/
│           │   ├── sign-in.component.ts
│           │   ├── sign-in.component.html
│           │   ├── sign-in.component.scss
│           │   ├── sign-up.component.ts
│           │   ├── sign-up.component.html
│           │   └── sign-up.component.scss
│           ├── guards/
│           │   └── auth.guard.ts
│           ├── interceptors/
│           │   └── auth.interceptor.ts
│           └── auth.routes.ts
├── feature-orders/
│   └── src/
│       └── lib/
│           ├── components/
│           │   ├── order-list.component.ts
│           │   ├── order-list.component.html
│           │   ├── order-list.component.scss
│           │   ├── order-add.component.ts
│           │   ├── order-add.component.html
│           │   ├── order-add.component.scss
│           │   ├── order-edit.component.ts
│           │   ├── order-edit.component.html
│           │   ├── order-edit.component.scss
│           │   ├── order-form.component.ts
│           │   ├── order-form.component.html
│           │   └── order-form.component.scss
│           └── orders.routes.ts
└── layout/
    └── src/
        └── lib/
            ├── layout.component.ts
            ├── layout.component.html
            ├── layout.component.scss
            ├── header/
            │   ├── header.component.ts
            │   ├── header.component.html
            │   └── header.component.scss
            └── sidebar/
                ├── sidebar.component.ts
                ├── sidebar.component.html
                └── sidebar.component.scss

apps/
└── mini-crm/
    └── src/
        └── app/
            ├── app.component.ts
            ├── app.component.html
            ├── app.component.scss
            ├── app.config.ts
            └── app.routes.ts
```

**Important** : Utiliser les alias Nx pour les imports :

- `@mini-crm/shared-ui`
- `@mini-crm/data-access`
- `@mini-crm/feature-auth`
- `@mini-crm/feature-orders`
- `@mini-crm/layout`

---

## 5. Règles SCSS OBLIGATOIRES

### Fichiers séparés

- JAMAIS de styles inline dans les fichiers HTML
- JAMAIS de `styles: [...]` dans @Component
- TOUJOURS un fichier .scss séparé pour chaque component (même petit)

### Variables CSS custom (approche privilégiée)

**IMPORTANT** : Bootstrap est déjà chargé globalement dans `project.json`, donc **NE PAS** importer Bootstrap dans les fichiers SCSS individuels.

Structure d'un fichier SCSS :

```scss
// 1. Variables CSS custom du component (utilisent les variables CSS Bootstrap globales)
:host {
  --component-bg: var(--bs-light);
  --component-text: var(--bs-dark);
  --component-border: var(--bs-border-color);
  --component-accent: var(--bs-primary);
  --component-padding: 1rem;
  --component-radius: var(--bs-border-radius);

  display: block;
}

// 2. Styles utilisant les variables CSS
.container {
  background: var(--component-bg);
  color: var(--component-text);
  padding: var(--component-padding);
  border-radius: var(--component-radius);
}

// 3. Responsive si nécessaire
@media (max-width: 768px) {
  :host {
    --component-padding: 0.5rem;
  }
}
```

**Variables CSS Bootstrap disponibles** :

- `var(--bs-primary)`, `var(--bs-secondary)`, `var(--bs-success)`, etc.
- `var(--bs-light)`, `var(--bs-dark)`
- `var(--bs-body-color)`, `var(--bs-body-bg)`
- `var(--bs-border-color)`, `var(--bs-border-radius)`

### Hiérarchie des styles (priorité)

1. Classes utilitaires Bootstrap (mb-3, d-flex, text-center)
2. Composants Bootstrap (card, table, alert)
3. Variables CSS custom dans fichier SCSS

---

## 6. Interfaces et Models

### Auth Models (libs/data-access/src/lib/models/auth.model.ts)

Créer les interfaces :

- User : id (optionnel number), email (string)
- LoginRequest : email (string), password (string)
- RegisterRequest : email (string), password (string)
- AuthResponse : accessToken (string), user (User)

### Order Models (libs/data-access/src/lib/models/order.model.ts)

Créer les interfaces et types :

- Order : id (number), customer (string), nbDays (number), tjm (number), tauxTva (number), totalHt (number), totalTtc (number)
- CreateOrder : type dérivé d'Order sans id, totalHt, totalTtc
- UpdateOrder : type dérivé d'Order sans totalHt, totalTtc

---

## 7. Shared UI Components

### SpinnerComponent (libs/shared-ui/src/lib/spinner/)

- Spinner Bootstrap centré réutilisable
- Template inline accepté (< 20 lignes)
- Fichier SCSS obligatoire même pour petit component
- **Selector** : `lib-spinner` (préfixe `lib-` OBLIGATOIRE pour tous les composants dans les libs)

```typescript
@Component({
  selector: 'lib-spinner',
  standalone: true,
  template: `
    <div class="spinner-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
  `,
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### ConfirmModalComponent (libs/shared-ui/src/lib/confirm-modal/)

- Modal Bootstrap de confirmation réutilisable
- Inputs avec input() : modalId (required), title (défaut: "Confirmation"), message
- Output avec output() : confirm
- Utiliser l'API JavaScript Bootstrap (bootstrap.Modal) pour fermer
- **Selector** : `lib-confirm-modal` (préfixe `lib-` OBLIGATOIRE pour tous les composants dans les libs)
- Fichier SCSS obligatoire

---

## 8. Layout System

### LayoutComponent (libs/layout/src/lib/)

Conteneur principal avec content projection et affichage conditionnel.

- **Selector** : `lib-layout` (préfixe `lib-` OBLIGATOIRE pour tous les composants dans les libs)

Structure :

- Conteneur pleine hauteur (vh-100) avec flexbox vertical
- Header : sticky-top, fond sombre, texte blanc
  - Content projection via ng-content select="[layout-header]"
- Sidebar : largeur fixe (variable CSS --sidebar-width), fond clair
  - Content projection via ng-content select="[layout-sidebar]"
  - **Masquer si utilisateur non authentifié** (utiliser `authService.isAuthenticated()`)
- Main : flex-grow-1, overflow-auto, contient router-outlet

Logique conditionnelle :

- Injecter AuthService (pas Router)
- Utiliser directement `authService.isAuthenticated()` (signal computed déjà disponible dans AuthService)
- **IMPORTANT** : Si `!authService.isAuthenticated()` : masquer COMPLÈTEMENT header et sidebar (ne pas les afficher du tout), afficher uniquement main en plein écran centré
- Sinon : afficher header, sidebar et main normalement
- **Note** : Le service AuthService met déjà à jour automatiquement le token dans `signIn()` et `signUp()`, donc `isAuthenticated()` se met à jour automatiquement

Variables CSS dans le fichier SCSS :

```scss
:host {
  --sidebar-width: 250px;
  --header-height: 60px;
  --main-padding: 1.5rem;
}
```

### HeaderComponent (libs/layout/src/lib/header/)

- Icône bi-briefcase-fill et texte "Mini CRM"
- **Selector** : `lib-header` (préfixe `lib-` OBLIGATOIRE)
- Variables CSS pour les couleurs

### SidebarComponent (libs/layout/src/lib/sidebar/)

- Navigation verticale avec un lien "Commandes" (bi-list-ul)
- RouterLink vers /orders et RouterLinkActive
- **Selector** : `lib-sidebar` (préfixe `lib-` OBLIGATOIRE)
- Variables CSS pour les styles actif/inactif

---

## 9. App Component

### app.component.ts

- SUPPRIMER tout le code HTML généré par Angular CLI
- Imports : LayoutComponent, HeaderComponent, SidebarComponent

### app.component.html

- SUPPRIMER tout le contenu généré par Angular CLI
- Utiliser LayoutComponent avec les deux projections :
  - HeaderComponent avec attribut layout-header
  - SidebarComponent avec attribut layout-sidebar
- Le router-outlet est DANS LayoutComponent, pas dans app.component.html

### app.component.scss

- Variables CSS pour styles globaux si nécessaire

---

## 10. Feature Auth (NON fonctionnelle - à compléter en formation)

### AuthService

Signaux :

- token : signal<string | null>(null)
- user : signal<User | null>(null)
- isAuthenticated : computed(() => !!this.token())

Méthodes (retournent des données mockées) :

- signIn(credentials: LoginRequest) : Observable<AuthResponse>
- signUp(credentials: RegisterRequest) : Observable<AuthResponse>
- logout() : void

### SignInComponent

- Plein écran centré avec Card Bootstrap
- Formulaire réactif : email (required, email), password (required, minLength 8)
- Validation Bootstrap (is-invalid, invalid-feedback)
- **IMPORTANT** : Ajouter un lien en bas du formulaire pour naviguer vers `/auth/sign-up` avec le texte "Pas encore de compte ? S'inscrire"
- Importer RouterLink dans les imports du component
- Fichier SCSS avec variables CSS

### SignUpComponent

- Même layout que SignIn
- Formulaire avec email, password, confirmPassword
- Validator custom pour matcher les passwords
- **IMPORTANT** : Ajouter un lien en bas du formulaire pour naviguer vers `/auth/sign-in` avec le texte "Déjà un compte ? Se connecter"
- Importer RouterLink dans les imports du component
- Fichier SCSS avec variables CSS

### AuthGuard

- Functional guard, retourne true pour l'instant
- Code de vérification en commentaire pour la formation

### AuthInterceptor

- Functional interceptor préparé
- Ajoute le Bearer token si présent
- Commentaire TODO pour l'enregistrement en formation

---

## 11. Feature Orders (100% fonctionnelle)

### OrdersService

URL API : http://localhost:3000/orders

Signaux :

- orders : signal<Order[]>([])
- loading : signal<boolean>(false)
- error : signal<string | null>(null)

Méthodes :

- getAll() : GET, met à jour orders signal
- getById(id) : retourne depuis orders()
- create(orderData: CreateOrder) : calcule totalHt/totalTtc, POST, refresh
- update(orderData: UpdateOrder) : calcule totalHt/totalTtc, PUT, refresh
- delete(id) : DELETE, refresh

Calculs :

- totalHt = nbDays \* tjm
- totalTtc = totalHt \* (1 + tauxTva / 100)

### OrderFormComponent (réutilisable)

- input() : order (Order | null)
- output() : save, cancel
- Formulaire réactif avec validation
- Computed pour totalHt et totalTtc
- effect() pour patcher le form en mode édition
- Fichier SCSS avec variables CSS

### OrderListComponent

- Table Bootstrap avec @for et track
- Boutons actions avec icônes Bootstrap Icons
- ConfirmModalComponent pour suppression
- Fichier SCSS avec variables CSS

### OrderAddComponent / OrderEditComponent

- Utilisent OrderFormComponent
- Navigation vers /orders après save/cancel
- Fichier SCSS avec variables CSS

---

## 12. App Config et Routes

### app.config.ts

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // TODO Formation : provideHttpClient(withInterceptors([authInterceptor]))
  ],
};
```

### app.routes.ts

**IMPORTANT** : Utiliser les alias Nx pour le lazy loading.

```typescript
import { Routes } from '@angular/router';
import { authGuard } from '@mini-crm/feature-auth';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('@mini-crm/feature-auth').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadChildren: () => import('@mini-crm/feature-orders').then((m) => m.ORDERS_ROUTES),
  },
];
```

---

## 13. Règles de code OBLIGATOIRES

### UTILISER :

- Standalone components uniquement
- inject() pour l'injection de dépendances
- @if, @else, @for, @empty (nouvelle syntaxe control flow)
- input() et output() pour la communication
- signal(), computed(), effect() pour la réactivité
- ChangeDetectionStrategy.OnPush sur tous les components
- Functional guards et interceptors
- track obligatoire dans tous les @for
- Fichiers SCSS séparés pour chaque component
- Variables CSS custom pour les valeurs du component
- Composants Bootstrap 5
- Bootstrap Icons (préfixe bi-)

### NE PAS UTILISER :

- *ngIf, *ngFor, ngSwitch
- Décorateurs @Input(), @Output()
- NgModules
- Guards ou interceptors en classes
- Constructor injection
- styles: [...] dans @Component
- style="..." dans HTML
- [ngStyle] dans les templates
- Autres librairies CSS ou d'icônes

---

## 14. Style et UI

- Tous les textes en français
- Design responsive avec classes Bootstrap
- Formulaires auth : centrés plein écran, card Bootstrap avec shadow
- Liste orders : table Bootstrap responsive
- Erreurs : alert alert-danger
- Infos : alert alert-info
- Loading : SpinnerComponent
- Variables CSS dans chaque fichier SCSS

---

## RAPPEL FINAL

⚠️ **Ce projet utilise Nx : créer les libs AVANT de créer les fichiers.**
⚠️ **Utiliser les alias Nx (`@mini-crm/...`) pour tous les imports entre libs.**
⚠️ **Utilise le MCP Angular pour récupérer les best practices avant de générer le code.**
⚠️ **Consulte les docs npm pour json-server (0.17.4) et json-server-auth (2.1.0).**
⚠️ **Installe @types/bootstrap pour le support TypeScript de Bootstrap JS.**
⚠️ **NE PAS importer Bootstrap dans les fichiers SCSS individuels (déjà chargé globalement).**
⚠️ **Utiliser les variables CSS Bootstrap (`var(--bs-primary)`, etc.) au lieu des variables SCSS (`$primary`).**
⚠️ **Respecte les rules Cursor configurées (.cursor/rules/).**
⚠️ **Ne crée AUCUN fichier non spécifié.**
⚠️ **Respecte EXACTEMENT la structure Nx (libs/ et apps/).**
⚠️ **ChangeDetectionStrategy.OnPush sur TOUS les components.**
⚠️ **Fichier SCSS séparé pour TOUS les components (même petits).**
⚠️ **Variables CSS custom dans les fichiers SCSS.**
⚠️ **TOUS les composants dans les libs (`libs/`) doivent utiliser le préfixe `lib-` pour leur selector (ex: `lib-spinner`, `lib-layout`, `lib-order-list`).**
⚠️ **SUPPRIME tout le code généré par Angular CLI dans app.component.html.**
⚠️ **Le router-outlet est DANS LayoutComponent.**
⚠️ **Tout doit compiler et fonctionner immédiatement.**
