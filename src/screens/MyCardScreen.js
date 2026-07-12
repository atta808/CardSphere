import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumButton } from '../components/common/PremiumButton';
import { BusinessCard } from '../components/card/BusinessCard';
import { QRPreview } from '../components/qr/QRPreview';
import { ROUTES } from '../navigation/routes';
import { useProfile } from '../hooks/useProfile';

export const MyCardScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile } = useProfile();

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
          <BusinessCard profile={profile} />
        </View>

        <View style={styles.qrContainer}>
          <QRPreview profile={profile} onPress={() => navigation.navigate(ROUTES.QR_CODE)} />
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
  qrContainer: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  shareContainer: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  shareButton: {
    width: '100%',
  },
  bottomSpacer: {
    height: spacing['3xl'],
  },
});
