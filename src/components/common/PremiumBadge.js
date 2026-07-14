import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, typography, spacing, radius } from '../../theme';

export const PremiumBadge = ({
  text,
  variant = 'primary', // primary, success, warning, error, info, neutral
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'success': return { bg: colors.success + '20', text: colors.success };
      case 'warning': return { bg: colors.warning + '20', text: colors.warning };
      case 'error': return { bg: colors.error + '20', text: colors.error };
      case 'info': return { bg: colors.info + '20', text: colors.info };
      case 'neutral': return { bg: colors.surface, text: colors.textSecondary };
      case 'primary':
      default: return { bg: colors.primary + '20', text: colors.primary };
    }
  };

  const badgeColors = getColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: badgeColors.bg,
          borderRadius: radius.pill,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: badgeColors.text, ...typography.smallText }, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    alignSelf: 'flex-start',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
});
