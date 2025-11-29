# Guide : Exécution du STARTER-PROMPT.md

---

## 📚 Comprendre les Règles du Projet

Avant de commencer, il est important de comprendre le système de **règles** configuré dans ce projet. Ces règles guident Cursor pour générer du code conforme aux conventions du projet.

### Qu'est-ce qu'une Règle ? (Fichiers .mdc)

Les règles sont des fichiers `.mdc` (Markdown Cursor) situés dans `.cursor/rules/` qui définissent les conventions et bonnes pratiques du projet. Cursor les charge automatiquement selon les fichiers sur lesquels vous travaillez.

#### Liste des Règles Disponibles

| Fichier              | Description                                                               | Quand elle s'applique                 |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------- |
| **project.mdc**      | Conventions Angular 20, stack technique, selectors, styles SCSS           | Toujours active (`alwaysApply: true`) |
| **architecture.mdc** | Principes architecturaux, structure Nx, flux de données, state management | Fichiers TypeScript, HTML, SCSS       |
| **testing.mdc**      | Règles pour les tests unitaires avec Vitest (Angular 20)                  | Fichiers `*.spec.ts`, `*.test.ts`     |
| **debugging.mdc**    | Règles pour le debugging et la résolution de problèmes Angular 20         | Fichiers TypeScript                   |
| **cursor.mdc**       | Règles générales Angular (standalone, signals, etc.)                      | Tous les fichiers                     |

#### Comment Utiliser les Règles

Les règles sont **automatiquement chargées** par Cursor selon le contexte. Vous pouvez aussi les référencer explicitement dans vos prompts :

```
@project.mdc
Crée un composant suivant les conventions du projet.
```

**Important** : La règle `project.mdc` est toujours active, donc elle est toujours disponible même sans référence explicite.

---

## 🤖 Configuration des Agents Spécialisés

Ce projet utilise **4 agents spécialisés** pour vous aider dans différents domaines. Chaque agent doit être **spécialisé une seule fois** avant utilisation.

### 📖 Guide Complet des Agents

Pour plus de détails sur l'utilisation des agents, consultez le guide complet :

**📁 [GUIDE-AGENTS-CURSOR.md](./GUIDE-AGENTS-CURSOR.md)**

Ce guide contient :

- Vue d'ensemble des 4 agents
- Instructions détaillées pour chaque agent
- Exemples de prompts à utiliser
- Recommandations de modèles (Claude Sonnet 4.5, Composer, Auto)

---

### Agent 1 : Architecte Nx

**Rôle** : Structure du monorepo, organisation des libs, configuration Nx

**Modèle Recommandé** : Claude Sonnet 4.5

**Prompt de Spécialisation** :

📁 **Fichier complet** : `.cursor/rules/agents/agent-architecte-nx-prompt.md`

**Comment spécialiser** :

1. Ouvrir le fichier `.cursor/rules/agents/agent-architecte-nx-prompt.md`
2. Sélectionner tout le contenu (Ctrl+A / Cmd+A)
3. Copier (Ctrl+C / Cmd+C)
4. Ouvrir Cursor et créer une nouvelle conversation
5. Coller le contenu complet dans le chat
6. Envoyer le message

**Alternative** : Dans Cursor, taper `@agent-architecte-nx-prompt.md`

---

### Agent 2 : Développeur Angular

**Rôle** : Composants, services, routing, tests unitaires Angular 20

**Modèle Recommandé** : Composer

**Prompt de Spécialisation** :

📁 **Fichier complet** : `.cursor/rules/agents/agent-developpeur-angular-prompt.md`

**Comment spécialiser** :

1. Ouvrir le fichier `.cursor/rules/agents/agent-developpeur-angular-prompt.md`
2. Sélectionner tout le contenu (Ctrl+A / Cmd+A)
3. Copier (Ctrl+C / Cmd+C)
4. Ouvrir Cursor et créer une nouvelle conversation
5. Coller le contenu complet dans le chat
6. Envoyer le message

