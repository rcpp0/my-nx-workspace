# Guide : Utilisation des 4 Agents Spécialisés dans Cursor

Ce guide explique comment utiliser les **4 agents spécialisés** configurés pour ce projet Mini CRM. Chaque agent a un domaine d'expertise spécifique et peut être sollicité avec des prompts ciblés.

---

## 🎯 Vue d'Ensemble

| Agent                              | Rôle Principal                                 | Quand l'utiliser                                    | Modèle Recommandé             |
| ---------------------------------- | ---------------------------------------------- | --------------------------------------------------- | ----------------------------- |
| **1. Architecte Nx**               | Structure du monorepo, organisation des libs   | Créer des libs, organiser le code, configurer Nx    | Claude Sonnet 4.5             |
| **2. Développeur Angular**         | Composants, services, routing, tests unitaires | Développer des features, écrire des tests unitaires | Composer                      |
| **3. Styliste Frontend**           | Bootstrap, SCSS, design, responsive            | Styliser des composants, créer des designs          | Composer ou Auto              |
| **4. Intégrateur API & Tests E2E** | json-server, HTTP, debugging, tests E2E        | Intégrer des APIs, debugger, écrire des tests E2E   | Claude Sonnet 4.5 ou Composer |

---

## 📋 Avant de Commencer

### Étape 1 : Spécialiser les Agents (Une Seule Fois)

Avant d'utiliser les agents, vous devez les **spécialiser** en leur donnant le prompt de spécialisation correspondant dans Cursor.

**📍 Où trouver les prompts de spécialisation** :

- **Agent 1 (Architecte Nx)** : Fichier dédié `.cursor/rules/agents/agent-architecte-nx-prompt.md` (voir section détaillée ci-dessous)
- **Agents 2, 3, 4** : Prompts directement dans leurs sections respectives ci-dessous

**Comment faire** :

**Méthode recommandée (copier-coller)** :

1. Ouvrir le fichier de prompt de spécialisation correspondant
   - Agent 1 : `.cursor/rules/agents/agent-architecte-nx-prompt.md`
   - Agents 2-4 : Section "Prompt de Spécialisation" dans ce guide
2. Sélectionner tout le contenu (Ctrl+A / Cmd+A)
3. Copier (Ctrl+C / Cmd+C)
4. Ouvrir Cursor et créer une nouvelle conversation
5. Coller le contenu complet dans le chat
6. Envoyer le message

**Méthode alternative (référence fichier - Agent 1 uniquement)** :

1. Dans Cursor, taper `@` suivi du nom du fichier
2. Exemple : `@agent-architecte-nx-prompt.md`
3. Cursor inclura le contenu du fichier

**⚠️ Important** :

- Cette étape n'est nécessaire qu'**une seule fois par agent**
- Après la spécialisation, l'agent comprend son rôle et peut être utilisé avec des prompts plus courts
- **Recommandation** : Utilisez la méthode copier-coller pour la spécialisation initiale (plus fiable)
- **Pour l'Agent 1** : Utilisez **TOUJOURS** le fichier complet `.cursor/rules/agents/agent-architecte-nx-prompt.md` (plus détaillé que le résumé dans ce guide)

---

## 🤖 Agent 1 : Architecte Nx

### Rôle

Expert en **architecture Nx et organisation de monorepos Angular**. Aide à structurer le code, générer des libs, configurer les alias TypeScript, et respecter les frontières de dépendances.

### 💡 Modèle Recommandé

**Claude Sonnet 4.5** (ou Opus si disponible)

**Pourquoi ?**

L'architecture Nx nécessite une compréhension rigoureuse des règles strictes et des frontières de dépendances. Claude Sonnet excelle dans :

- La compréhension des contraintes architecturales complexes
- L'application rigoureuse des règles de dépendances
- Les explications claires des décisions architecturales
- La détection des violations des frontières de dépendances

**Alternative** : Composer (bon pour générer des commandes Nx, mais moins rigoureux sur les règles architecturales)

### Prompt de Spécialisation

**📁 Fichier complet** : `.cursor/rules/agents/agent-architecte-nx-prompt.md`

**💡 Pourquoi un fichier dédié ?**

