# CardSphere

CardSphere is a local-first, offline-ready digital business card generation application built on React Native and Expo. It generates professional, standards-compliant vCard-based digital business cards with flexible styling and immediate export options via PNG, PDF, and `.vcf`.

## Overview
CardSphere gives professionals complete ownership over their digital identity. Unlike SaaS-based business card platforms, CardSphere stores your profile locally, requires no cloud login, and allows instant sharing over QR, email, messaging apps, and local device printing.

## Features
- **Local Profile Management:** Create and edit professional profiles completely offline.
- **Dynamic Theming:** Supports Light, Dark, and System-preference themes automatically.
- **Custom Templates & Styles:** Multiple curated design templates and accent colors.
- **vCard 3.0 QR Generator:** Instantly generated QR codes designed to be read by native camera apps seamlessly.
- **Rich Export Options:**
  - Export High-Res PNGs of your card.
  - Generate A4 print-ready PDFs.
  - Share and import raw `.vcf` files.

## Project Structure
- `src/components`: Granular, reusable React components split by domain (`common`, `card`, `qr`, `export`).
- `src/screens`: Top-level navigational route destinations defining user flows.
- `src/navigation`: App-wide and tab-based routing definitions (`AppNavigator`, `BottomTabs`, `RootStack`).
- `src/services`: Decoupled business logic handling `exportService`, `printService`, `shareService`, `contactService`, and `profileService`.
- `src/storage`: Offline data persistence via AsyncStorage with resilient fallback logic.
- `src/theme`: Centralized design system managing typography, color palettes, sizing, and shadows.

## Tech Stack
- **Framework:** React Native
- **Platform Tooling:** Expo (SDK 55)
- **State Management:** Custom React Hooks over Repository pattern
- **Storage:** `@react-native-async-storage/async-storage`
- **Media/Export:** `react-native-view-shot`, `expo-print`, `expo-sharing`, `expo-file-system`

## Build Instructions
1. Install dependencies via `npm install`.
2. Ensure Expo CLI is configured.
3. Start local development server via `npm start`.
4. To test build artifacts, use `npx expo export`.
