import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumButton } from '../components/common/PremiumButton';
import { PremiumCard } from '../components/common/PremiumCard';

export const QRCodeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="Share QR Code"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.infoTextContainer}>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Have someone scan this code to instantly share your professional details.
          </Text>
        </View>

        <PremiumCard variant="elevated" style={styles.qrCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
              <MaterialCommunityIcons name="account-circle" size={40} color={colors.primary} />
            </View>
            <View style={styles.headerText}>
              <Text style={[styles.name, { color: colors.textPrimary }]}>Alex Developer</Text>
              <Text style={[styles.company, { color: colors.textSecondary }]}>TechNaam Solutions</Text>
            </View>
          </View>

          <View style={[styles.qrContainer, { backgroundColor: '#FFFFFF' }]}>
            <MaterialCommunityIcons name="qrcode" size={200} color="#000000" />
          </View>

          <View style={styles.scanInstruction}>
             <MaterialCommunityIcons name="scan-helper" size={24} color={colors.primary} />
             <Text style={[styles.scanText, { color: colors.primary }]}>Align within frame to scan</Text>
          </View>
        </PremiumCard>

        <View style={styles.actionsContainer}>
          <PremiumButton
            title="Share Link"
            variant="primary"
            leftIcon={<MaterialCommunityIcons name="share-variant" size={20} color="#FFFFFF" />}
            style={styles.actionBtn}
          />
          <PremiumButton
            title="Download QR"
            variant="outline"
            leftIcon={<MaterialCommunityIcons name="download" size={20} color={colors.primary} />}
            style={styles.actionBtn}
          />
          <PremiumButton
            title="Print"
            variant="ghost"
            leftIcon={<MaterialCommunityIcons name="printer" size={20} color={colors.primary} />}
            style={styles.actionBtn}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  infoTextContainer: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  infoText: {
    ...typography.body,
    textAlign: 'center',
  },
  qrCard: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: radius.xlarge,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    width: '100%',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  name: {
    ...typography.title,
    fontSize: 18,
  },
  company: {
    ...typography.caption,
  },
  qrContainer: {
    padding: spacing.lg,
    borderRadius: radius.large,
    marginBottom: spacing.xl,
  },
  scanInstruction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  scanText: {
    ...typography.caption,
    fontWeight: '600',
  },
  actionsContainer: {
    width: '100%',
    maxWidth: 320,
    marginTop: spacing['2xl'],
    gap: spacing.md,
  },
  actionBtn: {
    width: '100%',
  },
});
