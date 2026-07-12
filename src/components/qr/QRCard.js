import React, { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { QRGenerator } from './QRGenerator';
import { typography, spacing, radius } from '../../theme';

export const QRCard = forwardRef(({ profile, style }, ref) => {
  const fullName = profile?.personal?.fullName || 'User';
  const jobTitle = profile?.personal?.jobTitle || '';
  const company = profile?.personal?.company || '';

  return (
    <ViewShot ref={ref} options={{ format: 'png', quality: 1.0 }} style={[styles.container, style]}>
      <View style={styles.cardContent}>
        <View style={styles.qrWrapper}>
          <QRGenerator profile={profile} size={220} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.name} numberOfLines={1}>{fullName}</Text>
          {!!jobTitle && <Text style={styles.jobTitle} numberOfLines={1}>{jobTitle}</Text>}
          {!!company && <Text style={styles.company} numberOfLines={1}>{company}</Text>}
        </View>
      </View>
    </ViewShot>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Strictly white background for printer-friendliness
    borderRadius: radius.xlarge,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  qrWrapper: {
    marginBottom: spacing.xl,
    padding: spacing.md, // Add a little extra white padding for safety
    backgroundColor: '#FFFFFF',
    borderRadius: radius.medium,
  },
  textWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    ...typography.title,
    fontSize: 20,
    color: '#000000', // Black text
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  jobTitle: {
    ...typography.body,
    color: '#333333', // Dark gray
    marginBottom: 2,
    textAlign: 'center',
  },
  company: {
    ...typography.caption,
    color: '#666666', // Medium gray
    textAlign: 'center',
  }
});
