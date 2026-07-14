import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumCard } from '../components/common/PremiumCard';
import { SettingRow } from '../components/common/SettingRow';

export const AboutScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="About"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* App Info Section */}
        <View style={styles.appInfoContainer}>
          <View style={[styles.logoContainer, { backgroundColor: `${colors.primary}15` }]}>
            <MaterialCommunityIcons name="card-account-details" size={80} color={colors.primary} />
          </View>
          <Text style={[styles.appName, { color: colors.textPrimary }]}>CardSphere</Text>
          <Text style={[styles.appVersion, { color: colors.textSecondary }]}>Version 1.0.0 (Build 42)</Text>
          <Text style={[styles.appDescription, { color: colors.textPrimary }]}>
            The premium digital business card platform by TechNaam. Connect seamlessly, share instantly, and manage your professional identity with elegance.
          </Text>
        </View>

        {/* Links Section */}
        <PremiumCard variant="elevated" style={styles.card} contentStyle={styles.cardContent}>
          <SettingRow
            icon="web"
            title="Website"
            subtitle="technaamsphere.com/cardsphere"
            onPress={() => {}}
          />
          <SettingRow
            icon="twitter"
            title="Twitter"
            subtitle="@TechNaam"
            onPress={() => {}}
          />
          <SettingRow
            icon="github"
            title="Open Source Licenses"
            onPress={() => {}}
          />
        </PremiumCard>

        {/* Developer Section */}
        <View style={styles.developerContainer}>
          <Text style={[styles.developerText, { color: colors.textSecondary }]}>Developed with ❤️ by</Text>
          <View style={styles.techNaamBranding}>
            <MaterialCommunityIcons name="domain" size={20} color={colors.primary} />
            <Text style={[styles.techNaamText, { color: colors.primary }]}>TechNaam</Text>
          </View>
          <Text style={[styles.copyright, { color: colors.textSecondary }]}>© {new Date().getFullYear()} TechNaam Solutions. All rights reserved.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: spacing.xl,
  },
  appInfoContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  appName: {
    ...typography.display,
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  appVersion: {
    ...typography.caption,
    marginBottom: spacing.lg,
  },
  appDescription: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  card: {
    borderRadius: radius.large,
    overflow: 'hidden',
    marginBottom: spacing['2xl'],
  },
  cardContent: {
    padding: 0,
  },
  developerContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  developerText: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  techNaamBranding: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  techNaamText: {
    ...typography.title,
    fontWeight: 'bold',
  },
  copyright: {
    ...typography.smallText,
    textAlign: 'center',
  },
});
