import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useTheme, typography, spacing, radius, shadows } from '../../theme';

export const PremiumButton = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, ghost, danger
  size = 'medium', // small, medium, large
  state = 'normal', // normal, pressed, disabled, loading
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
  ...props
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (state === 'disabled') return colors.border;
    switch (variant) {
      case 'primary': return colors.primary;
      case 'secondary': return colors.secondary;
      case 'danger': return colors.error;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default: return colors.primary;
    }
  };

  const getTextColor = () => {
    if (state === 'disabled') return colors.textSecondary;
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return '#FFFFFF';
      case 'outline':
      case 'ghost':
        return colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getBorderColor = () => {
    if (state === 'disabled') return colors.border;
    if (variant === 'outline') return colors.primary;
    return 'transparent';
  };

  const getHeight = () => {
    switch (size) {
      case 'small': return 32;
      case 'large': return 56;
      case 'medium':
      default: return 48;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small': return spacing.sm;
      case 'large': return spacing.xl;
      case 'medium':
      default: return spacing.md;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small': return typography.caption.fontSize;
      case 'large': return typography.title.fontSize;
      case 'medium':
      default: return typography.button.fontSize;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={state === 'disabled' || state === 'loading'}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: state === 'disabled', busy: state === 'loading' }}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
          height: getHeight(),
          paddingHorizontal: getPadding(),
          borderRadius: radius.medium,
          width: fullWidth ? '100%' : 'auto',
          opacity: state === 'disabled' ? 0.6 : 1,
        },
        variant === 'primary' && state !== 'disabled' ? shadows.small : null,
        style,
      ]}
      {...props}
    >
      {state === 'loading' ? (
        <ActivityIndicator color={getTextColor()} style={styles.loader} />
      ) : null}

      {!state || state !== 'loading' ? (
        <View style={styles.content}>
          {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
          <Text style={[
            styles.text,
            { color: getTextColor(), fontSize: getFontSize(), ...typography.button, fontSize: getFontSize() },
            textStyle
          ]}>
            {title}
          </Text>
          {rightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  loader: {
    marginRight: 8,
  },
});
