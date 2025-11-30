# ✅ Checklist de Documentation - Workflow Développeur

## 🎯 Avant de Commiter du Code

### Pour chaque Service (libs/data-access/)

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
   * [Method description]
   * 
   * @param [param] - [Description]
   * @returns Observable of [type]
   * @throws {HttpErrorResponse} When [condition]
   */
  [method]([param]: Type): Observable<ReturnType> {
    // Implementation
  }
}
```

**Checklist** :
- [ ] Classe documentée avec `@usageNotes`
- [ ] Tag `@category Data Access`
- [ ] Toutes les méthodes publiques documentées
- [ ] `@param` pour chaque paramètre
- [ ] `@returns` pour la valeur de retour
- [ ] `@throws` pour les erreurs possibles
- [ ] `@see` pour les références

---

### Pour chaque Composant Réutilisable (libs/shared-ui/)

```typescript
/**
 * [Component name] for [purpose].
 * 
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-[component] />
 * ```
 * 
 * ### With Inputs
 * ```html
 * <lib-[component] [input]="value" ([output])="handler($event)" />
 * ```
 * 
 * @see [RelatedComponent]
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
  
  /**
   * [Output description]
   * @event
   */
  [output] = output<Type>();
  
  /**
   * [Signal description]
   * @readonly
   */
  [signal] = signal<Type>(initialValue);
  
  /**
   * [Computed description]
   * @computed
   */
  [computed] = computed(() => this.[signal]());
}
```

**Checklist** :
- [ ] Classe documentée avec `@usageNotes`
- [ ] Exemples HTML dans `@usageNotes`
- [ ] Tag `@category Shared UI`
- [ ] Tous les inputs documentés avec `@default`
- [ ] Tous les outputs documentés avec `@event`
- [ ] Signals publics documentés avec `@readonly` ou `@computed`
- [ ] `@see` pour les références

---

### Pour chaque Guard

```typescript
/**
 * [Guard name] to [purpose].
 * 
 * [Detailed behavior description]
 * 
 * @usageNotes
 * Apply to routes in routing configuration:
 * ```typescript
 * {
 *   path: '[path]',
 *   component: [Component],
 *   canActivate: [[guard]Guard]
 * }
 * ```
 * 
 * @see [RelatedService]
 * @category Security
 */
export const [guard]Guard: CanActivateFn = (route, state) => {
  // Implementation
};
```

**Checklist** :
- [ ] Description du comportement
- [ ] `@usageNotes` avec exemple de configuration
- [ ] Tag `@category Security`
- [ ] `@see` pour les services utilisés

---

### Pour chaque Interceptor

```typescript
/**
 * [Interceptor name] for [purpose].
 * 
 * [Detailed behavior description]
 * 
 * @usageNotes
 * Configure in app.config.ts:
 * ```typescript
 * provideHttpClient(
 *   withInterceptors([[interceptor]Interceptor])
 * )
 * ```
 * 
 * @see [RelatedService]
 * @category Security
 */
export const [interceptor]Interceptor: HttpInterceptorFn = (req, next) => {
  // Implementation
};
```

**Checklist** :
- [ ] Description du comportement
- [ ] `@usageNotes` avec exemple de configuration
- [ ] Tag `@category Security`
- [ ] `@see` pour les services utilisés

---

### Pour chaque Interface/Enum Public

```typescript
/**
 * Represents [entity description].
 * 
 * [Additional details if needed]
 * 
 * @see [RelatedInterface]
 * @category Models
 */
export interface [Entity] {
  /**
   * [Property description]
   * @format uuid
   */
  id: string;
  
  /**
   * [Property description]
   * @minLength 3
   * @maxLength 100
   */
  name: string;
  
  /**
   * [Property description]
   * @minimum 0
   */
  amount: number;
  
  /**
   * [Property description]
   * @default 'pending'
   */
  status: Status;
}

/**
 * [Enum description]
 * @category Models
 */
export enum Status {
  /** [Value description] */
  Pending = 'pending',
  /** [Value description] */
  Active = 'active',
}
```

**Checklist** :
- [ ] Interface/Enum documentée
- [ ] Tag `@category Models`
- [ ] Chaque propriété documentée
- [ ] Formats/contraintes documentés (`@format`, `@minLength`, etc.)
- [ ] Valeurs d'enum documentées
- [ ] `@see` pour les références

---

## 🚀 Workflow Complet

### 1. Développement

```bash
# Développer le code
# Ajouter la documentation JSDoc
```

### 2. Vérification

```bash
# Vérifier la couverture de documentation
npm run docs:coverage

# Si couverture < 80% : ajouter la documentation manquante
```

### 3. Visualisation

```bash
# Générer et visualiser la documentation
npm run docs

# Ouvrir http://localhost:8080
```

### 4. Commit

```bash
# Une fois la documentation complète (> 80%)
git add .
git commit -m "feat: add [feature] with documentation"
```

---

## 🎯 Objectifs de Qualité

- ✅ **Couverture globale** : > 80%
- ✅ **Couverture par fichier** : > 70%
- ✅ **Tous les services publics** documentés
- ✅ **Tous les composants shared-ui** documentés
- ✅ **Tous les guards/interceptors** documentés
- ✅ **Toutes les interfaces publiques** documentées

---

## ⚡ Commandes Rapides

```bash
# Vérifier la couverture
npm run docs:coverage

# Générer la doc (mode dev)
npm run docs

# Build doc statique
npm run docs:build

# Mode watch
npm run docs:watch
```

---

## 📚 Ressources

- **Guide Complet** : `docs/DOCUMENTATION.md`
- **Guide Rapide** : `docs/JSDOC-QUICK-GUIDE.md`
- **Résumé** : `docs/SUMMARY.md`
- **Changelog** : `docs/COMPODOC-CHANGELOG.md`

---

## ❓ Questions Fréquentes

### Q: Dois-je documenter les méthodes privées ?
**R** : Non, seulement les méthodes publiques de l'API publique.

### Q: Dois-je documenter les tests ?
**R** : Non, les descriptions `it()` suffisent.

### Q: Dois-je documenter tous les composants ?
**R** : Oui pour `shared-ui`, optionnel pour les composants de features.

### Q: Comment documenter un signal computed ?
**R** : Utiliser le tag `@computed` :
```typescript
/**
 * Total count of items
 * @computed
 */
total = computed(() => this.items().length);
```

### Q: La couverture est < 80%, que faire ?
**R** : Lancer `npm run docs:coverage` pour voir les fichiers manquants, puis ajouter la documentation.

---

**🎉 Suivre cette checklist garantit une documentation complète et de qualité !**

