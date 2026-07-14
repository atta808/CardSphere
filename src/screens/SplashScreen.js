import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, typography, spacing } from '../theme';
import { ROUTES } from '../navigation/routes';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { profileStorage } from '../storage/profileStorage';

export const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const transitionExecuted = useRef(false);

  useEffect(() => {
    let timeoutId;

    const navigateTo = (route) => {
      if (!transitionExecuted.current) {
        transitionExecuted.current = true;
        navigation.replace(route);
      }
    };

    const initializeApp = async () => {
      try {
        // Run initializations concurrently
        const [, onboardingStatus] = await Promise.all([
          profileStorage.loadProfile(),
          AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING),
        ]);

        if (onboardingStatus === 'true') {
          navigateTo(ROUTES.MAIN_TABS);
        } else {
          navigateTo(ROUTES.ONBOARDING);
        }
      } catch (error) {
        if (__DEV__) {
          console.error('Startup initialization failed:', error);
        }
        // Graceful fallback
        navigateTo(ROUTES.MAIN_TABS);
      }
    };

    // Safety timeout of 3 seconds
    timeoutId = setTimeout(() => {
      if (__DEV__) {
        console.warn('Startup initialization timed out. Forcing fallback navigation.');
      }
      navigateTo(ROUTES.MAIN_TABS);
    }, 3000);

    initializeApp();

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="card-account-details" size={96} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>CardSphere</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.branding, { color: colors.textSecondary }]}>from TechNaam</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.display,
    textAlign: 'center',
    letterSpacing: -1,
  },
  footer: {
    paddingBottom: spacing['2xl'],
    alignItems: 'center',
  },
  branding: {
    ...typography.caption,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
