import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, spacing } from '../../theme';
import { PremiumButton } from '../common/PremiumButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ActionButtons = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <PremiumButton
        title="Save Contact"
        variant="primary"
        leftIcon={<MaterialCommunityIcons name="account-plus" size={20} color="#FFFFFF" />}
        style={styles.actionBtn}
        disabled={true}
      />
      <PremiumButton
        title="Share"
        variant="outline"
        leftIcon={<MaterialCommunityIcons name="share-variant" size={20} color={colors.primary} />}
        style={styles.actionBtn}
        disabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  actionBtn: {
    width: '100%',
  },
});
