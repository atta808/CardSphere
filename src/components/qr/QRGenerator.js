import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { qrService } from '../../services/qrService';
import { useTheme } from '../../theme';

export const QRGenerator = React.memo(({ profile, size = 200, style }) => {
  const { colors } = useTheme();

  // Memoize the vCard generation so it only regenerates if the profile data changes
  const vCardData = useMemo(() => {
    return qrService.generateVCard(profile);
  }, [profile]);

  if (!vCardData) {
    return (
      <View style={[styles.fallbackContainer, { width: size, height: size, backgroundColor: colors.surface }, style]}>
        <Text style={{ color: colors.textSecondary }}>No data</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]} accessibilityLabel="QR Code">
      <QRCode
        value={vCardData}
        size={size}
        color="#000000" // Black QR modules
        backgroundColor="#FFFFFF" // White background
        quietZone={10} // Proper quiet zone
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  }
});
