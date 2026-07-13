import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useTheme, typography, spacing, radius } from '../../theme';

export const PremiumChip = ({
  label,
  selected = false,
  disabled = false,
  onPress,
  icon,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.background;
    if (selected) return colors.primary;
    return colors.surface;
  };

  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    if (selected) return '#FFFFFF';
    return colors.textPrimary;
  };

  const getBorderColor = () => {
    if (disabled) return colors.border;
    if (selected) return colors.primary;
    return colors.border;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderRadius: radius.pill,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
      <Text style={[styles.label, { color: getTextColor(), ...typography.caption }, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    marginRight: spacing.xs,
  },
  label: {
    textAlign: 'center',
  },
});
