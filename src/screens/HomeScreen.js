import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumCard } from '../components/common/PremiumCard';
import { PremiumButton } from '../components/common/PremiumButton';
import { ActionTile } from '../components/common/ActionTile';
import { StatCard } from '../components/common/StatCard';
import { BusinessCard } from '../components/card/BusinessCard';
import { ROUTES } from '../navigation/routes';
import { useProfile } from '../hooks/useProfile';
import { QRPreview } from '../components/qr/QRPreview';

export const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile, completionPercentage } = useProfile();

  const getFormattedDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader title="Home" showBack={false} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Welcome Section */}
        <PremiumCard
          variant="elevated"
          style={styles.welcomeCard}
          contentStyle={styles.welcomeContent}
        >
          <View style={styles.welcomeTextContainer}>
            <Text style={[styles.welcomeGreeting, { color: colors.textSecondary }]}>Welcome,</Text>
            <Text style={[styles.welcomeName, { color: colors.textPrimary }]}>{profile?.personal?.fullName || 'User'}</Text>
          </View>
          <View style={styles.completionContainer}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.surface }]}>
              <Text style={[styles.completionText, { color: colors.primary }]}>{completionPercentage}%</Text>
            </View>
            <Text style={[styles.completionLabel, { color: colors.textSecondary }]}>Completed</Text>
          </View>
        </PremiumCard>

        {/* My Card Preview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Your Active Card</Text>
          <BusinessCard profile={profile} style={styles.myCardPreview} />
        </View>

        {/* QR Preview */}
        <View style={styles.section}>
          <QRPreview profile={profile} onPress={() => navigation.navigate(ROUTES.QR_CODE)} />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <ActionTile icon="qrcode-scan" title="Scan QR" color={colors.primary} onPress={() => {}} />
            <ActionTile icon="view-grid" title="Templates" color={colors.secondary} onPress={() => navigation.navigate(ROUTES.TEMPLATES)} />
            <ActionTile icon="chart-bar" title="Analytics" color={colors.warning} onPress={() => {}} />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Performance</Text>
          <View style={styles.statsRow}>
            <StatCard icon="eye" label="Views" value="1,248" trend="up" trendValue="+12%" />
            <StatCard icon="share-variant" label="Shares" value="342" trend="up" trendValue="+5%" />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Recent Activity</Text>
          <PremiumCard variant="flat" style={styles.activityCard}>
            <View style={styles.activityRow}>
              <View style={[styles.activityIcon, { backgroundColor: `${colors.secondary}20` }]}>
                <MaterialCommunityIcons name="card-account-details" size={20} color={colors.secondary} />
              </View>
              <View style={styles.activityText}>
                <Text style={[styles.activityTitle, { color: colors.textPrimary }]}>Profile last updated</Text>
                <Text style={[styles.activityTime, { color: colors.textSecondary }]}>{getFormattedDate(profile?.meta?.updatedDate)}</Text>
              </View>
            </View>
          </PremiumCard>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  welcomeCard: {
    marginTop: spacing.sm,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeGreeting: {
    ...typography.body,
  },
  welcomeName: {
    ...typography.heading,
  },
  completionContainer: {
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionText: {
    ...typography.title,
    fontWeight: '700',
  },
  completionLabel: {
    ...typography.caption,
    marginTop: 4,
  },
  myCardPreview: {
    marginTop: spacing.md,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -spacing.xs, // Offset for ActionTile margin
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -spacing.xs,
  },
  activityCard: {
    paddingHorizontal: spacing.md,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    ...typography.body,
    fontWeight: '500',
  },
  activityTime: {
    ...typography.caption,
    marginTop: 2,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  bottomSpacer: {
    height: spacing['3xl'],
  },
});
