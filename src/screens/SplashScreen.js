import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing } from '../theme';

export const SplashScreen = () => {
  const { colors } = useTheme();

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
    paddingBottom: spacing.2xl,
    alignItems: 'center',
  },
  branding: {
    ...typography.caption,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
