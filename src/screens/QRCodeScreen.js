import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumButton } from '../components/common/PremiumButton';
import { QRCard } from '../components/qr/QRCard';
import { useProfile } from '../hooks/useProfile';
import { shareService } from '../services/shareService';

export const QRCodeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile } = useProfile();
  const qrCardRef = useRef(null);

  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(''); // Store success/error messages

  const captureQRCard = async () => {
    if (!qrCardRef.current || !qrCardRef.current.capture) {
      throw new Error('Unable to capture QR Code.');
    }
    return await qrCardRef.current.capture();
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);
    setMessage('');
    try {
      const uri = await captureQRCard();
      const result = await shareService.shareFile(uri);
      if (!result.success) {
        setMessage(result.message);
      }
    } catch {
      setMessage('Failed to capture QR code for sharing.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    setMessage('');
    try {
      const uri = await captureQRCard();
      const result = await shareService.saveToGallery(uri);
      setMessage(result.message);
    } catch {
      setMessage('Failed to capture QR code for saving.');
    } finally {
      setIsSaving(false);
    }
  };

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

        {!!message && (
          <View style={styles.messageContainer}>
            <Text style={[styles.messageText, { color: colors.primary }]}>{message}</Text>
          </View>
        )}

        <View style={styles.cardWrapper}>
          <QRCard ref={qrCardRef} profile={profile} />
        </View>

        <View style={styles.actionsContainer}>
          <PremiumButton
            title={isSharing ? "Sharing..." : "Share QR Code"}
            variant="primary"
            leftIcon={<MaterialCommunityIcons name="share-variant" size={20} color="#FFFFFF" />}
            style={styles.actionBtn}
            onPress={handleShare}
            disabled={isSharing || isSaving}
            accessibilityLabel="Share QR Code"
          />
          <PremiumButton
            title={isSaving ? "Saving..." : "Save Image"}
            variant="outline"
            leftIcon={<MaterialCommunityIcons name="download" size={20} color={colors.primary} />}
            style={styles.actionBtn}
            onPress={handleSave}
            disabled={isSharing || isSaving}
            accessibilityLabel="Save QR Code Image"
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
  messageContainer: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  messageText: {
    ...typography.caption,
    textAlign: 'center',
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  actionsContainer: {
    width: '100%',
    maxWidth: 320,
    marginTop: spacing.md,
    gap: spacing.md,
  },
  actionBtn: {
    width: '100%',
  },
});
