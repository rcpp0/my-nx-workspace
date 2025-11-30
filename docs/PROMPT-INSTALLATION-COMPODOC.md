# Prompt d'Installation Compodoc + Documentation JSDoc

**À copier-coller dans un nouveau projet Nx identique pour reproduire exactement la même configuration.**

---

## 🎯 Contexte

J'ai un projet Nx avec Angular 20 (Mini CRM) identique au starter. Je veux que tu installes **Compodoc**, que tu le configures pour générer automatiquement la documentation du projet et que tu mettes en place les **standards de documentation JSDoc/TSDoc** complets.

---

## 📋 Ce Que Tu Dois Faire

### 1. Installer Compodoc

Installe la dépendance Compodoc en dev :

```bash
npm install @compodoc/compodoc@^1.1.32 --save-dev
```

**Vérifie** que `@compodoc/compodoc` apparaît bien dans `devDependencies` de `package.json`.

---

### 2. Créer le Fichier de Configuration Compodoc

Crée `.compodocrc.json` à la racine avec cette configuration :

```json
{
  "$schema": "https://compodoc.app/schemas/compodocrc.schema.json",
  "port": 8080,
  "theme": "material",
  "tsconfig": "apps/mini-crm/tsconfig.app.json",
  "output": "docs/compodoc",
  "coverageTest": 80,
  "coverageMinimumPerFile": 70,
  "disablePrivate": true,
  "disableProtected": false,
  "disableInternal": true,
  "disableLifeCycleHooks": false,
  "disableGraph": false,
  "hideGenerator": false,
  "name": "Mini CRM - Documentation",
  "language": "fr-FR",
  "silent": false,
  "watch": false
}
```

**Notes importantes** :

- Ne pas ajouter `includes` et `includesName` (problèmes avec les fichiers markdown)
- Ne pas ajouter `customFavicon` (problème de chemin)

---

### 3. Ajouter les Scripts npm

Dans `package.json`, ajoute ces 4 scripts **dans la section `scripts`** :

```json
"docs": "compodoc -p apps/mini-crm/tsconfig.app.json -s --port 8080",
"docs:build": "compodoc -p apps/mini-crm/tsconfig.app.json -d docs/compodoc",
"docs:coverage": "compodoc -p apps/mini-crm/tsconfig.app.json --coverageTest 80",
"docs:watch": "compodoc -p apps/mini-crm/tsconfig.app.json -s --watch",
```

---

### 4. Mettre à Jour .gitignore

Ajoute à la fin de `.gitignore` :

```
# Compodoc generated documentation
docs/compodoc
.compodoc
```

---

### 5. Remplacer la Section Documentation dans .cursor/rules/project.mdc

**Trouve et remplace** la section `## Commentaires et Documentation` (lignes 438-510 environ) par cette nouvelle section complète :

`````markdown
## Commentaires et Documentation (JSDoc/TSDoc + Compodoc)

### Philosophie

- ✅ Privilégier un code **auto-documenté** (noms explicites, types clairs)
- ✅ Commenter **le pourquoi**, pas **le quoi**
- ✅ Documenter **l'API publique** pour Compodoc
- ❌ Éviter les commentaires redondants

### Outils

- **Compodoc** : Documentation automatique Angular (`npm run docs`)
- **TypeDoc** : Documentation TypeScript générique
- **ESLint** : Validation JSDoc avec règles `jsdoc/*`

### Quand Documenter (OBLIGATOIRE)

#### 1. Services Publics (`data-access/`)

````typescript
/**
 * Service for managing orders data and operations.
 *
 * Handles all HTTP requests related to orders including CRUD operations.
 *
 * @usageNotes
 * Inject this service in components or other services:
 * ```typescript
 * private ordersService = inject(OrdersService);
 * ```
 *
 * @see Order
 * @category Data Access
 */
@Injectable({ providedIn: 'root' })
export class OrdersService {
  /**
   * Retrieves all orders from the API.
   *
   * @returns Observable of orders array
   * @throws {HttpErrorResponse} When API request fails
   *
   * @example
   * ```typescript
   * this.ordersService.getOrders().subscribe({
   *   next: (orders) => console.log(orders)
   * });
   * ```
   */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_URL}/orders`);
  }
}
````
`````

#### 2. Composants Réutilisables (`shared-ui/`)

