import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumCard } from '../components/common/PremiumCard';
import { SettingRow } from '../components/common/SettingRow';
import { PremiumSwitch } from '../components/common/PremiumSwitch';
import { ROUTES } from '../navigation/routes';

export const SettingsScreen = ({ navigation }) => {
  const { colors, isDarkMode, setThemePreference } = useTheme();

  const toggleTheme = async (enabled) => {
    await setThemePreference(enabled ? 'dark' : 'light');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader title="Settings" showBack={false} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Appearance</Text>
          <PremiumCard variant="elevated" style={styles.card} contentStyle={styles.cardContent}>
            <SettingRow
              icon="theme-light-dark"
              title="Dark Mode"
              subtitle={isDarkMode ? 'Dark theme' : 'Light theme'}
              rightElement={
                <PremiumSwitch
                  value={isDarkMode}
                  onValueChange={toggleTheme}
                  accessibilityLabel="Toggle dark mode"
                />
              }
            />
          </PremiumCard>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Support</Text>
          <PremiumCard variant="elevated" style={styles.card} contentStyle={styles.cardContent}>
            <SettingRow
              icon="information"
              title="About CardSphere"
              onPress={() => navigation.navigate(ROUTES.ABOUT)}
            />
          </PremiumCard>
        </View>

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>CardSphere v1.0.0</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  card: {
    borderRadius: radius.large,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 0,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  versionText: {
    ...typography.caption,
  },
  bottomSpacer: {
    height: spacing['3xl'],
  },
});