L'Agent 1 (Architecte Nx) a un fichier de prompt dédié car l'architecture Nx est un domaine complexe qui nécessite :

- Des explications détaillées sur les frontières de dépendances
- Une checklist complète avant de générer du code
- Des exemples concrets de décisions architecturales
- Une liste d'erreurs courantes à éviter

Ce fichier complet garantit que l'agent comprend parfaitement son rôle et les contraintes architecturales du projet.

**⚠️ Important** : Utilisez **TOUJOURS** le fichier complet ci-dessus pour spécialiser l'agent. Ce fichier contient toutes les informations détaillées nécessaires. Ne vous contentez pas du résumé ci-dessous.

**Comment utiliser** :

1. **Méthode recommandée (copier-coller)** :

   - Ouvrir le fichier `.cursor/rules/agents/agent-architecte-nx-prompt.md`
   - Sélectionner tout le contenu (Ctrl+A / Cmd+A)
   - Copier (Ctrl+C / Cmd+C)
   - Coller dans Cursor et envoyer

2. **Méthode alternative (référence fichier)** :
   - Dans Cursor, taper : `@agent-architecte-nx-prompt.md`
   - Cursor inclura le contenu du fichier

**Résumé du contenu du prompt complet** :

Le prompt complet couvre :

- 🎯 Rôle et mission de l'agent
- 📚 Connaissances de base (références aux règles du projet)
- 🏗️ Structure Nx à respecter (organisation des libs)
- Règles de dépendances strictes
- Selectors (`lib-` vs `app-`)
- 🛠️ Commandes Nx à utiliser
- 📝 Alias TypeScript
- 🎯 Décisions architecturales (où placer composants/services)
- ✅ Checklist avant de générer du code
- 🚀 Exemples de prompts que l'agent peut traiter
- ⚠️ Erreurs courantes à éviter
- 📖 Références et documentation

### Exemples de Prompts à Utiliser

#### ✅ Exemples Excellents

1. **Créer une nouvelle feature**

   ```
   En tant qu'expert en architecture Nx avec 10 ans d'expérience, génère une nouvelle
   feature "contacts" pour gérer les contacts clients.

   Format souhaité : Liste à puces avec les étapes à suivre, puis génération du code.

   Contexte : Je veux une lib feature-contacts avec une structure de dossiers standard
   (components/, services/, routes/). La feature doit pouvoir dépendre de shared-ui
   et data-access selon les règles Nx.
   ```

2. **Organiser le code existant**

   ```
   En tant qu'architecte Nx senior, détermine où déplacer un composant selon
   les frontières de dépendances Nx.

   Format souhaité : Réponse structurée avec justification en 2-3 phrases,
   puis commande Nx exacte à exécuter.

   Contexte : J'ai un composant ContactListComponent qui est actuellement dans
   feature-orders, mais il devrait être dans feature-contacts. Y a-t-il des
   dépendances à vérifier avant le déplacement ?
   ```

3. **Générer une lib partagée**

   ```
   En tant qu'expert Nx, génère une lib partagée avec la configuration complète.

   Format souhaité : Tableau récapitulatif de la structure générée, puis
   commandes Nx à exécuter dans l'ordre.

   Contexte : Je veux créer une lib shared-utils pour des fonctions utilitaires
   (formatDate, formatCurrency). La lib doit être utilisable par toutes les features
   sans créer de dépendances circulaires. Configure les alias TypeScript @mini-crm/shared-utils.
   ```

4. **Vérifier la structure**

   ```
   En tant qu'auditeur d'architecture Nx, analyse la structure du projet et
   identifie les violations des bonnes pratiques.

   Format souhaité : Rapport structuré avec liste des problèmes (si existants)
   et recommandations d'amélioration sous forme de tableau.

   Contexte : Analyse la structure actuelle du projet dans libs/ et vérifie
   si elle respecte les bonnes pratiques Nx. Y a-t-il des violations des
   frontières de dépendances ? Les selectors utilisent-ils les bons préfixes (lib- vs app-) ?
   ```

