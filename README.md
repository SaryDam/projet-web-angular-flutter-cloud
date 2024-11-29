# Projet Web et Mobile : Gestionnaire de Tâches

Ce projet contient deux applications :
- **ma-to-do-web** : Une application web développée en Angular.
- **ma-todo-flutter** : Une application mobile développée en Flutter.

---

## Structure du projet

```
projet-web-angular-flutter-cloud
├── ma-to-do-web      # Application Angular
└── ma-todo-flutter   # Application Flutter
```

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

1. **Node.js et npm** (pour Angular) :  
   [Télécharger Node.js](https://nodejs.org/)  
   Vérifiez l'installation :
   ```bash
   node -v
   npm -v
   ```

2. **Flutter SDK** (pour Flutter) :  
   [Installer Flutter](https://docs.flutter.dev/get-started/install)  
   Vérifiez l'installation :
   ```bash
   flutter --version
   ```

3. **Angular CLI** (pour Angular) :  
   Installez Angular CLI globalement :
   ```bash
   npm install -g @angular/cli
   ng version
   ```

4. **Firebase CLI** (optionnel, si vous utilisez Firebase) :
   ```bash
   npm install -g firebase-tools
   firebase --version
   ```

---

## Lancer l'application Angular

1. Accédez au dossier Angular :
   ```bash
   cd ma-to-do-web
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   ng serve
   ```

4. Ouvrez votre navigateur à l'adresse :  
   [http://localhost:4200](http://localhost:4200)

---

## Lancer l'application Flutter

1. Accédez au dossier Flutter :
   ```bash
   cd ma-todo-flutter
   ```

2. Installez les dépendances Flutter :
   ```bash
   flutter pub get
   ```

3. Connectez un simulateur ou un appareil physique. Vérifiez que Flutter le reconnaît :
   ```bash
   flutter devices
   ```

4. Lancez l'application :
   ```bash
   flutter run
   ```

5. L'application s'exécutera sur l'appareil connecté.

---

## Auteurs

- Damien CREUX
- Serhat KUS
- Mathieu Roman

