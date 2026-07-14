import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightPalette, darkPalette } from './palettes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const THEME_STORAGE_KEY = '@cardsphere_theme_preference';

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] = useState('system'); // 'light', 'dark', or 'system'
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme) {
          setThemePreference(storedTheme);
        }
      } catch (error) {
        if(__DEV__) console.error('Failed to load theme preference:', error);
      } finally {
        setIsReady(true);
      }
    };

    loadThemePreference();
  }, []);

  const changeThemePreference = async (newTheme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemePreference(newTheme);
    } catch (error) {
      if(__DEV__) console.error('Failed to save theme preference:', error);
    }
  };

  const isDarkMode =
    themePreference === 'system'
      ? systemColorScheme === 'dark'
      : themePreference === 'dark';

  const currentColors = isDarkMode ? darkPalette : lightPalette;

  const value = {
    themePreference,
    setThemePreference: changeThemePreference,
    isDarkMode,
    colors: currentColors,
  };

  if (!isReady) {
    // Ideally return a loading screen or null while checking AsyncStorage
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