**Alternative** : Dans Cursor, taper `@agent-developpeur-angular-prompt.md`

---

### Agent 3 : Styliste Frontend

**Rôle** : Bootstrap 5, SCSS, design responsive, accessibilité

**Modèle Recommandé** : Composer ou Auto

**Prompt de Spécialisation** :

📁 **Fichier complet** : `.cursor/rules/agents/agent-styliste-frontend-prompt.md`

**Comment spécialiser** :

1. Ouvrir le fichier `.cursor/rules/agents/agent-styliste-frontend-prompt.md`
2. Sélectionner tout le contenu (Ctrl+A / Cmd+A)
3. Copier (Ctrl+C / Cmd+C)
4. Ouvrir Cursor et créer une nouvelle conversation
5. Coller le contenu complet dans le chat
6. Envoyer le message

**Alternative** : Dans Cursor, taper `@agent-styliste-frontend-prompt.md`

---

### Agent 4 : Intégrateur API & Tests E2E

**Rôle** : json-server, services HTTP, interceptors, debugging, tests E2E

**Modèle Recommandé** : Claude Sonnet 4.5 ou Composer

**Prompt de Spécialisation** :

📁 **Fichier complet** : `.cursor/rules/agents/agent-integrateur-api-prompt.md`

**Comment spécialiser** :

1. Ouvrir le fichier `.cursor/rules/agents/agent-integrateur-api-prompt.md`
2. Sélectionner tout le contenu (Ctrl+A / Cmd+A)
3. Copier (Ctrl+C / Cmd+C)
4. Ouvrir Cursor et créer une nouvelle conversation
5. Coller le contenu complet dans le chat
6. Envoyer le message

**Alternative** : Dans Cursor, taper `@agent-integrateur-api-prompt.md`

---

### ⚠️ Important

- **Une seule fois** : Chaque agent doit être spécialisé **une seule fois par conversation**
- **Nouvelle conversation** : Si vous ouvrez une nouvelle conversation, vous devez re-spécialiser l'agent
- **Modèle** : Choisissez le modèle recommandé pour chaque agent avant de le spécialiser
- **Guide complet** : Consultez [GUIDE-AGENTS-CURSOR.md](./GUIDE-AGENTS-CURSOR.md) pour plus de détails

---

# Guide : Exécution du STARTER-PROMPT.md

## Vue d'ensemble

Ce guide présente **deux approches** pour exécuter le `STARTER-PROMPT.md` et créer l'application Mini CRM complète. Vous allez tester les deux approches pour comprendre leurs avantages et inconvénients.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :

- [ ] Un projet Angular 20 créé avec Nx (monorepo)
- [ ] Cursor ouvert avec les règles configurées (`.cursor/rules/*.mdc`)
- [ ] Le fichier `STARTER-PROMPT.md` à la racine du projet
- [ ] Aucun code généré (projet vierge ou nouveau projet)

## 🎯 Les Deux Approches

### Approche 1 : Exécution Complète (Rapide)

**Principe** : Un seul prompt pour créer toute l'application d'un coup.

**Avantages** :

- ✅ **Rapide** : Tout est créé en une seule fois
- ✅ **Vision d'ensemble** : L'agent voit toute la structure et peut optimiser l'ordre
- ✅ **Cohérence** : Toutes les dépendances sont gérées ensemble

**Inconvénients** :

- ⚠️ **Risque de surcharge** : Beaucoup de fichiers à créer simultanément (30+ fichiers)
- ⚠️ **Difficile à suivre** : Beaucoup de changements en même temps
- ⚠️ **Erreurs en cascade** : Si une étape échoue, tout peut être impacté
- ⚠️ **Moins pédagogique** : Difficile de comprendre ce qui se passe étape par étape

### Approche 2 : Exécution par Phases (Pédagogique)

**Principe** : Diviser le STARTER-PROMPT en 3 phases logiques avec vérification entre chaque phase.

