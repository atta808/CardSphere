import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, spacing } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumButton } from '../components/common/PremiumButton';
import { BusinessCard } from '../components/card/BusinessCard';
import { QRPreview } from '../components/qr/QRPreview';
import { ROUTES } from '../navigation/routes';
import { useProfile } from '../hooks/useProfile';
import { exportService } from '../services/exportService';
import { shareService } from '../services/shareService';

export const MyCardScreen = React.memo(({ navigation }) => {
  const { colors } = useTheme();
  const { profile } = useProfile();
  const businessCardRef = useRef(null);
  const [isSavingContact, setIsSavingContact] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleSaveContact = useCallback(async () => {
    if (!profile || isSavingContact) return;

    setIsSavingContact(true);

    try {
      const uri = await exportService.exportVCard(profile);
      const result = await shareService.shareFile(uri, {
        dialogTitle: 'Save Contact',
        mimeType: 'text/vcard',
        UTI: 'public.vcard',
      });

      if (!result.success) {
        Alert.alert('Save Contact', result.message);
      }
    } catch (error) {
      Alert.alert(
        'Save Contact',
        error instanceof Error ? error.message : 'Unable to prepare the contact file.'
      );
    } finally {
      setIsSavingContact(false);
    }
  }, [profile, isSavingContact]);

  const handleShare = useCallback(async () => {
    if (!businessCardRef.current || isSharing) return;

    setIsSharing(true);

    try {
      const uri = await exportService.captureComponent(businessCardRef);
      const result = await shareService.shareFile(uri, {
        dialogTitle: 'Share Card',
        mimeType: 'image/png',
        UTI: 'public.png',
      });

      if (!result.success) {
        Alert.alert('Share Card', result.message);
      }
    } catch (error) {
      Alert.alert(
        'Share Card',
        error instanceof Error ? error.message : 'Unable to prepare the card image.'
      );
    } finally {
      setIsSharing(false);
    }
  }, [isSharing]);

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
          <BusinessCard
            ref={businessCardRef}
            profile={profile}
            onSaveContact={handleSaveContact}
            onShare={handleShare}
          />
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
            title="Export"
            variant="ghost"
            leftIcon={<MaterialCommunityIcons name="export" size={20} color={colors.primary} />}
            onPress={() => navigation.navigate(ROUTES.PREVIEW)}
            style={styles.shareButton}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
});

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