````typescript
/**
 * Spinner component for loading states.
 *
 * Displays a Bootstrap spinner with customizable size and color.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-spinner />
 * ```
 *
 * @see SkeletonComponent
 * @category Shared UI
 */
@Component({
  selector: 'lib-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * Color variant using Bootstrap colors
   * @default 'primary'
   */
  variant = input<'primary' | 'secondary'>('primary');
}
````

#### 3. Signals et State Management

```typescript
/**
 * Current loading state
 * @internal - Not exposed in public API
 */
private loading = signal(false);

/**
 * List of orders
 * @readonly - Use methods to modify
 */
orders = signal<Order[]>([]);

/**
 * Total number of orders
 * @computed
 */
totalOrders = computed(() => this.orders().length);

/**
 * Selected order, linked to orders list
 * @linkedSignal
 */
selectedOrder = linkedSignal(() => this.orders()[0]);
```

#### 4. Guards, Interceptors, Validators

````typescript
/**
 * Authentication guard to protect routes.
 *
 * Redirects to login page if user is not authenticated.
 *
 * @usageNotes
 * Apply to routes in routing configuration:
 * ```typescript
 * {
 *   path: 'orders',
 *   canActivate: [authGuard]
 * }
 * ```
 *
 * @see AuthService
 * @category Security
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Implementation
};
````

#### 5. Models et Interfaces

```typescript
/**
 * Represents an order in the system.
 *
 * @category Models
 * @see OrdersService
 */
export interface Order {
  /**
   * Unique identifier
   * @format uuid
   */
  id: string;

  /**
   * Order title/name
   * @minLength 3
   * @maxLength 100
   */
  title: string;

  /**
   * Order amount in euros
   * @minimum 0
   */
  amount: number;

  /**
   * Current order status
   * @default 'pending'
   */
  status: OrderStatus;
}

/**
 * Order status enumeration
 * @category Models
 */
export enum OrderStatus {
  /** Order is awaiting processing */
  Pending = 'pending',
  /** Order has been confirmed */
  Confirmed = 'confirmed',
}
```

### Documentation des Inputs/Outputs

```typescript
/**
 * User data to display in the card
 * @required
 */
user = input.required<User>();

/**
 * Optional CSS classes to apply
 */
customClass = input<string>('');

/**
 * Emitted when user clicks the edit button
 * @event
 * @param user - The edited user data
 */
userEdited = output<User>();
```

### Quand NE PAS Commenter

- ❌ Getters/Setters simples sans logique
- ❌ Tests unitaires simples (le `it()` suffit)
- ❌ Code évident (ex: `this.loading.set(true)`)
- ❌ Variables privées internes triviales
- ❌ Méthodes privées simples (sauf logique complexe)

### Tags Compodoc Essentiels

| Tag           | Usage                 | Exemple                        |
| ------------- | --------------------- | ------------------------------ |
| `@usageNotes` | Comment utiliser      | Exemples d'usage               |
| `@see`        | Références croisées   | `@see OrdersService`           |
| `@category`   | Catégorie Compodoc    | Data Access, UI, Feature       |
| `@throws`     | Erreurs possibles     | `@throws {HttpErrorResponse}`  |
| `@deprecated` | Code obsolète         | Migration vers nouvelle API    |
| `@example`    | Exemples de code      | Blocs de code illustratifs     |
| `@default`    | Valeur par défaut     | `@default 'primary'`           |
| `@param`      | Description paramètre | `@param user - User data`      |
| `@returns`    | Valeur de retour      | `@returns Observable<Order[]>` |
| `@internal`   | API interne           | Ne pas utiliser                |
| `@readonly`   | Lecture seule         | Signal en lecture seule        |
| `@computed`   | Signal computed       | Valeur dérivée                 |
| `@event`      | Output/EventEmitter   | Événement émis                 |

### Tags Avancés (Optionnels)

```typescript
/**
 * @since 2.0.0
 * @version 2.1.0
 * @alpha  // ou @beta, @experimental
 * @public     // Exposé dans l'API (défaut)
 * @protected  // Héritage uniquement
 * @private    // Usage interne
 */
```

### Génération de la Documentation

#### Scripts disponibles

```bash
# Générer et servir la doc (mode dev)
npm run docs

# Build statique
npm run docs:build

# Vérifier la couverture
npm run docs:coverage
```

#### Configuration

La configuration Compodoc est dans `.compodocrc.json` à la racine du projet.

### Checklist Documentation

Avant de commit :

- [ ] Services publics documentés avec JSDoc complet
- [ ] Composants shared-ui avec `@usageNotes` et exemples
- [ ] Tous les inputs/outputs publics documentés
- [ ] Signals publics avec `@readonly` ou `@computed`
- [ ] Guards/Interceptors avec `@usageNotes`
- [ ] Models/Interfaces avec descriptions des propriétés
- [ ] Tags `@category` pour organisation Compodoc
- [ ] Tags `@see` pour références croisées
- [ ] Pas de code commenté mort
- [ ] Coverage Compodoc > 80% (vérifier avec `npm run docs:coverage`)

`````

**Aussi, mets à jour la section des scripts dans project.mdc** pour inclure les 4 nouveaux scripts docs.

---

### 6. Mettre à Jour les Prompts d'Agents

**Pour chaque fichier dans `.cursor/rules/agents/`, ajoute une section documentation :**

#### agent-architecte-nx-prompt.md

Après la section `## ✅ Checklist Avant de Générer du Code`, ajoute :

```markdown
11. [ ] **Documentation JSDoc/TSDoc ajoutée pour l'API publique** (services, composants shared-ui)

## 📝 Documentation JSDoc/TSDoc (Obligatoire)

Tu DOIS systématiquement :

1. **Documenter l'API publique** : Services, composants shared-ui, guards, interceptors
2. **Utiliser les tags Compodoc** : `@usageNotes`, `@category`, `@see`, `@example`
3. **Documenter inputs/outputs** : Toujours, avec type et description
4. **Documenter signals publics** : Avec `@readonly` ou `@computed`
5. **Ajouter des exemples** : Dans `@usageNotes` ou `@example`
6. **Références croisées** : Utiliser `@see` pour lier les éléments

**Ne PAS documenter** : Code trivial, tests simples, variables privées évidentes

### Exemple : Service

````typescript
/**
 * Service for managing orders data and operations.
 *
 * Handles all HTTP requests related to orders.
 *
 * @usageNotes
 * Inject this service:
 * ```typescript
 * private ordersService = inject(OrdersService);
 * ```
 *
 * @see Order
 * @category Data Access
 */
@Injectable({ providedIn: 'root' })
export class OrdersService {
  /**
   * Retrieves all orders from the API.
   *
   * @returns Observable of orders array
   * @throws {HttpErrorResponse} When API request fails
   */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_URL}/orders`);
  }
}
`````

### Exemple : Composant

````typescript
/**
 * Spinner component for loading states.
 *
 * @usageNotes
 * ```html
 * <lib-spinner [size]="'lg'" />
 * ```
 *
 * @category Shared UI
 */
@Component({
  selector: 'lib-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size = input<'sm' | 'md' | 'lg'>('md');
}
````

### Vérification de la Documentation

Après avoir créé du code documenté, vérifier avec :

```bash
npm run docs:coverage
```

L'objectif est d'avoir une couverture > 80%.

`````

