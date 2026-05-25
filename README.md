# MediKidney Mobile App

A bilingual mobile application built with Expo and React Native to support dialysis workflows for patients, nurses, and nutritionists.

## Features

- Role-based flows for `PATIENT`, `NURSE`, and `NUTRITIONIST`
- Dialysis session tracking and status updates
- Nutrition plan creation and editing
- Consultation booking and follow-up
- Login, password reset, and first-login password change
- Push notifications with in-app navigation
- Arabic and English localization

## Stack

- Expo
- React Native
- React Navigation
- Axios
- AsyncStorage
- RNEUI
- Expo Notifications

## Project Structure

```text
App.js
AppNavigation/
assets/
components/
context/
hooks/
login/
screens/
services/
translations/
utils/
android/
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a local `.env`

Copy the example file:

```bash
copy .env.example .env
```

Set your local values:

```env
EXPO_PUBLIC_API_BASE_URL=https://your-api.example.com
GOOGLE_SERVICES_FILE=./google-services.json
EXPO_PUBLIC_EAS_PROJECT_ID=your-eas-project-id
EXPO_OWNER=your-expo-owner
```

### 3. Add Firebase config locally

- Download `google-services.json` from your Firebase project
- Place it in the project root
- Do not commit it to GitHub
- A placeholder file is available at `google-services.example.json`

### 4. Start the app

```bash
npm start
```

### 5. Run on a platform

```bash
npm run android
npm run ios
npm run web
```

## Security Notes

- The backend URL is read from `.env` through `EXPO_PUBLIC_API_BASE_URL`
- Firebase Android config is loaded through `GOOGLE_SERVICES_FILE` in `app.config.js`
- `google-services.json` is ignored from Git and should remain local only
- `android/` is intentionally tracked because this project uses native Android configuration

## Important Files

- `services/api.js`: shared API client
- `app.config.js`: Expo config resolved from environment variables
- `hooks/useNotifications.js`: notification registration and routing
- `screens/patient/PatientProfile.jsx`: main patient dashboard
- `screens/patient/NurseNutritionistToPatient.jsx`: shared patient view for staff
- `screens/dialysisSessions/SessionDetails.jsx`: dialysis session workflow

## License

MIT