5. **Configurer les routes lazy loading**

   ```
   En tant qu'expert Angular/Nx, configure une route lazy-loadée avec les
   alias TypeScript Nx.

   Format souhaité : Code TypeScript complet avec commentaires explicatifs,
   puis explication en 2-3 phrases des avantages du lazy loading.

   Contexte : Je veux ajouter une route lazy-loadée pour la feature contacts
   dans app.routes.ts. La route doit utiliser l'alias @mini-crm/feature-contacts
   et charger le fichier routes.ts de la feature.
   ```

#### ❌ Exemples à Éviter (Trop Vagues)

- "Organise le code" (trop vague, pas de contexte)
- "Crée une lib" (quelle lib ? pour quoi ?)
- "Corrige les imports" (quels imports ? où ?)

---

## 💻 Agent 2 : Développeur Angular

### Rôle

Expert en **développement Angular 20** : composants standalone, services, signals, reactive forms, routing, et **tests unitaires avec Vitest**.

### 💡 Modèle Recommandé

**Composer**

**Pourquoi ?**

Le développement Angular nécessite une génération de code efficace et précise. Composer excelle dans :

- La génération rapide de composants, services et tests
- La compréhension de la syntaxe Angular moderne (@if, @for, signals)
- Le respect des conventions strictes (OnPush, inject(), input()/output())
- L'écriture de tests Vitest avec la bonne configuration
- L'intégration avec les règles Cursor du projet

**Alternative** : Claude Sonnet 4.5 (excellent pour la compréhension des patterns et les explications, mais moins rapide pour générer du code)

### Prompt de Spécialisation

**📁 Fichier complet** : `.cursor/rules/agents/agent-developpeur-angular-prompt.md`

**⚠️ Important** : Utilisez **TOUJOURS** le fichier complet ci-dessus pour spécialiser l'agent. Ce fichier contient toutes les informations détaillées nécessaires.

**Comment utiliser** :

1. **Méthode recommandée (copier-coller)** :

   - Ouvrir le fichier `.cursor/rules/agents/agent-developpeur-angular-prompt.md`
   - Sélectionner tout le contenu (Ctrl+A / Cmd+A)
   - Copier (Ctrl+C / Cmd+C)
   - Coller dans Cursor et envoyer

2. **Méthode alternative (référence fichier)** :
   - Dans Cursor, taper : `@agent-developpeur-angular-prompt.md`
   - Cursor inclura le contenu du fichier

**Résumé du contenu du prompt complet** :

Le prompt complet couvre :

- 🎯 Rôle et mission de l'agent
- 📚 Connaissances de base (références aux règles du projet)
- 🛠️ Stack technique du projet
- 💻 Conventions Angular 20 (components, services, routing, guards, interceptors)
- 🧪 Tests unitaires avec Vitest (configuration, patterns, exemples)
- ✅ Checklist avant de générer du code
- 🚀 Exemples de prompts que l'agent peut traiter
- ⚠️ Erreurs courantes à éviter
- 📖 Références et documentation

### Exemples de Prompts à Utiliser

#### ✅ Exemples Excellents

1. **Créer un composant avec formulaire**

   ```
   En tant qu'expert Angular 20 avec 8 ans d'expérience, crée un composant
   avec formulaire réactif suivant les best practices Angular 20.

   Format souhaité : Code TypeScript complet avec template HTML séparé,
   puis liste des fonctionnalités implémentées sous forme de puces.

   Contexte : Je veux créer un composant ContactFormComponent dans feature-contacts
   avec un formulaire réactif pour créer/modifier un contact. Les champs sont :
   nom (required), email (required, email), téléphone (optional). Utilise FormBuilder,
   les validators Angular, changeDetection OnPush, et les fonctions input()/output()
   au lieu des décorateurs.
   ```

2. **Implémenter un service avec signals**

   ```
   En tant qu'expert Angular Signals, implémente un service avec gestion d'état
   basée sur les signals suivant le pattern d'encapsulation.

   Format souhaité : Code TypeScript complet avec commentaires expliquant le pattern,
   puis diagramme ASCII du flux de données.

   Contexte : Je veux créer un ContactsService dans data-access qui :
   - Expose un signal contacts() (readonly public)
   - Expose un signal loading() (readonly public)
   - A une méthode loadContacts() qui fait un GET /contacts
   - Gère les erreurs avec un signal error() (readonly public)
   Utilise le pattern d'encapsulation avec signals privés (writable) et expose
   uniquement des signals readonly.
   ```