**Avantages** :

- ✅ **Contrôle** : Vérifier chaque étape avant de continuer
- ✅ **Pédagogique** : Comprendre chaque partie pendant la formation
- ✅ **Moins d'erreurs** : Corriger au fur et à mesure
- ✅ **Apprentissage progressif** : Voir comment chaque partie s'imbrique

**Inconvénients** :

- ⚠️ **Plus long** : Plusieurs prompts nécessaires
- ⚠️ **Risque d'oublier des dépendances** : Si on saute une étape

---

## 🚀 Approche 1 : Exécution Complète

### Instructions pour les Stagiaires

1. **Ouvrir Composer** (`Ctrl+I`) ou **Chat** (`Ctrl+L`)
2. **Copier-coller le prompt ci-dessous**
3. **Attendre la génération complète**
4. **Vérifier** : `npm run build` pour s'assurer que tout compile

### Prompt à Utiliser

```
@STARTER-PROMPT.md
Exécute toutes les instructions du STARTER-PROMPT.md pour créer l'application complète.
Respecte scrupuleusement toutes les règles et la structure de dossiers.
Tout doit compiler et fonctionner immédiatement.
```

### Ce qui va se passer

L'agent va créer **tous les fichiers** en une seule fois :

- Configuration (`project.json`, `package.json`, `db.json`)
- Structure de dossiers complète
- Models (auth.model.ts, order.model.ts)
- Shared Components (Spinner, ConfirmModal)
- Layout System (LayoutComponent, Header, Sidebar)
- App Component
- Feature Auth (non fonctionnelle)
- Feature Orders (100% fonctionnelle)
- Routes et configuration

### Vérification Après Génération

1. **Compiler** : `npm run build`
2. **Vérifier les fichiers** : Explorer la structure créée
3. **Lancer le serveur** : `npm start`
4. **Tester** : Vérifier que l'application fonctionne

### Points d'Attention

- ⚠️ Si l'agent oublie des fichiers, lui demander de compléter
- ⚠️ Vérifier que tous les imports sont corrects
- ⚠️ S'assurer que `angular.json` et `package.json` sont bien modifiés

---

## 📚 Approche 2 : Exécution par Phases

### Instructions pour les Stagiaires

Cette approche divise le STARTER-PROMPT en **3 phases logiques**. Après chaque phase, vous devez :

1. **Vérifier** que tout compile (`npm run build`)
2. **Explorer** les fichiers créés
3. **Comprendre** ce qui a été fait
4. **Passer à la phase suivante** uniquement si tout est OK

---

### Phase 1 : Configuration de Base

**Objectif** : Configurer l'environnement et créer la structure de base.

#### Prompt Phase 1

```
@STARTER-PROMPT.md
Exécute les sections 1 à 4 du STARTER-PROMPT.md :

1. Créer les libs Nx :
   - Créer shared-ui, data-access, feature-auth, feature-orders, layout
   - Nx génère automatiquement les alias TypeScript

2. Configuration project.json :
   - Ajouter schematics pour OnPush et SCSS
   - Ajouter Bootstrap CSS et Icons dans styles
   - Ajouter Bootstrap JS dans scripts (si nécessaire)

3. Dépendances à installer (instructions seulement, ne pas exécuter npm install) :
   - Lister les commandes npm install nécessaires
   - Lister les scripts package.json à ajouter

4. Créer le fichier db.json à la racine avec les données d'exemple

5. Vérifier/créer la structure de dossiers exacte selon la section 4 (structure Nx)

Ne crée PAS encore les fichiers TypeScript/HTML/SCSS, seulement la configuration et la structure.
```

#### Après la Phase 1

**Actions à faire** :

1. **Installer les dépendances** (manuellement) :

   ```bash
   npm install bootstrap bootstrap-icons
   npm install json-server@0.17.4 --save-dev
   npm install json-server-auth@2.1.0 --save-dev
   ```

2. **Vérifier package.json** : Les scripts doivent être ajoutés