#### agent-developpeur-angular-prompt.md

Même chose, ajoute dans la checklist le point 12 et la section documentation complète (identique à agent-architecte).

#### agent-integrateur-api-prompt.md

Ajoute dans la checklist le point 11 et cette section adaptée aux APIs :

```markdown
11. [ ] **Documentation JSDoc/TSDoc ajoutée pour les services, guards, et interceptors**

## 📝 Documentation JSDoc/TSDoc (Obligatoire)

Tu DOIS systématiquement :

1. **Documenter les services HTTP** : Description complète avec `@usageNotes`
2. **Documenter les guards** : Comportement et cas d'usage
3. **Documenter les interceptors** : Quand ils s'appliquent et ce qu'ils font
4. **Utiliser les tags Compodoc** : `@usageNotes`, `@category`, `@see`, `@throws`
5. **Ajouter des exemples** : Dans `@usageNotes`
6. **Documenter la gestion d'erreurs** : Types d'erreurs possibles avec `@throws`

**Ne PAS documenter** : Méthodes privées triviales, tests simples

### Exemple : Service HTTP

[Même exemple que dans agent-architecte]

### Exemple : Guard

[Même exemple que dans agent-architecte]

### Exemple : Interceptor

````typescript
/**
 * HTTP interceptor for adding authentication token to requests.
 *
 * Automatically adds Bearer token to all outgoing requests
 * if user is authenticated.
 *
 * @usageNotes
 * Configure in app.config.ts:
 * ```typescript
 * provideHttpClient(
 *   withInterceptors([authInterceptor])
 * )
 * ```
 *
 * @see AuthService
 * @category Security
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Implementation
};
`````