3. **Écrire des tests unitaires**

   ```
   En tant qu'expert en tests unitaires Vitest pour Angular 20, écris une suite
   de tests complète suivant le pattern Arrange-Act-Assert.

   Format souhaité : Code de test complet avec descriptions explicites,
   puis tableau récapitulatif des cas de test couverts.

   Contexte : Écris des tests unitaires Vitest pour ContactFormComponent :
   - Test que le formulaire est invalide si nom manquant
   - Test que le formulaire est valide avec données correctes
   - Test que la méthode onSubmit() est appelée au submit
   Utilise provideZonelessChangeDetection(), fixture.whenStable() au lieu de
   detectChanges(), et mocks les dépendances avec vi.mock().
   ```

4. **Créer des routes avec guards**

   ```
   En tant qu'expert Angular Routing, configure un système de routes avec
   guards fonctionnels et lazy loading.

   Format souhaité : Code TypeScript complet pour routes.ts avec guards,
   puis explication du flux de navigation en 3-4 phrases.

   Contexte : Je veux créer des routes pour feature-contacts :
   - /contacts : liste (ContactListComponent)
   - /contacts/new : création (ContactFormComponent)
   - /contacts/:id/edit : édition (ContactFormComponent)
   Ajoute un guard auth fonctionnel qui redirige vers /auth/sign-in si non authentifié.
   Utilise inject() pour les dépendances et canActivate() fonctionnel.
   ```

5. **Tester un signal computed**

   ```
   En tant qu'expert en tests Angular Signals, écris un test unitaire pour
   vérifier le comportement d'un signal computed.

   Format souhaité : Code de test complet avec assertions détaillées,
   puis explication du comportement du signal computed en 2-3 phrases.

   Contexte : Écris un test pour vérifier qu'un signal computed totalContacts()
   dans ContactsService retourne le bon nombre de contacts. Le signal doit se
   mettre à jour automatiquement quand la liste de contacts change. Utilise
   effect() ou toSignal() si nécessaire pour tester la réactivité.
   ```

#### ❌ Exemples à Éviter

- "Crée un composant" (quel composant ? quelles fonctionnalités ?)
- "Écris des tests" (quels tests ? pour quoi ?)
- "Configure les routes" (quelles routes ? pour quelle feature ?)

---

## 🎨 Agent 3 : Styliste Frontend

### Rôle

Expert en **Bootstrap 5, SCSS, variables CSS, design responsive, et accessibilité**. Aide à styliser les composants, créer des designs cohérents, et respecter les standards WCAG AA.

### 💡 Modèle Recommandé

**Composer** ou **Auto**

**Pourquoi ?**

Le styling frontend nécessite principalement de la génération de code CSS/SCSS et HTML. Composer excelle dans :

- La génération rapide de fichiers SCSS avec variables CSS
- La création de layouts Bootstrap responsive
- L'application des classes Bootstrap appropriées
- La génération de code HTML avec attributs ARIA

**Alternative** : Auto fonctionne aussi très bien pour le styling, car les tâches sont généralement simples et directes.

### Prompt de Spécialisation

**📁 Fichier complet** : `.cursor/rules/agents/agent-styliste-frontend-prompt.md`

**⚠️ Important** : Utilisez **TOUJOURS** le fichier complet ci-dessus pour spécialiser l'agent. Ce fichier contient toutes les informations détaillées nécessaires.

**Comment utiliser** :

1. **Méthode recommandée (copier-coller)** :

   - Ouvrir le fichier `.cursor/rules/agents/agent-styliste-frontend-prompt.md`
   - Sélectionner tout le contenu (Ctrl+A / Cmd+A)
   - Copier (Ctrl+C / Cmd+C)
   - Coller dans Cursor et envoyer

2. **Méthode alternative (référence fichier)** :
   - Dans Cursor, taper : `@agent-styliste-frontend-prompt.md`
   - Cursor inclura le contenu du fichier

**Résumé du contenu du prompt complet** :

Le prompt complet couvre :