3. **Vérifier project.json** : Les configurations doivent être présentes

4. **Vérifier db.json** : Le fichier doit exister à la racine

5. **Vérifier les libs Nx** : Les libs doivent être créées dans `libs/`

6. **Vérifier tsconfig.base.json** : Les alias Nx doivent être présents (`@mini-crm/...`)

**Si tout est OK** → Passer à la Phase 2

---

### Phase 2 : Infrastructure et Composants de Base

**Objectif** : Créer les models, shared components, layout et app component.

#### Prompt Phase 2

```
@STARTER-PROMPT.md @architecture.mdc @project.mdc
Exécute les sections 5 à 9 du STARTER-PROMPT.md :

5. Règles SCSS OBLIGATOIRES :
   - Comprendre la structure avec variables CSS custom
   - Prêt à appliquer dans tous les composants

6. Interfaces et Models :
   - Créer libs/data-access/src/lib/models/auth.model.ts (User, LoginRequest, RegisterRequest, AuthResponse)
   - Créer libs/data-access/src/lib/models/order.model.ts (Order, CreateOrder, UpdateOrder)

7. Shared UI Components (libs/shared-ui) :
   - Créer libs/shared-ui/src/lib/spinner/ (SpinnerComponent avec template inline et SCSS)
   - Créer libs/shared-ui/src/lib/confirm-modal/ (ConfirmModalComponent avec inputs/outputs et SCSS)

8. Layout System (libs/layout) :
   - Créer libs/layout/src/lib/layout.component.* (avec content projection et logique conditionnelle)
   - Créer libs/layout/src/lib/header/header.component.*
   - Créer libs/layout/src/lib/sidebar/sidebar.component.*
   - Tous avec fichiers SCSS et variables CSS custom

9. App Component (apps/mini-crm/src/app) :
   - Modifier app.component.ts (supprimer code généré, importer depuis `@mini-crm/layout`)
   - Modifier app.component.html (utiliser LayoutComponent avec projections)
   - Modifier app.component.scss si nécessaire
   - **Utiliser les alias Nx** : `import { LayoutComponent } from '@mini-crm/layout'`

Respecte scrupuleusement les règles SCSS avec variables CSS custom.
```

#### Après la Phase 2

**Actions à faire** :

1. **Compiler** : `npm run build` → Vérifier qu'il n'y a pas d'erreurs
2. **Explorer les fichiers créés** :
   - Vérifier les models
   - Vérifier les shared components
   - Vérifier le layout system
3. **Comprendre** :
   - Comment fonctionne le content projection
   - Comment fonctionne la logique conditionnelle du LayoutComponent
   - La structure des variables CSS custom

**Si tout est OK** → Passer à la Phase 3

---

### Phase 3 : Features (Auth et Orders)

**Objectif** : Créer les features complètes avec routes et configuration.

#### Prompt Phase 3

