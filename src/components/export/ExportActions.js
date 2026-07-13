import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, spacing } from '../../theme';
import { PremiumButton } from '../common/PremiumButton';
import { exportService } from '../../services/exportService';
import { pdfService } from '../../services/pdfService';
import { printService } from '../../services/printService';
import { shareService } from '../../services/shareService';

export const ExportActions = ({ profile, businessCardRef, qrCardRef }) => {
  const { colors } = useTheme();
  const [loadingAction, setLoadingAction] = useState(null);

  const handleExportPNG = useCallback(async () => {
    let uri;
    try {
      setLoadingAction('png');
      uri = await exportService.captureComponent(businessCardRef);
      const { success, message } = await shareService.saveToGallery(uri);
      if (success) {
        Alert.alert('Success', 'Business card saved to gallery.');
      } else {
        Alert.alert('Notice', message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to export PNG.');
    } finally {
      setLoadingAction(null);
      if (uri) {
        await exportService.cleanupFiles([uri]);
      }
    }
  }, [businessCardRef]);

  const handleExportPDF = useCallback(async () => {
    let businessCardUri, qrCardUri, pdfUri;
    try {
      setLoadingAction('pdf');
      businessCardUri = await exportService.captureComponent(businessCardRef);
      qrCardUri = await exportService.captureComponent(qrCardRef);

      pdfUri = await pdfService.generatePDF(profile, businessCardUri, qrCardUri);

      const { success, message } = await shareService.shareFile(pdfUri, {
        dialogTitle: 'Save PDF',
        mimeType: 'application/pdf',
        UTI: 'com.adobe.pdf',
      });

      if (!success) {
        Alert.alert('Notice', message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to export PDF.');
    } finally {
      setLoadingAction(null);
      await exportService.cleanupFiles([businessCardUri, qrCardUri]);
    }
  }, [profile, businessCardRef, qrCardRef]);

  const handleExportVCard = useCallback(async () => {
    try {
      setLoadingAction('vcard');
      const vCardUri = await exportService.exportVCard(profile);
      const { success, message } = await shareService.shareFile(vCardUri, {
        dialogTitle: 'Save Contact',
        mimeType: 'text/vcard',
        UTI: 'public.vcard',
      });
      if (!success) {
        Alert.alert('Notice', message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to export vCard.');
    } finally {
      setLoadingAction(null);
    }
  }, [profile]);

  const handlePrint = useCallback(async () => {
    let businessCardUri, qrCardUri, pdfUri;
    try {
      setLoadingAction('print');
      businessCardUri = await exportService.captureComponent(businessCardRef);
      qrCardUri = await exportService.captureComponent(qrCardRef);

      pdfUri = await pdfService.generatePDF(profile, businessCardUri, qrCardUri);

      const { success, message } = await printService.printPDF(pdfUri);
      if (!success) {
        Alert.alert('Notice', message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to print PDF.');
    } finally {
      setLoadingAction(null);
      await exportService.cleanupFiles([businessCardUri, qrCardUri, pdfUri]);
    }
  }, [profile, businessCardRef, qrCardRef]);

  const handleShare = useCallback(async () => {
    let businessCardUri;
    try {
      setLoadingAction('share');
      businessCardUri = await exportService.captureComponent(businessCardRef);

      const { success, message } = await shareService.shareFile(businessCardUri, {
        dialogTitle: 'Share Business Card',
        mimeType: 'image/png',
        UTI: 'public.png',
      });
      if (!success) {
        Alert.alert('Notice', message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to share card.');
    } finally {
      setLoadingAction(null);
      // cleanup handled inside shareFile, but safe to ignore if it doesn't delete it immediately
    }
  }, [businessCardRef]);

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <PremiumButton
          title="PNG"
          variant="outline"
          leftIcon={<MaterialCommunityIcons name="image" size={20} color={colors.primary} />}
          style={styles.actionBtn}
          onPress={handleExportPNG}
          isLoading={loadingAction === 'png'}
          disabled={loadingAction !== null}
          accessibilityLabel="Export as PNG image"
          accessibilityRole="button"
        />
        <PremiumButton
          title="PDF"
          variant="outline"
          leftIcon={<MaterialCommunityIcons name="file-pdf-box" size={20} color={colors.primary} />}
          style={styles.actionBtn}
          onPress={handleExportPDF}
          isLoading={loadingAction === 'pdf'}
          disabled={loadingAction !== null}
          accessibilityLabel="Export as PDF document"
          accessibilityRole="button"
        />
        <PremiumButton
          title="vCard"
          variant="outline"
          leftIcon={<MaterialCommunityIcons name="account-box" size={20} color={colors.primary} />}
          style={styles.actionBtn}
          onPress={handleExportVCard}
          isLoading={loadingAction === 'vcard'}
          disabled={loadingAction !== null}
          accessibilityLabel="Export as vCard contact"
          accessibilityRole="button"
        />
        <PremiumButton
          title="Print"
          variant="outline"
          leftIcon={<MaterialCommunityIcons name="printer" size={20} color={colors.primary} />}
          style={styles.actionBtn}
          onPress={handlePrint}
          isLoading={loadingAction === 'print'}
          disabled={loadingAction !== null}
          accessibilityLabel="Print Business Card"
          accessibilityRole="button"
        />
        <PremiumButton
          title="Share"
          variant="primary"
          leftIcon={<MaterialCommunityIcons name="share-variant" size={20} color="#FFFFFF" />}
          style={styles.actionBtn}
          onPress={handleShare}
          isLoading={loadingAction === 'share'}
          disabled={loadingAction !== null}
          accessibilityLabel="Share Business Card via Native Share Sheet"
          accessibilityRole="button"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingVertical: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    alignItems: 'center',
  },
  actionBtn: {
    minWidth: 100,
  },
});
