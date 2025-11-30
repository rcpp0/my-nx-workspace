# Guide Rapide - Documentation JSDoc/Compodoc

## 🚀 Commandes Rapides

```bash
# Voir la documentation
npm run docs

# Vérifier la couverture
npm run docs:coverage
```

## ✅ Checklist : Quand Documenter ?

### Services (data-access) - OBLIGATOIRE

- [x] Classe du service avec `@usageNotes`
- [x] Méthodes publiques avec `@param`, `@returns`, `@throws`
- [x] Tag `@category Data Access`

### Composants (shared-ui) - OBLIGATOIRE

- [x] Classe du composant avec `@usageNotes` et exemples HTML
- [x] Tous les inputs avec `@default` si applicable
- [x] Tous les outputs avec `@event`
- [x] Tag `@category Shared UI`

### Guards & Interceptors - OBLIGATOIRE

- [x] Description du comportement
- [x] `@usageNotes` avec exemple de configuration
- [x] Tag `@category Security`

### Models & Interfaces - OBLIGATOIRE

- [x] Description de l'entité
- [x] Description de chaque propriété
- [x] Tag `@category Models`

## 📝 Templates Prêts à l'Emploi

### Service

```typescript
/**
 * Service for managing [RESOURCE] data and operations.
 * 
 * @usageNotes
 * ```typescript
 * private [resource]Service = inject([Resource]Service);
 * ```
 * 
 * @see [Resource]
 * @category Data Access
 */
@Injectable({ providedIn: 'root' })
export class [Resource]Service {
  /**
   * Retrieves all [resources] from the API.
   * 
   * @returns Observable of [resources] array
   * @throws {HttpErrorResponse} When API request fails
   */
  get[Resources](): Observable<[Resource][]> {
    // Implementation
  }
}
```

### Composant

```typescript
/**
 * [Component name] for [purpose].
 * 
 * @usageNotes
 * ```html
 * <lib-[component] [input]="value" />
 * ```
 * 
 * @category Shared UI
 */
@Component({
  selector: 'lib-[component]',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class [Component]Component {
  /**
   * [Input description]
   * @default 'defaultValue'
   */
  [input] = input<Type>('defaultValue');
}
```

### Guard

```typescript
/**
 * [Guard name] to [purpose].
 * 
 * @usageNotes
 * ```typescript
 * {
 *   path: '[path]',
 *   canActivate: [[guard]Guard]
 * }
 * ```
 * 
 * @category Security
 */
export const [guard]Guard: CanActivateFn = (route, state) => {
  // Implementation
};
```

### Interface

```typescript
/**
 * Represents [entity description].
 * 
 * @category Models
 */
export interface [Entity] {
  /**
   * [Property description]
   * @format [uuid|date-time|etc]
   */
  [property]: string;
}
```

## 🏷️ Tags Essentiels

| Tag | Quand | Exemple |
|-----|-------|---------|
| `@usageNotes` | Toujours pour API publique | Exemples d'utilisation |
| `@category` | Toujours | `Data Access`, `Shared UI`, `Security`, `Models` |
| `@see` | Références | `@see Order` |
| `@param` | Paramètres méthode | `@param id - Order ID` |
| `@returns` | Valeur retour | `@returns Observable<Order>` |
| `@throws` | Erreurs possibles | `@throws {HttpErrorResponse}` |
| `@default` | Valeur par défaut | `@default 'primary'` |
| `@event` | Output/EventEmitter | `@event` |
| `@readonly` | Signal readonly | `@readonly` |
| `@computed` | Signal computed | `@computed` |

## ❌ Quand NE PAS Documenter

- Variables privées triviales
- Méthodes privées simples
- Tests unitaires
- Code évident (ex: `this.loading.set(true)`)

## 🎯 Objectif de Couverture

- **Global** : > 80%
- **Par fichier** : > 70%

Vérifier avec : `npm run docs:coverage`

## 📚 Documentation Complète

Voir `docs/DOCUMENTATION.md` pour le guide complet.