```
@STARTER-PROMPT.md @architecture.mdc @project.mdc
Exécute les sections 10 à 12 du STARTER-PROMPT.md :

10. Feature Auth (libs/feature-auth - NON fonctionnelle - à compléter en formation) :
    - Créer libs/feature-auth/src/lib/components/sign-in.component.* (formulaire réactif, validation Bootstrap)
    - Créer libs/feature-auth/src/lib/components/sign-up.component.* (formulaire avec validator custom)
    - Créer libs/feature-auth/src/lib/guards/auth.guard.ts (functional guard, retourne true pour l'instant)
    - Créer libs/feature-auth/src/lib/interceptors/auth.interceptor.ts (functional interceptor préparé)
    - Créer libs/feature-auth/src/lib/auth.routes.ts (routes pour sign-in et sign-up)
    - **Note** : Le service auth.service.ts est dans `libs/data-access` (partagé)

11. Feature Orders (libs/feature-orders - 100% fonctionnelle) :
    - Créer libs/feature-orders/src/lib/components/order-form.component.* (dumb, formulaire réactif, computed)
    - Créer libs/feature-orders/src/lib/components/order-list.component.* (smart, table Bootstrap, ConfirmModal)
    - Créer libs/feature-orders/src/lib/components/order-add.component.*
    - Créer libs/feature-orders/src/lib/components/order-edit.component.*
    - Créer libs/feature-orders/src/lib/orders.routes.ts (lazy loading avec alias Nx)
    - **Note** : Le service orders.service.ts est dans `libs/data-access` (partagé)
    - **Imports** : Utiliser `@mini-crm/data-access` et `@mini-crm/shared-ui`

12. App Config et Routes (apps/mini-crm/src/app) :
    - Modifier app.config.ts (provideRouter, provideHttpClient, TODO pour interceptor)
    - Modifier app.routes.ts (routes principales avec lazy loading utilisant les alias Nx)
    - **Exemple** : `loadChildren: () => import('@mini-crm/feature-orders').then(m => m.ORDERS_ROUTES)`

Tous les composants doivent avoir :
- Fichiers SCSS avec variables CSS custom
- OnPush change detection
- Respect des patterns Smart/Dumb components
```

#### Après la Phase 3

**Actions à faire** :

1. **Compiler** : `npm run build` → Vérifier qu'il n'y a pas d'erreurs
2. **Lancer le serveur API** : `npm run server` (dans un terminal séparé)
3. **Lancer l'application** : `npm start` (dans un autre terminal)
4. **Tester** :
   - Vérifier que l'application démarre
   - Tester la navigation
   - Tester la feature Orders (CRUD complet)
   - Vérifier que l'authentification affiche les formulaires (même si non fonctionnelle)

**Si tout fonctionne** → ✅ Application complète créée !

---

## 📊 Comparaison des Approches

### Tableau Comparatif

