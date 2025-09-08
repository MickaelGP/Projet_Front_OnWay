# OnWay – Application de Covoiturage
## Présentation
**OnWay** est une application web de covoiturage développée dans le cadre d’un projet pour l'obtention du tire de CDA(concepteur dévellopeur d'aplication).
Elle permet aux utilisateurs de créer un compte, de proposer ou de réserver des trajets, et de gérer leurs interactions de manière sécurisée.

Le projet repose sur une architecture client-serveur :

- Frontend : conçu avec Next.js 15 et React.js, utilise Bootstrap et du CSS personnalisé pour l’interface utilisateur. 
- Backend : développé en C#/.NET, expose une API RESTful pour gérer l’ensemble des échanges.
  - Le code source du backend est disponible dans un dépôt séparé : `https://github.com/MickaelGP/Projet_Back_OnWay`
## Architecture
### Frontend (Next.js 15 / React)
- **Pages (src/app/)** : accueil, inscription, connexion, tableau de bord.

- **API interne (src/api/)** : appels centralisés vers le backend via `fetch`.

- **Composants (src/components/)** : éléments réutilisables (inputs, boutons).

- **UI (src/ui/)** : barre de navigation, pied de page.

- **Interfaces (src/interfaces/)** : typage des données avec `TypeScript`.

- **Lib (src/lib/)** : gestion centralisée des points d’entrée (endpoints) de **l’API backend**.
- **Utils (src/utils/)** : fonctions utilitaires (validation des formulaires, etc.).
- **Middleware (src/middleware.ts)** : contrôle du token sur les routes protégées.
- **Sécurité côté client** :
  - Validation des formulaires avant envoi.
  - Utilisation de cookies **HTTP-only** sécurisés pour les sessions.
  - Protection intégrée contre les attaques **XSS** via `React/Next.js`.

## Technologies utilisées
### Frontend
- Next.js 15
- React.js
- TypeScript
- Bootstrap + CSS personnalisé

## Prérequis
- Node.js 20+
## Installation
Suivez les étapes ci-dessous pour installer et exécuter l’application localement :

1.  Cloner le dépôt :
```bash
git clone https://github.com/MickaelGP/Projet_Front_OnWay
cd Projet_Front_OnWay
```
2.  Créer un fichier .env et ajouter la ligne suivante :
```plaintext
 API_URL = adresse de l'api
```
3.  Installer les dépences :
```bash
npm install
```
4. Lancer l'application :
```bash
npm run dev
```
## Auteur
- MickaelGP - https://github.com/MickaelGP

