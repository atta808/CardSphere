import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumCard } from '../components/common/PremiumCard';
import { PremiumButton } from '../components/common/PremiumButton';
import { SocialButton } from '../components/common/SocialButton';
import { ROUTES } from '../navigation/routes';

export const MyCardScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="My Card"
        rightIcon="pencil"
        onRightPress={() => navigation.navigate(ROUTES.EDIT_CARD)}
        showBack={false}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.cardContainer}>
          {/* Main Card View */}
          <PremiumCard variant="elevated" style={styles.businessCard}>
            {/* Header/Banner Area */}
            <View style={[styles.banner, { backgroundColor: colors.primary }]} />

            {/* Avatar */}
            <View style={styles.avatarWrapper}>
              <View style={[styles.avatar, { backgroundColor: colors.surface, borderColor: colors.card }]}>
                <MaterialCommunityIcons name="account-circle" size={80} color={colors.primary} />
              </View>
            </View>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <Text style={[styles.name, { color: colors.textPrimary }]}>Alex Developer</Text>
              <Text style={[styles.role, { color: colors.textSecondary }]}>Senior Software Engineer</Text>
              <View style={styles.companyRow}>
                <MaterialCommunityIcons name="domain" size={16} color={colors.primary} style={styles.icon} />
                <Text style={[styles.company, { color: colors.primary }]}>TechNaam Solutions</Text>
              </View>
            </View>

            {/* Contact Actions */}
            <View style={styles.contactActions}>
              <PremiumButton
                title="Save Contact"
                variant="primary"
                leftIcon={<MaterialCommunityIcons name="account-plus" size={20} color="#FFFFFF" />}
                style={styles.mainAction}
              />
              <View style={styles.quickContacts}>
                <SocialButton icon="phone" color={colors.success} size={48} onPress={() => {}} />
                <SocialButton icon="email" color={colors.warning} size={48} onPress={() => {}} />
                <SocialButton icon="web" color={colors.info} size={48} onPress={() => {}} />
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {/* Social Links */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Connect</Text>
              <View style={styles.socialGrid}>
                <SocialButton icon="linkedin" color="#0077b5" size={56} onPress={() => {}} style={styles.socialBtn} />
                <SocialButton icon="twitter" color="#1DA1F2" size={56} onPress={() => {}} style={styles.socialBtn} />
                <SocialButton icon="github" color="#333" size={56} onPress={() => {}} style={styles.socialBtn} />
                <SocialButton icon="instagram" color="#E1306C" size={56} onPress={() => {}} style={styles.socialBtn} />
              </View>
            </View>

            {/* QR Section */}
            <View style={[styles.qrSection, { backgroundColor: colors.surface }]}>
              <Text style={[styles.qrTitle, { color: colors.textSecondary }]}>Scan to connect</Text>
              <MaterialCommunityIcons name="qrcode" size={120} color={colors.textPrimary} />
            </View>

          </PremiumCard>
        </View>

        <View style={styles.shareContainer}>
          <PremiumButton
            title="Share via QR"
            variant="outline"
            leftIcon={<MaterialCommunityIcons name="qrcode-scan" size={20} color={colors.primary} />}
            onPress={() => navigation.navigate(ROUTES.QR_CODE)}
            style={styles.shareButton}
          />
          <PremiumButton
            title="Preview Full Screen"
            variant="ghost"
            leftIcon={<MaterialCommunityIcons name="fullscreen" size={20} color={colors.primary} />}
            onPress={() => navigation.navigate(ROUTES.PREVIEW)}
            style={styles.shareButton}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md },
  cardContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  businessCard: {
    width: '100%',
    maxWidth: 400,
    borderRadius: radius.xlarge,
    overflow: 'hidden',
  },
  banner: {
    height: 100,
    width: '100%',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: radius.circle,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  name: {
    ...typography.heading,
    marginBottom: spacing.xs,
  },
  role: {
    ...typography.title,
    marginBottom: spacing.xs,
    fontSize: 18,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.xs,
  },
  company: {
    ...typography.body,
    fontWeight: '600',
  },
  contactActions: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  mainAction: {
    marginBottom: spacing.md,
  },
  quickContacts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  divider: {
    height: 1,
    marginHorizontal: spacing.lg,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.subtitle,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  socialBtn: {
    margin: spacing.xs,
  },
  qrSection: {
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomLeftRadius: radius.xlarge,
    borderBottomRightRadius: radius.xlarge,
  },
  qrTitle: {
    ...typography.caption,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  shareContainer: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  shareButton: {
    width: '100%',
  },
  bottomSpacer: {
    height: spacing.3xl,
  },
});
