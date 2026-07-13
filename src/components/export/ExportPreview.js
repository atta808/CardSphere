import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { BusinessCard } from '../card/BusinessCard';
import { QRCard } from '../qr/QRCard';
import { spacing } from '../../theme';

export const ExportPreview = ({ profile, businessCardRef, qrCardRef }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* We need ViewShot wrappers around the components, or we can use the refs directly if the components support it.
          BusinessCard might not be wrapped in ViewShot, so we wrap it here.
          QRCard is already wrapped in ViewShot in Phase 7, but it takes a ref. Let's make sure. */}

      <ViewShot ref={businessCardRef} options={{ format: 'png', quality: 1.0 }} style={styles.cardWrapper}>
        <BusinessCard profile={profile} />
      </ViewShot>

      <View style={styles.qrWrapper}>
        {/* QRCard internally uses ViewShot and forwardRef */}
        <QRCard profile={profile} ref={qrCardRef} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    // Needs transparent background to capture corners correctly depending on the ViewShot implementation,
    // though the requirement says transparent background is not strictly required.
    backgroundColor: 'transparent',
  },
  qrWrapper: {
    marginTop: spacing['2xl'],
    width: '100%',
    alignItems: 'center',
  },
});
