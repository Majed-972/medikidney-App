# MediKidney Mobile App

A polished, role-driven kidney dialysis management mobile application built with **Expo**, **React Native**, **React 19**, and **JavaScript**. This mobile client is designed to work with a secure backend API and support patient care, dialysis session tracking, and staff coordination across a clinical kidney-care workflow.

---

## Features

- **Multi-role mobile experience:** Separate in-app flows for `PATIENT`, `NURSE`, and `NUTRITIONIST`.
- **Secure login and account flow:** Role-aware login, session persistence, password reset, and first-time password change handling.
- **Dialysis session management:** Start, monitor, and complete dialysis sessions with session details, symptoms, vital signs, medications, and settings.
- **Patient follow-up tools:** Patient profile, consultation details, session history, session statistics, and post-session weight entry.
- **Nutrition planning:** Nutritionists can create and update meal plans, allowed foods, forbidden foods, and program duration.
- **Patient search and staff access:** Nurses and nutritionists can search for patient records and open shared patient views.
- **Push notification flow:** Expo notifications with direct navigation to relevant screens such as sessions, consultations, and weight input.
- **Bilingual interface:** Arabic and English localization managed through a shared language context.

---

## Technologies Used

- **Expo SDK 55**
- **React Native 0.83**
- **React 19**
- **JavaScript (ES Modules / JSX)**
- **React Navigation**
- **Axios**
- **AsyncStorage**
- **Expo Notifications**
- **RNEUI**
- **Prettier**
- **ESLint**

---

## Folder Structure

```text
AppNavigation/
assets/
components/
constants/
context/
hooks/
login/
screens/
├── aboutApplication/
├── changePassword/
├── dialysisSessions/
├── notifications/
├── Nurse/
├── Nutritionist/
├── patient/
├── resetPassword/
├── Sessions/
└── SettingsWithProfile/
services/
translations/
utils/
android/
App.js
app.config.js
app.json
index.js
```

---

## System Roles & Capabilities

| Role | Key Capabilities |
| ---- | ---------------- |
| **Patient** | Reviews personal profile, views dialysis sessions, follows consultations, checks prescriptions and medical results, and receives mobile notifications. |
| **Nurse** | Selects patients, starts dialysis sessions, records symptoms and vital signs, updates session status, and completes treatment workflow. |
| **Nutritionist** | Searches patient records, reviews patient details, and creates or updates kidney-focused nutrition programs and meal plans. |

---

## How to Run

### 1. Install dependencies

```bash
git clone https://github.com/your-username/medikidney-app.git
cd medikidney-app
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and set your local values:

```bash
cp .env.example .env
```

On Windows, you can use:

```bash
copy .env.example .env
```

```env
EXPO_PUBLIC_API_BASE_URL="https://your-api.example.com"
GOOGLE_SERVICES_FILE="./google-services.json"
EXPO_PUBLIC_EAS_PROJECT_ID="your-eas-project-id"
EXPO_OWNER="your-expo-owner"
```

> Keep `google-services.json` local only and do not commit it to GitHub.

### 3. Add Firebase Android config

Download `google-services.json` from your Firebase project and place it in the project root.  
A placeholder example is available in `google-services.example.json`.

### 4. Start the Expo development server

```bash
npm start
```

### 5. Run on a specific platform

```bash
npm run android
npm run ios
npm run web
```

---

## Available Scripts

- `npm start` — Start the Expo development server.
- `npm run android` — Build and run the Android app locally with Expo.
- `npm run ios` — Build and run the iOS app locally with Expo.
- `npm run web` — Start the web target for Expo.
- `npm run lint` — Run ESLint on `.js` and `.jsx` files.
- `npm run format` — Format the project with Prettier.

---

## Environment Variables

| Variable | Description |
| -------- | ----------- |
| `EXPO_PUBLIC_API_BASE_URL` | Base URL of the backend API used by the mobile client. |
| `GOOGLE_SERVICES_FILE` | Local path to the Android Firebase configuration file. |
| `EXPO_PUBLIC_EAS_PROJECT_ID` | EAS project identifier used by Expo services. |
| `EXPO_OWNER` | Expo account owner for local and hosted Expo workflows. |

> Any variable starting with `EXPO_PUBLIC_` is embedded into the client build and should not be treated as a backend secret.

---

## Portfolio Notes

- This project demonstrates a complete, role-based dialysis mobile workflow for patients and clinical staff.
- It is suitable for showcasing in a portfolio as a professional healthcare mobile application with authentication, notifications, patient tracking, and nutrition planning.
- The repository is structured to separate app code from local environment files and Firebase configuration.

---

## Author

Developed by Majed.
