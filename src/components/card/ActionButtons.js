import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { PremiumButton } from '../common/PremiumButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ActionButtons = ({ templateConfig, accentColor }) => {


  const { layout } = templateConfig || {};

  return (
    <View style={[styles.container, { paddingVertical: spacing[layout?.sectionSpacing] || spacing.md }]}>
      <PremiumButton
        title="Save Contact"
        variant="primary"
        leftIcon={<MaterialCommunityIcons name="account-plus" size={20} color="#FFFFFF" />}
        style={[styles.actionBtn, { backgroundColor: accentColor }]}
        disabled={true}
      />
      <PremiumButton
        title="Share"
        variant="outline"
        leftIcon={<MaterialCommunityIcons name="share-variant" size={20} color={accentColor} />}
        style={[styles.actionBtn, { borderColor: accentColor }]}
        textStyle={{ color: accentColor }}
        disabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  actionBtn: {
    width: '100%',
  },
});
