import { lightPalette, darkPalette } from './palettes';

// The colors object should ideally be dynamic based on the theme.
// However, providing a default structure helps with type checking and autocomplete in some setups.
// The actual active colors will be provided by the ThemeContext.

export const colors = {
  light: lightPalette,
  dark: darkPalette,
};