| Critère             | Approche 1 (Complète)      | Approche 2 (Par Phases)      |
| ------------------- | -------------------------- | ---------------------------- |
| **Temps**           | ⚡ Rapide (1 prompt)       | 🐢 Plus long (3 prompts)     |
| **Complexité**      | 🔴 Élevée (tout d'un coup) | 🟢 Faible (étapes claires)   |
| **Pédagogique**     | ❌ Moins pédagogique       | ✅ Très pédagogique          |
| **Contrôle**        | ❌ Difficile à suivre      | ✅ Contrôle à chaque étape   |
| **Erreurs**         | ⚠️ Erreurs en cascade      | ✅ Correction progressive    |
| **Apprentissage**   | ❌ Difficile de comprendre | ✅ Compréhension progressive |
| **Recommandé pour** | Développeurs expérimentés  | Formation et apprentissage   |

### Quand Utiliser Chaque Approche

#### Approche 1 (Complète) - Utiliser si :

- ✅ Vous êtes expérimenté avec Angular
- ✅ Vous voulez aller vite
- ✅ Vous avez déjà fait ce type de projet
- ✅ Vous préférez voir le résultat final rapidement

#### Approche 2 (Par Phases) - Utiliser si :

- ✅ Vous êtes en formation
- ✅ Vous voulez comprendre chaque étape
- ✅ Vous préférez apprendre progressivement
- ✅ Vous voulez éviter les erreurs

---

## 🎓 Instructions pour les Stagiaires

### Test des Deux Approches

Vous allez tester **les deux approches** pour comparer :

1. **Premier test** : Utilisez l'**Approche 1 (Complète)**

   - Notez le temps pris
   - Notez les difficultés rencontrées
   - Notez ce que vous avez compris

2. **Deuxième test** : Utilisez l'**Approche 2 (Par Phases)**

   - Notez le temps pris
   - Notez les difficultés rencontrées
   - Notez ce que vous avez compris

3. **Comparaison** : Discutez avec votre formateur des différences

### Checklist de Vérification

Après chaque approche, vérifiez :

- [ ] L'application compile sans erreurs (`npm run build`)
- [ ] Le serveur démarre (`npm start`)
- [ ] L'API fonctionne (`npm run server`)
- [ ] La navigation fonctionne
- [ ] La feature Orders est fonctionnelle (CRUD)
- [ ] Les formulaires d'authentification s'affichent
- [ ] Tous les fichiers SCSS ont des variables CSS custom
- [ ] Tous les composants ont OnPush change detection

### Questions à Se Poser

Après chaque approche, réfléchissez à :

1. **Quelle approche avez-vous préférée ? Pourquoi ?**
2. **Quelle approche vous a permis de mieux comprendre le code ?**
3. **Quelle approche était la plus rapide ?**
4. **Quelle approche avait le moins d'erreurs ?**
5. **Quelle approche recommanderiez-vous à un débutant ?**

---

## 🚨 Dépannage

### Problèmes Courants

#### L'agent oublie de créer les libs Nx

**Solution** : Demander explicitement à l'agent de créer les libs d'abord

```
Crée d'abord les libs Nx nécessaires :
- npx nx g @nx/angular:library shared-ui --unitTestRunner=vitest
- npx nx g @nx/angular:library data-access --unitTestRunner=vitest
- npx nx g @nx/angular:library feature-auth --unitTestRunner=vitest
- npx nx g @nx/angular:library feature-orders --unitTestRunner=vitest
- npx nx g @nx/angular:library layout --unitTestRunner=vitest
```

#### L'agent oublie des fichiers

**Solution** : Demander explicitement à l'agent de compléter

```
@STARTER-PROMPT.md
Vérifie que tous les fichiers de la section X ont été créés dans les bonnes libs Nx.
Crée les fichiers manquants.
```

#### Erreurs de compilation

**Solution** : Demander à l'agent de corriger

```
Il y a des erreurs de compilation. Analyse les erreurs et corrige-les.
```

#### Fichiers SCSS manquants

**Solution** : Rappeler les règles

```
@project.mdc
Tous les composants doivent avoir un fichier SCSS séparé avec variables CSS custom.
Crée les fichiers SCSS manquants.
```

#### Structure de dossiers incorrecte

**Solution** : Référencer la structure Nx exacte

```
@STARTER-PROMPT.md
La structure de dossiers ne correspond pas à la section 4 (structure Nx).
Corrige la structure pour utiliser les libs Nx (libs/shared-ui, libs/data-access, etc.).
```

#### Imports incorrects (chemins relatifs au lieu d'alias Nx)

**Solution** : Rappeler d'utiliser les alias Nx

```
Utilise les alias Nx pour tous les imports entre libs :
- @mini-crm/shared-ui
- @mini-crm/data-access
- @mini-crm/feature-auth
- @mini-crm/feature-orders
- @mini-crm/layout

Ne pas utiliser de chemins relatifs entre libs.
```

---

## 📝 Notes Finales

### Conseils pour les Stagiaires

1. **Prenez votre temps** : Ne vous précipitez pas, surtout avec l'Approche 1
2. **Explorez le code** : Après chaque phase, regardez ce qui a été créé
3. **Posez des questions** : Si quelque chose n'est pas clair, demandez
4. **Testez régulièrement** : Compilez et testez après chaque phase
5. **Notez vos observations** : Comparez les deux approches

### Prochaines Étapes

Après avoir créé le starter :

1. **Explorer le code** : Comprendre chaque partie
2. **Tester l'application** : Vérifier que tout fonctionne
3. **Compléter l'authentification** : Connecter à json-server-auth
4. **Ajouter des features** : Utiliser les 4 agents pour créer de nouvelles features

---

## 📚 Ressources

- **STARTER-PROMPT.md** : Instructions complètes du starter
- **GUIDE-AGENTS-CURSOR.md** : Guide pour utiliser les agents
- **Architecture** : `.cursor/rules/architecture.mdc`
- **Règles projet** : `.cursor/rules/project.mdc`

---

**Bon courage avec votre formation ! 🚀**
