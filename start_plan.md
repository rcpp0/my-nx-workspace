# STARTER PLAN

## Phase 1 – Socle Nx et configuration

1. **Tâche 1.1 – Agent Architecte Nx**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Vérifier/compléter la configuration Nx globale (nx.json, project.json, tags, contraintes ESLint) et s’assurer que les dépendances Bootstrap/json-server/@types sont installées avec les scripts package.json attendus.
Référence : `STARTER-PROMPT.md` §§1, 1bis, 2.
2. **Tâche 1.2 – Agent Intégrateur API**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Mettre en place `db.json` conforme, configurer les fichiers environment + provider `API_CONFIG` (InjectionToken, fileReplacements) pour garantir l’accès multi-environnement à l’API.
Référence : `STARTER-PROMPT.md` §§3, 4 (étape 1bis) + `.cursor/rules/environments.mdc`.

## Phase 2 – Ressources partagées et data-access

1. **Tâche 2.1 – Agent Architecte Nx**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Générer les libs `shared-ui`, `data-access`, `feature-auth`, `feature-orders`, `layout` en respectant la syntaxe Nx, les alias `@mini-crm/...` et l’arborescence imposée.
Référence : `STARTER-PROMPT.md` §4.
2. **Tâche 2.2 – Agent Intégrateur API**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Définir les modèles `auth` et `order`, implémenter `AuthService` (mock) et `OrdersService` (CRUD complet avec signals, calculs totalHt/totalTtc, gestion erreurs & cache léger) en exposant les signaux requis via data-access.
Référence : `STARTER-PROMPT.md` §§6, 10, 11.
3. **Tâche 2.3 – Agent Développeur Angular**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Créer les composants shared UI (`lib-spinner`, `lib-confirm-modal`) et les exporter, en documentant leur API publique (inputs/outputs) selon les conventions Compodoc.
Référence : `STARTER-PROMPT.md` §7 + `.cursor/rules/project.mdc` (JSDoc).

## Phase 3 – Layout, navigation et Auth

1. **Tâche 3.1 – Agent Architecte Nx**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Mettre en place le système de layout (`lib-layout`, `lib-header`, `lib-sidebar`) avec content projection, masquage conditionnel selon `AuthService.isAuthenticated()` et intégration côté `app.component`.
Référence : `STARTER-PROMPT.md` §§8-9.
2. **Tâche 3.2 – Agent Développeur Angular**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Implémenter les composants `SignInComponent` et `SignUpComponent` (forms réactifs, validations, navigation) ainsi que les routes lazy `AUTH_ROUTES`, guard/interceptor fonctionnels préparés et wiring `app.routes.ts`.
Référence : `STARTER-PROMPT.md` §§10, 12.
3. **Tâche 3.3 – Agent Styliste Frontend**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Styliser layout, header, sidebar et écrans d’authentification avec Bootstrap 5, variables CSS personnalisées, responsive et exigences d’accessibilité (contraste, focus, aria).
Référence : `STARTER-PROMPT.md` §§8, 10 + `.cursor/rules/project.mdc` (styles).

## Phase 4 – Feature Orders complète

1. **Tâche 4.1 – Agent Développeur Angular**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Implémenter les composants `OrderForm`, `OrderList`, `OrderAdd`, `OrderEdit`, relier les signaux du service, gérer le routing `ORDERS_ROUTES`, les interactions (ConfirmModal, navigation) et l’usage du Spinner/alerts.
Référence : `STARTER-PROMPT.md` §11.
2. **Tâche 4.2 – Agent Styliste Frontend**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Appliquer le design Bootstrap responsive sur la table, formulaires et modales des commandes, définir les variables CSS locales, garantir l’accessibilité et l’uniformité (badges, boutons, alertes).
Référence : `STARTER-PROMPT.md` §§11, 14 + `.cursor/rules/performance.mdc` (NgOptimizedImage, classes utilitaires).
3. **Tâche 4.3 – Agent Intégrateur API**  
Contexte : Projet Angular 20 avec Nx Monorepo.
Actions : Finaliser les flux CRUD côté service (refresh, calculs), brancher `app.routes.ts` avec guards/interceptors, vérifier le fonctionnement json-server et documenter les scénarios de test Vitest/Lighthouse de base.
Référence : `STARTER-PROMPT.md` §§11-12 + `.cursor/rules/testing.mdc`.