import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QRGenerator } from './QRGenerator';
import { useTheme, typography, spacing, radius } from '../../theme';
import { PremiumCard } from '../common/PremiumCard';

export const QRPreview = React.memo(({ profile, onPress, style }) => {
  const { colors } = useTheme();

  return (
    <PremiumCard variant="elevated" style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        activeOpacity={0.8}
        accessibilityLabel="View full QR Code"
        accessibilityRole="button"
      >
        <View style={styles.qrContainer}>
          <QRGenerator profile={profile} size={80} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Your QR Code</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Tap to share or download</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
      </TouchableOpacity>
    </PremiumCard>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  qrContainer: {
    padding: spacing.xs,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.small,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.title,
    fontSize: 16,
    marginBottom: 2,
  },
  subtitle: {
    ...typography.caption,
  }
});
