import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme, radius, shadows } from '../../theme';

export const PremiumIconButton = ({
  icon,
  onPress,
  variant = 'filled', // filled, outline, ghost
  size = 'medium', // small, medium, large
  state = 'normal', // normal, disabled, loading
  style,
  accessibilityLabel,
  ...props
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (state === 'disabled') return colors.border;
    switch (variant) {
      case 'filled': return colors.surface; // or primary depending on usecase, usually surface for icon buttons or primary
      case 'outline':
      case 'ghost':
        return 'transparent';
      default: return colors.surface;
    }
  };

  const getBorderColor = () => {
    if (state === 'disabled') return colors.border;
    if (variant === 'outline') return colors.border;
    return 'transparent';
  };

  const getDimensions = () => {
    switch (size) {
      case 'small': return 32;
      case 'large': return 56;
      case 'medium':
      default: return 48;
    }
  };

  const dim = getDimensions();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={state === 'disabled' || state === 'loading'}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: state === 'disabled', busy: state === 'loading' }}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
          width: dim,
          height: dim,
          borderRadius: radius.circle,
          opacity: state === 'disabled' ? 0.6 : 1,
        },
        variant === 'filled' && state !== 'disabled' ? shadows.small : null,
        style,
      ]}
      {...props}
    >
      {state === 'loading' ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
