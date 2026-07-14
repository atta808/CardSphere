import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumCard } from '../components/common/PremiumCard';
import { SettingRow } from '../components/common/SettingRow';
import { PremiumSwitch } from '../components/common/PremiumSwitch';
import { ROUTES } from '../navigation/routes';

export const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="Settings"
        showBack={false}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Appearance</Text>
          <PremiumCard variant="elevated" style={styles.card} contentStyle={styles.cardContent}>
            <SettingRow
              icon="palette"
              title="Theme"
              subtitle="Dark Mode"
              rightElement={<PremiumSwitch value={true} onValueChange={() => {}} />}
            />
            <SettingRow
              icon="format-color-fill"
              title="Accent Color"
              subtitle="Default Blue"
              onPress={() => {}}
            />
          </PremiumCard>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Preferences</Text>
          <PremiumCard variant="elevated" style={styles.card} contentStyle={styles.cardContent}>
            <SettingRow
              icon="translate"
              title="Language"
              subtitle="English (US)"
              onPress={() => {}}
            />
            <SettingRow
              icon="bell"
              title="Notifications"
              subtitle="Push, Email"
              onPress={() => {}}
            />
            <SettingRow
              icon="security"
              title="Privacy & Security"
              onPress={() => {}}
            />
          </PremiumCard>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Support</Text>
          <PremiumCard variant="elevated" style={styles.card} contentStyle={styles.cardContent}>
            <SettingRow
              icon="help-circle"
              title="Help Center"
              onPress={() => {}}
            />
            <SettingRow
              icon="shield-check"
              title="Privacy Policy"
              onPress={() => {}}
            />
            <SettingRow
              icon="file-document"
              title="Terms of Service"
              onPress={() => {}}
            />
            <SettingRow
              icon="information"
              title="About CardSphere"
              onPress={() => navigation.navigate(ROUTES.ABOUT)}
            />
          </PremiumCard>
        </View>

        {/* Account Actions Section */}
        <View style={styles.section}>
          <PremiumCard variant="elevated" style={styles.card} contentStyle={styles.cardContent}>
             <SettingRow
              icon="logout"
              title="Log Out"
              isDestructive
              onPress={() => {}}
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
    padding: 0, // Let SettingRow handle padding
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
