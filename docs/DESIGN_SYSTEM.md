# CardSphere Design System

The CardSphere Design System centrally dictates the visual identity of the application. The application does not use hardcoded colors or spacing values within layout sheets. All styling requests pull from variables defined inside `src/theme`.

## Core Components
- **`colors.js` and `palettes.js`**: Drives standard `light` and `dark` mode experiences. Components subscribe to color schemas dynamically using the `useTheme` hook.
- **`typography.js`**: Standardizes hierarchical sizes, tracking, and weighting (`heading`, `title`, `body`, `caption`, `smallText`).
- **`spacing.js`**: Defines common structural gaps (`xs`, `sm`, `md`, `lg`, `xl`, etc).
- **`radius.js` and `shadows.js`**: Governs component rounding and elevation logic to unify the premium aesthetic of the application.

## UI Principles
- **No pure blacks or pure whites**: In light mode, surfaces are slightly off-white, and text is off-black. In dark mode, contrasts are kept comfortable. (Exception: QR Codes generation blocks explicitly require stark white and black for camera reliability).
- **Responsive Empty States**: Sections must gracefully handle `null` data profiles. Blank variables collapse naturally rather than returning error placeholders or 'N/A' strings.
