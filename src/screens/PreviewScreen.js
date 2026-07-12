import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumButton } from '../components/common/PremiumButton';

export const PreviewScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="Card Preview"
        onBack={() => navigation.goBack()}
        rightIcon="share-variant"
        onRightPress={() => {}}
      />

      <View style={[styles.previewBackground, { backgroundColor: colors.surface }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Device Mockup Frame */}
          <View style={[styles.deviceFrame, { borderColor: colors.border }]}>

            {/* Inner Card Content Placeholder */}
            <View style={[styles.cardContent, { backgroundColor: colors.card }]}>

              <View style={[styles.banner, { backgroundColor: colors.primary }]} />

              <View style={styles.avatarWrapper}>
                <View style={[styles.avatar, { backgroundColor: colors.background, borderColor: colors.card }]}>
                  <MaterialCommunityIcons name="account-circle" size={64} color={colors.primary} />
                </View>
              </View>

              <View style={styles.infoSection}>
                <Text style={[styles.name, { color: colors.textPrimary }]}>Alex Developer</Text>
                <Text style={[styles.role, { color: colors.textSecondary }]}>Senior Software Engineer</Text>
                <View style={styles.companyRow}>
                  <MaterialCommunityIcons name="domain" size={14} color={colors.primary} />
                  <Text style={[styles.company, { color: colors.primary }]}>TechNaam Solutions</Text>
                </View>
              </View>

              <View style={styles.actionSection}>
                 <View style={[styles.dummyBtn, { backgroundColor: colors.primary }]} />
                 <View style={styles.dummySocials}>
                    <View style={[styles.dummyCircle, { backgroundColor: `${colors.success}20` }]} />
                    <View style={[styles.dummyCircle, { backgroundColor: `${colors.warning}20` }]} />
                    <View style={[styles.dummyCircle, { backgroundColor: `${colors.info}20` }]} />
                 </View>
              </View>

              <View style={[styles.qrSection, { backgroundColor: colors.surface }]}>
                <MaterialCommunityIcons name="qrcode" size={80} color={colors.textPrimary} />
              </View>

            </View>
          </View>
        </ScrollView>
      </View>

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <PremiumButton
          title="Share Link"
          variant="outline"
          leftIcon={<MaterialCommunityIcons name="link" size={20} color={colors.primary} />}
          style={styles.actionBtn}
        />
        <PremiumButton
          title="Show QR"
          variant="primary"
          leftIcon={<MaterialCommunityIcons name="qrcode" size={20} color="#FFFFFF" />}
          style={styles.actionBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  previewBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  deviceFrame: {
    width: '100%',
    maxWidth: 340,
    aspectRatio: 9/19,
    borderWidth: 8,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  cardContent: {
    flex: 1,
  },
  banner: {
    height: 120,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radius.circle,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  name: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  role: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  company: {
    ...typography.caption,
    fontWeight: '600',
  },
  actionSection: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  dummyBtn: {
    width: '80%',
    height: 40,
    borderRadius: radius.medium,
    marginBottom: spacing.md,
  },
  dummySocials: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dummyCircle: {
    width: 40,
    height: 40,
    borderRadius: radius.circle,
  },
  qrSection: {
    marginTop: 'auto',
    alignItems: 'center',
    padding: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    paddingBottom: spacing.2xl,
    borderTopWidth: 1,
    gap: spacing.md,
  },
  actionBtn: {
    flex: 1,
  },
});