- 🎯 Rôle et mission de l'agent
- 📚 Connaissances de base (références aux règles du projet)
- 🛠️ Stack technique du projet
- 🎨 Règles SCSS strictes (interdits et obligatoires)
- 📐 Structure d'un fichier SCSS (template standard)
- Variables CSS custom et Bootstrap
- 🎯 Hiérarchie des styles (priorité)
- 🎨 Composants Bootstrap 5 à utiliser
- 📱 Design responsive (breakpoints, classes, media queries)
- ♿ Accessibilité WCAG AA (contrastes, ARIA, navigation clavier)
- ✅ Checklist avant de générer du code
- 🚀 Exemples de prompts que l'agent peut traiter
- ⚠️ Erreurs courantes à éviter
- 📖 Références et documentation

### Exemples de Prompts à Utiliser

#### ✅ Exemples Excellents

1. **Styliser un composant avec Bootstrap**

   ```
   En tant qu'expert Bootstrap 5 avec 7 ans d'expérience, stylise un composant
   en utilisant les classes utilitaires Bootstrap en priorité.

   Format souhaité : Code HTML avec classes Bootstrap, puis fichier SCSS séparé
   avec variables CSS custom, et liste des composants Bootstrap utilisés.

   Contexte : Je veux styliser ContactListComponent avec :
   - Une table Bootstrap responsive avec hover (table-hover)
   - Des boutons d'action (éditer, supprimer) avec Bootstrap Icons (bi-pencil, bi-trash)
   - Un spinner Bootstrap pendant le chargement (spinner-border)
   - Des alertes Bootstrap pour les erreurs (alert-danger)
   Utilise les classes Bootstrap en priorité, puis variables CSS custom dans :host {}
   pour les personnalisations.
   ```

2. **Créer un design responsive**

   ```
   En tant qu'expert en design responsive Bootstrap, crée un layout adaptatif
   suivant les breakpoints Bootstrap 5.

   Format souhaité : Code HTML avec classes responsive, fichier SCSS avec media queries,
   puis tableau des breakpoints utilisés avec leurs comportements.

   Contexte : Je veux que ContactFormComponent soit :
   - Centré sur desktop (max-width 600px, margin auto)
   - Plein écran sur mobile (< 768px)
   - Card Bootstrap avec shadow (card, shadow-sm)
   - Formulaire avec validation visuelle (is-invalid, invalid-feedback)
   Utilise les classes Bootstrap responsive (col-md-*, d-md-flex) et les variables
   CSS custom pour les espacements.
   ```

3. **Utiliser les variables CSS**

   ```
   En tant qu'expert en theming CSS, crée un système de variables CSS custom
   réutilisable et modifiable à la volée.

   Format souhaité : Fichier SCSS avec variables CSS dans :host {}, puis
   tableau récapitulatif des variables avec leurs valeurs par défaut et leur usage.

   Contexte : Je veux créer un thème pour ContactCardComponent avec variables CSS :
   - --card-bg : fond de la card (var(--bs-white) par défaut)
   - --card-border : couleur de bordure (var(--bs-border-color) par défaut)
   - --card-padding : padding interne (1rem par défaut)
   - --card-radius : border-radius (var(--bs-border-radius) par défaut)
   Utilise les variables CSS Bootstrap (var(--bs-primary), etc.) comme valeurs
   par défaut pour permettre le theming.
   ```

4. **Créer un design accessible**

   ```
   En tant qu'expert en accessibilité WCAG AA, rends un composant accessible
   aux utilisateurs de technologies d'assistance.

   Format souhaité : Code HTML avec attributs ARIA et labels, fichier SCSS
   avec contrastes vérifiés, puis checklist d'accessibilité remplie.

   Contexte : Je veux que ContactFormComponent soit accessible WCAG AA :
   - Labels associés aux inputs (for/id avec form-label)
   - Messages d'erreur accessibles aux screen readers (aria-describedby, aria-invalid)
   - Navigation clavier fonctionnelle (tabindex, focus visible)
   - Contrastes de couleurs respectés (minimum 4.5:1 pour texte normal)
   Ajoute les attributs ARIA nécessaires et teste avec un lecteur d'écran.
   ```

