# CardSphere Architecture

CardSphere follows a strict variant of Clean Architecture applied to React Native, ensuring high maintainability and testability without over-engineering simple flows.

## Layers
1. **Storage Layer (`src/storage`)**
   - The lowest level, interacting directly with device storage (`AsyncStorage`). No other layers touch `AsyncStorage`.

2. **Repository Layer (`src/repositories`)**
   - Abstracts the Storage logic into clean domain models, managing data structuring.

3. **Service Layer (`src/services`)**
   - Pure business logic. This includes parsing vCard strings (`contactService`), managing device exports/sharing (`exportService`, `shareService`), determining fallback data configurations (`profileService`), and manipulating HTML elements for PDF exports (`pdfService`).

4. **Hooks Layer (`src/hooks`)**
   - Wraps asynchronous Service and Repository calls into safe, reactive state models that the UI components can subscribe to (e.g. `useProfile`, `useTheme`).

5. **UI Layer (`src/screens` and `src/components`)**
   - Strictly presentational. These layers use Hooks to fetch state, and only handle visual rendering logic. Complex logic does not live in UI Components. Navigational routing flows entirely through `src/navigation`.

## Rules
- Components may not access `AsyncStorage` directly.
- Hardcoded layout metrics (colors, sizes) are prohibited; rely on the `src/theme` design system.
- Services must gracefully catch exceptions and not bubble terminal crashes up to the UI Layer.
