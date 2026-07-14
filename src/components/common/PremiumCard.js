import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, radius, spacing, shadows } from '../../theme';

export const PremiumCard = ({
  variant = 'elevated', // elevated, flat, outlined
  header,
  body,
  footer,
  style,
  contentStyle,
  ...props
}) => {
  const { colors } = useTheme();

  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: colors.card,
      borderRadius: radius.large,
      overflow: 'hidden',
    };

    switch (variant) {
      case 'outlined':
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'flat':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
        };
      case 'elevated':
      default:
        return {
          ...baseStyle,
          ...shadows.medium,
        };
    }
  };

  return (
    <View style={[getCardStyle(), style]} {...props}>
      {header ? <View style={styles.header}>{header}</View> : null}

      {body ? (
        <View style={[styles.body, contentStyle]}>{body}</View>
      ) : null}

      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'transparent', // Let parent control if they want a divider
  },
  body: {
    padding: spacing.md,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'transparent',
  },
});