5. **Styliser un modal**

   ```
   En tant qu'expert Bootstrap Modals, crée un modal fonctionnel avec l'API
   JavaScript Bootstrap et un design cohérent.

   Format souhaité : Code HTML complet du modal, code TypeScript pour l'ouverture/fermeture,
   fichier SCSS avec personnalisations, puis instructions d'utilisation en 3-4 phrases.

   Contexte : Je veux créer un modal Bootstrap pour confirmer la suppression d'un contact.
   Le modal doit :
   - Utiliser l'API JavaScript Bootstrap (bootstrap.Modal) pour l'ouvrir/fermer
   - Avoir un design cohérent avec le reste de l'application
   - Être accessible (fermeture au clavier, focus trap)
   - Afficher le nom du contact à supprimer
   Utilise les classes Bootstrap modal-* et ajoute des variables CSS custom pour
   les personnalisations si nécessaire.
   ```

#### ❌ Exemples à Éviter

- "Stylise ça" (quoi ? comment ?)
- "Rends-le joli" (trop vague)
- "Ajoute du CSS" (quel CSS ? où ?)

---

## 🔌 Agent 4 : Intégrateur API & Tests E2E

### Rôle

Expert en **json-server, services HTTP, interceptors, debugging, et tests end-to-end**. Aide à intégrer des APIs, debugger des erreurs, et écrire des tests E2E complets.

### 💡 Modèle Recommandé

**Claude Sonnet 4.5** ou **Composer**

**Pourquoi ?**

L'intégration API et le debugging nécessitent à la fois de la rigueur et de la génération de code :

- **Claude Sonnet 4.5** excelle dans :
  - Le debugging méthodique et systématique
  - L'analyse des erreurs HTTP complexes
  - Les explications détaillées des problèmes
  - La création de tests E2E avec Page Object Model
- **Composer** excelle dans :
  - La génération rapide de services HTTP
  - La création d'interceptors et guards
  - L'écriture de tests E2E

**Recommandation** : Utilisez **Claude Sonnet 4.5** si vous avez des problèmes de debugging complexes, sinon **Composer** pour la génération de code.

### Prompt de Spécialisation

**📁 Fichier complet** : `.cursor/rules/agents/agent-integrateur-api-prompt.md`

**⚠️ Important** : Utilisez **TOUJOURS** le fichier complet ci-dessus pour spécialiser l'agent. Ce fichier contient toutes les informations détaillées nécessaires.

**Comment utiliser** :

1. **Méthode recommandée (copier-coller)** :

   - Ouvrir le fichier `.cursor/rules/agents/agent-integrateur-api-prompt.md`
   - Sélectionner tout le contenu (Ctrl+A / Cmd+A)
   - Copier (Ctrl+C / Cmd+C)
   - Coller dans Cursor et envoyer

2. **Méthode alternative (référence fichier)** :
   - Dans Cursor, taper : `@agent-integrateur-api-prompt.md`
   - Cursor inclura le contenu du fichier

**Résumé du contenu du prompt complet** :

Le prompt complet couvre :

