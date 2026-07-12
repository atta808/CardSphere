import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumButton } from '../components/common/PremiumButton';
import { ROUTES } from '../navigation/routes';

export const OnboardingScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <PremiumButton
          title="Skip"
          variant="ghost"
          size="small"
          onPress={() => navigation.replace(ROUTES.MAIN_TABS)}
        />
      </View>

      <View style={styles.content}>
        <View style={[styles.illustrationContainer, { backgroundColor: `${colors.primary}10` }]}>
          <MaterialCommunityIcons name="card-account-details-outline" size={120} color={colors.primary} />
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>Digital Business Cards Reimagined</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Create, share, and manage your professional identity with elegant digital business cards.
        </Text>

        <View style={styles.paginationContainer}>
          <View style={[styles.dot, styles.activeDot, { backgroundColor: colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: colors.border }]} />
          <View style={[styles.dot, { backgroundColor: colors.border }]} />
        </View>
      </View>

      <View style={styles.footer}>
        <PremiumButton
          title="Get Started"
          onPress={() => navigation.replace(ROUTES.MAIN_TABS)}
          fullWidth
          rightIcon={<MaterialCommunityIcons name="arrow-right" size={20} color="#FFFFFF" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  illustrationContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.heading,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.circle,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
  },
  footer: {
    padding: spacing.xl,
    paddingBottom: spacing.2xl,
  },
});
