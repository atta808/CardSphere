import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from '../theme';
import { RootStack } from './RootStack';

export const AppNavigator = () => {
  const { colors, isDarkMode } = useTheme();

  const navigationTheme = useMemo(() => {
    const baseTheme = isDarkMode ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.textPrimary,
        border: colors.border,
        notification: colors.warning,
      },
    };
  }, [colors, isDarkMode]);

  // Prepared for future deep linking integration
  const linking = {
    prefixes: ['cardsphere://'],
    config: {
      screens: {
        Splash: 'splash',
        Onboarding: 'onboarding',
        MainTabs: {
          screens: {
            Home: 'home',
            MyCard: 'my-card',
            Templates: 'templates',
            Settings: 'settings',
          },
        },
        EditCard: 'edit-card',
        Preview: 'preview',
        QRCode: 'qr-code',
        About: 'about',
      },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme} linking={linking}>
      <RootStack />
    </NavigationContainer>
  );
};
