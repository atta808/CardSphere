import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumCard } from '../components/common/PremiumCard';
import { PremiumButton } from '../components/common/PremiumButton';
import { ActionTile } from '../components/common/ActionTile';
import { StatCard } from '../components/common/StatCard';
import { ROUTES } from '../navigation/routes';

export const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

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
            <Text style={[styles.welcomeGreeting, { color: colors.textSecondary }]}>Good morning,</Text>
            <Text style={[styles.welcomeName, { color: colors.textPrimary }]}>Alex Developer</Text>
          </View>
          <View style={[styles.avatarPlaceholder, { backgroundColor: colors.surface }]}>
            <MaterialCommunityIcons name="account-circle" size={48} color={colors.primary} />
          </View>
        </PremiumCard>

        {/* My Card Preview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Your Active Card</Text>
          <PremiumCard variant="outlined" style={styles.myCardPreview}>
            <View style={styles.cardHeader}>
              <View style={styles.cardInfo}>
                <Text style={[styles.cardName, { color: colors.textPrimary }]}>Alex Developer</Text>
                <Text style={[styles.cardRole, { color: colors.textSecondary }]}>Senior Software Engineer</Text>
                <Text style={[styles.cardCompany, { color: colors.primary }]}><MaterialCommunityIcons name="domain" size={14} /> TechNaam Solutions</Text>
              </View>
              <MaterialCommunityIcons name="qrcode" size={48} color={colors.textPrimary} />
            </View>
            <View style={styles.cardActions}>
              <PremiumButton
                title="Edit Card"
                variant="outline"
                size="small"
                leftIcon={<MaterialCommunityIcons name="pencil" size={16} color={colors.primary} />}
                onPress={() => navigation.navigate(ROUTES.EDIT_CARD)}
                style={styles.actionBtn}
              />
              <PremiumButton
                title="Share"
                variant="primary"
                size="small"
                leftIcon={<MaterialCommunityIcons name="share-variant" size={16} color="#FFFFFF" />}
                onPress={() => navigation.navigate(ROUTES.QR_CODE)}
                style={styles.actionBtn}
              />
            </View>
          </PremiumCard>
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
              <View style={[styles.activityIcon, { backgroundColor: `${colors.primary}20` }]}>
                <MaterialCommunityIcons name="account-plus" size={20} color={colors.primary} />
              </View>
              <View style={styles.activityText}>
                <Text style={[styles.activityTitle, { color: colors.textPrimary }]}>New connection saved</Text>
                <Text style={[styles.activityTime, { color: colors.textSecondary }]}>2 hours ago</Text>
              </View>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.activityRow}>
              <View style={[styles.activityIcon, { backgroundColor: `${colors.secondary}20` }]}>
                <MaterialCommunityIcons name="card-account-details" size={20} color={colors.secondary} />
              </View>
              <View style={styles.activityText}>
                <Text style={[styles.activityTitle, { color: colors.textPrimary }]}>Card updated</Text>
                <Text style={[styles.activityTime, { color: colors.textSecondary }]}>Yesterday</Text>
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
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myCardPreview: {
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  cardRole: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
  cardCompany: {
    ...typography.caption,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionBtn: {
    flex: 1,
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
    height: spacing.3xl,
  },
});
