# Documentation du Projet - Compodoc

Ce document explique comment générer et consulter la documentation automatique du projet Mini CRM avec Compodoc.

## 🚀 Scripts Disponibles

### Générer et visualiser la documentation (mode dev)

```bash
npm run docs
```

Ouvre un serveur de développement sur `http://localhost:8080` et génère la documentation automatiquement.

### Générer la documentation statique

```bash
npm run docs:build
```

Génère la documentation dans le dossier `docs/compodoc/`.

### Vérifier la couverture de documentation

```bash
npm run docs:coverage
```

Vérifie que la couverture de documentation est supérieure à 80%.

### Mode watch (régénération automatique)

```bash
npm run docs:watch
```

Lance un serveur et régénère la documentation à chaque modification.

## 📋 Standards de Documentation

### Services (data-access)

Tous les services publics dans `libs/data-access/` DOIVENT être documentés avec :

- Description du service
- Tag `@usageNotes` avec exemples d'injection
- Tag `@category Data Access`
- Documentation des méthodes publiques avec `@param`, `@returns`, `@throws`

```typescript
/**
 * Service for managing orders data and operations.
 * 
 * @usageNotes
 * ```typescript
 * private ordersService = inject(OrdersService);
 * ```
 * 
 * @category Data Access
 */
```

### Composants Réutilisables (shared-ui)

Tous les composants dans `libs/shared-ui/` DOIVENT être documentés avec :

- Description du composant
- Tag `@usageNotes` avec exemples HTML
- Tag `@category Shared UI`
- Documentation des inputs/outputs

```typescript
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
```

### Guards et Interceptors

Tous les guards et interceptors DOIVENT être documentés avec :

- Description du comportement
- Tag `@usageNotes` avec exemples de configuration
- Tag `@category Security` (pour les guards/interceptors d'auth)

### Models et Interfaces

Toutes les interfaces et enums publics DOIVENT être documentés avec :

- Description de l'entité
- Tag `@category Models`
- Description de chaque propriété

## 🎯 Objectifs de Couverture

- **Global** : > 80%
- **Par fichier** : > 70%

## 📊 Consulter les Statistiques

La documentation générée inclut :

1. **Coverage** : Pourcentage de documentation
2. **Modules** : Organisation par libs
3. **Components** : Liste des composants avec leurs inputs/outputs
4. **Services** : Liste des services avec leurs méthodes
5. **Interfaces** : Modèles de données
6. **Guards/Interceptors** : Sécurité et HTTP

## ⚙️ Configuration

La configuration Compodoc se trouve dans `.compodocrc.json` à la racine du projet :

```json
{
  "port": 8080,
  "theme": "material",
  "tsconfig": "apps/mini-crm/tsconfig.app.json",
  "output": "docs/compodoc",
  "coverageTest": 80,
  "coverageMinimumPerFile": 70
}
```

## 🔍 Tags Compodoc Disponibles

| Tag | Usage | Exemple |
|-----|-------|---------|
| `@usageNotes` | Comment utiliser | Exemples d'usage |
| `@see` | Références croisées | `@see OrdersService` |
| `@category` | Catégorie Compodoc | Data Access, UI, Feature |
| `@throws` | Erreurs possibles | `@throws {HttpErrorResponse}` |
| `@deprecated` | Code obsolète | Migration vers nouvelle API |
| `@example` | Exemples de code | Blocs de code illustratifs |
| `@default` | Valeur par défaut | `@default 'primary'` |
| `@param` | Description paramètre | `@param user - User data` |
| `@returns` | Valeur de retour | `@returns Observable<Order[]>` |
| `@readonly` | Lecture seule | Signal en lecture seule |
| `@computed` | Signal computed | Valeur dérivée |

## 📚 Ressources

- [Documentation Compodoc](https://compodoc.app/)
- [Guide JSDoc](https://jsdoc.app/)
- [TSDoc Standard](https://tsdoc.org/)

## 🐛 Problèmes Courants

### Erreur "Cannot find tsconfig.app.json"

Vérifier que le fichier `apps/mini-crm/tsconfig.app.json` existe.

### Couverture trop faible

Vérifier avec `npm run docs:coverage` et ajouter la documentation manquante sur :
- Services publics
- Composants shared-ui
- Guards et interceptors
- Interfaces publiques

### Documentation non mise à jour

Relancer `npm run docs:build` ou utiliser `npm run docs:watch` pour la régénération automatique.