- 🎯 Rôle et mission de l'agent
- 📚 Connaissances de base (références aux règles du projet)
- 🛠️ Stack technique du projet (json-server, versions exactes)
- 🔌 Configuration json-server (structure db.json, endpoints REST)
- 💻 Services HTTP avec signals (pattern standard, gestion d'erreurs)
- 🔐 Interceptors fonctionnels (auth, debugging)
- 🛡️ Guards fonctionnels (auth, redirection)
- 🐛 Debugging méthodique (checklist, outils, erreurs courantes)
- 🧪 Tests E2E (Page Object Model, exemples complets)
- ✅ Checklist avant de générer du code
- 🚀 Exemples de prompts que l'agent peut traiter
- ⚠️ Erreurs courantes à éviter
- 📖 Références et documentation

### Exemples de Prompts à Utiliser

#### ✅ Exemples Excellents

1. **Configurer json-server pour une nouvelle ressource**

   ```
   En tant qu'expert json-server avec 5 ans d'expérience, configure une nouvelle
   ressource REST avec les endpoints automatiques.

   Format souhaité : Structure JSON pour db.json, puis tableau récapitulatif
   des endpoints générés automatiquement (GET, POST, PUT, DELETE).

   Contexte : Je veux ajouter une ressource "contacts" dans db.json pour json-server.
   Structure des données : id (number, auto-généré), nom (string, required),
   email (string, required, unique), téléphone (string, optional), createdAt (string, ISO date).
   Configure les endpoints REST automatiques et vérifie que json-server peut les servir
   correctement sur http://localhost:3000.
   ```

2. **Créer un service HTTP avec gestion d'erreurs**

   ```
   En tant qu'expert Angular HTTP avec gestion d'erreurs robuste, crée un service
   HTTP complet avec signals pour l'état et la gestion d'erreurs.

   Format souhaité : Code TypeScript complet du service avec commentaires,
   puis diagramme du flux de gestion d'erreurs, et liste des cas d'erreur gérés.

   Contexte : Je veux créer un ContactsService dans data-access qui :
   - Fait GET /contacts pour charger la liste (retourne Observable<Contact[]>)
   - Fait POST /contacts pour créer (retourne Observable<Contact>)
   - Fait PUT /contacts/:id pour modifier (retourne Observable<Contact>)
   - Fait DELETE /contacts/:id pour supprimer (retourne Observable<void>)
   Gère les erreurs avec un signal error() (type: string | null), affiche des messages
   clairs pour chaque type d'erreur (404, 500, réseau), et expose un signal loading()
   pour l'état de chargement.
   ```

3. **Implémenter l'authentification**

   ```
   En tant qu'expert en authentification Angular avec interceptors et guards,
   implémente un système d'auth complet avec json-server-auth.

   Format souhaité : Code complet pour service auth, interceptor, et guard,
   puis diagramme du flux d'authentification, et tableau des endpoints protégés.

   Contexte : Je veux implémenter l'authentification complète :
   - Interceptor fonctionnel qui ajoute Bearer token aux requêtes (Authorization header)
   - Guard fonctionnel qui redirige vers /auth/sign-in si non authentifié
   - Service auth qui gère login/logout avec json-server-auth (POST /login, POST /logout)
   - Stockage du token dans localStorage ou signal
   Utilise des signals pour l'état d'authentification (isAuthenticated, user),
   inject() pour les dépendances, et gère les erreurs d'authentification (401, 403).
   ```

4. **Debugger une erreur API**

   ```
   En tant qu'expert en debugging Angular et APIs REST, diagnostique une erreur
   HTTP en suivant une méthodologie systématique.

   Format souhaité : Checklist de diagnostic avec étapes numérotées, puis
   solutions possibles sous forme de liste à puces, et commandes à exécuter.

   Contexte : J'ai une erreur 404 quand j'appelle GET /contacts depuis ContactsService.
   Le service utilise HttpClient et l'URL de base est http://localhost:3000.
   Peux-tu m'aider à debugger :
   - Vérifier que json-server tourne sur le port 3000 (processus actif ?)
   - Vérifier la structure de db.json (ressource "contacts" existe ?)
   - Vérifier les headers de la requête (Content-Type, Authorization si nécessaire)
   - Vérifier les logs dans la console Angular et dans json-server
   - Vérifier la configuration de l'interceptor HTTP (si présent)
   ```

5. **Écrire un test E2E**

   ```
   En tant qu'expert en tests E2E avec Playwright/Cypress, écris un scénario
   utilisateur complet suivant le pattern Page Object Model.

   Format souhaité : Code de test complet avec Page Objects séparés, puis
   tableau des étapes du scénario avec assertions, et instructions d'exécution.

   Contexte : Écris un test E2E pour le flux complet de création d'un contact :
   1. Se connecter (si nécessaire) - utiliser les credentials de test
   2. Aller sur /contacts - vérifier que la page se charge
   3. Cliquer sur "Nouveau contact" - vérifier la navigation vers /contacts/new
   4. Remplir le formulaire (nom, email, téléphone) - vérifier la validation
   5. Soumettre le formulaire - vérifier la requête HTTP POST
   6. Vérifier que le contact apparaît dans la liste - vérifier le contenu de la table
   7. Vérifier le message de succès (si présent)
   Utilise Page Object Model si possible, attends les requêtes réseau avec waitForResponse(),
   et utilise des sélecteurs robustes (data-testid ou classes stables).
   ```

#### ❌ Exemples à Éviter

- "Configure l'API" (quelle API ? quels endpoints ?)
- "Debug ça" (quelle erreur ? où ?)
- "Écris des tests E2E" (quels scénarios ?)

---

## 🎓 Bonnes Pratiques Générales

### 1. Spécialiser d'Abord

Avant d'utiliser un agent, donnez-lui d'abord son **prompt de spécialisation** (une seule fois). Après cela, vous pouvez utiliser des prompts plus courts.

### 2. Structure d'un Bon Prompt : Tâche + Contexte

Un bon prompt suit un cadre simple : **Tâche** (rôle + format) + **Contexte**.

#### La Tâche

La tâche doit inclure :

- **Le rôle** : L'expertise que vous attribuez à l'agent (ex: "En tant qu'expert Angular 20 avec 8 ans d'expérience")
- **Le format** : La forme souhaitée du résultat (ex: "sous forme de liste à puces", "dans un tableau", "avec des exemples de code")

#### Le Contexte

Le contexte inclut les détails qui aident l'agent à comprendre :

- **Où** : Dans quelle lib/feature ?
- **Quoi** : Quel composant/service ?
- **Comment** : Quelles fonctionnalités ?
- **Contraintes** : Quelles règles à respecter ?

#### Exemples Comparés

❌ **Mauvais** (trop vague) :

```
Créer un formulaire
```

✅ **Bon** (tâche + contexte) :

```
En tant qu'expert Angular 20 avec 8 ans d'expérience, crée un composant
avec formulaire réactif suivant les best practices Angular 20.

Format souhaité : Code TypeScript complet avec template HTML séparé,
puis liste des fonctionnalités implémentées sous forme de puces.

Contexte : Je veux créer un composant ContactFormComponent dans feature-contacts
avec un formulaire réactif pour créer/modifier un contact. Les champs sont :
nom (required), email (required, email), téléphone (optional). Utilise FormBuilder,
les validators Angular, changeDetection OnPush, et les fonctions input()/output()
au lieu des décorateurs.
```

### 3. Utiliser le Bon Agent

- **Architecture/structure** → Agent 1 (Architecte Nx)
- **Développement Angular/tests unitaires** → Agent 2 (Développeur Angular)
- **Styling/design** → Agent 3 (Styliste Frontend)
- **API/debugging/tests E2E** → Agent 4 (Intégrateur API)

### 4. Itérer Progressivement

Commencez par un prompt simple, puis affinez avec des prompts de suivi :

1. "En tant qu'expert Angular, crée un composant ContactListComponent. Format : code complet. Contexte : dans feature-contacts, affiche une liste de contacts."
2. "En tant qu'expert Angular, ajoute la pagination à ContactListComponent. Format : code avec explications. Contexte : 10 items par page, utilise les signals pour l'état."
3. "En tant qu'expert Bootstrap, stylise ContactListComponent. Format : HTML + SCSS. Contexte : table Bootstrap responsive avec hover."

---

## 📚 Ressources

- **Règles du projet** : `.cursor/rules/*.mdc`
- **Architecture** : `.cursor/rules/architecture.mdc`
- **Tests** : `.cursor/rules/testing.mdc`
- **Debugging** : `.cursor/rules/debugging.mdc`
- **Conventions** : `.cursor/rules/project.mdc`

---

## ❓ Questions Fréquentes

### Q : Dois-je spécialiser les agents à chaque session ?

**R :** Non, une seule fois suffit. Après la spécialisation, l'agent comprend son rôle et peut être utilisé avec des prompts courts.

### Q : Puis-je utiliser plusieurs agents pour une même tâche ?

**R :** Oui ! Par exemple :

- Agent 1 : Créer la structure (lib, composants)
- Agent 2 : Développer la logique
- Agent 3 : Styliser
- Agent 4 : Intégrer l'API et tester

### Q : Que faire si un agent ne comprend pas ma demande ?

**R :**

1. Vérifiez que vous utilisez le bon agent
2. Soyez plus spécifique dans votre prompt
3. Fournissez plus de contexte (fichiers concernés, erreurs, etc.)

### Q : Les agents peuvent-ils modifier les règles existantes ?

**R :** Non, les agents doivent **respecter** les règles existantes dans `.cursor/rules/*.mdc`. Ils ne doivent pas les modifier sans votre accord explicite.

---

**Bon développement ! 🚀**