### Vérification de la Documentation

[Même texte]

`````

#### agent-styliste-frontend-prompt.md

Ajoute dans la checklist le point 11 et cette section plus légère :

```markdown
11. [ ] **Si composant dans shared-ui : Documentation JSDoc avec exemples d'utilisation**

## 📝 Documentation JSDoc (Composants Shared UI uniquement)

Pour les composants réutilisables dans `shared-ui`, ajouter :

### Exemple : Composant UI

````typescript
/**
 * Spinner component for loading states.
 *
 * Displays a Bootstrap spinner with customizable size and color.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-spinner />
 * ```
 *
 * ### Custom Size
 * ```html
 * <lib-spinner [size]="'lg'" [variant]="'success'" />
 * ```
 *
 * @see SkeletonComponent
 * @category Shared UI
 */
@Component({
  selector: 'lib-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size = input<'sm' | 'md' | 'lg'>('md');

  /**
   * Color variant using Bootstrap colors
   * @default 'primary'
   */
  variant = input<'primary' | 'secondary' | 'success'>('primary');
}
`````

**Note** : La documentation complète pour les composants réutilisables aide les autres développeurs à les utiliser correctement.

````

---

### 7. Créer les Guides de Documentation

Crée ces fichiers dans le dossier `docs/` :

#### docs/DOCUMENTATION.md

[Contenu complet du guide - tu peux copier depuis le fichier existant]

#### docs/JSDOC-QUICK-GUIDE.md

[Contenu du guide rapide avec templates - tu peux copier depuis le fichier existant]

#### docs/WORKFLOW-CHECKLIST.md

[Contenu de la checklist workflow - tu peux copier depuis le fichier existant]

#### docs/COMPODOC-CHANGELOG.md

[Contenu du changelog - tu peux copier depuis le fichier existant]

#### docs/SUMMARY.md

[Contenu du résumé - tu peux copier depuis le fichier existant]

---

### 8. Créer le Fichier de Résumé Final

Crée `COMPODOC-IMPLEMENTATION-COMPLETE.md` à la racine.

[Contenu du résumé final - tu peux copier depuis le fichier existant]

---

## ✅ Vérification

Une fois terminé, vérifie que :

1. [ ] **`@compodoc/compodoc` est installé** dans `devDependencies` de `package.json`
2. [ ] `.compodocrc.json` existe à la racine avec `coverageTest: 80` et `coverageMinimumPerFile: 70`
2. [ ] `package.json` contient les 4 scripts `docs`, `docs:build`, `docs:coverage`, `docs:watch`
3. [ ] `.gitignore` ignore `docs/compodoc` et `.compodoc`
4. [ ] `.cursor/rules/project.mdc` a la section documentation complète avec Compodoc
5. [ ] Les 4 prompts d'agents ont la section documentation JSDoc ajoutée
6. [ ] Les 5 fichiers dans `docs/` sont créés
7. [ ] `COMPODOC-IMPLEMENTATION-COMPLETE.md` existe à la racine

---

## 🚀 Test Final

Pour tester que tout fonctionne :

```bash
npm run docs:build
````

Puis ouvre `docs/compodoc/index.html` dans ton navigateur.

Si tu vois l'interface Compodoc avec la documentation générée, **c'est parfait !** ✅

---

## 📊 Seuils de Couverture

**Configuration actuelle** : 80% global, 70% par fichier

**Important** : Comme le code existant n'a pas encore de documentation JSDoc, `npm run docs` (avec serveur) pourrait échouer. Utilise `npm run docs:build` à la place pour l'instant.

Les **agents Cursor** génèreront automatiquement la documentation JSDoc pour tout nouveau code grâce aux règles configurées ! 🎉

---

**Voilà ! Applique exactement ces modifications et ton projet aura la même configuration Compodoc + documentation JSDoc que le projet starter.** 🚀
