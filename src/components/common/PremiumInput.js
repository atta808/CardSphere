import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, typography, spacing, radius } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';

export const PremiumInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  readOnly = false,
  leftIcon,
  rightIcon,
  passwordToggle = false,
  style,
  inputStyle,
  containerStyle,
  ...props
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getBorderColor = () => {
    if (errorText) return colors.error;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  const getBackgroundColor = () => {
    if (disabled) return colors.background;
    return colors.surface;
  };

  const secureTextEntry = passwordToggle && !isPasswordVisible;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, { color: colors.textPrimary, ...typography.label }]}>{label}</Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
            borderRadius: radius.medium,
            borderWidth: 1,
            opacity: disabled ? 0.6 : 1,
          },
          style,
        ]}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          editable={!disabled && !readOnly}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            { color: colors.textPrimary, ...typography.body },
            inputStyle,
          ]}
          {...props}
        />

        {rightIcon && !passwordToggle ? <View style={styles.rightIcon}>{rightIcon}</View> : null}

        {passwordToggle ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.rightIcon}
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
          >
            <MaterialIcons
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {errorText ? (
        <Text style={[styles.errorText, { color: colors.error, ...typography.caption }]}>{errorText}</Text>
      ) : helperText ? (
        <Text style={[styles.helperText, { color: colors.textSecondary, ...typography.caption }]}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  errorText: {
    marginTop: spacing.xs,
  },
  helperText: {
    marginTop: spacing.xs,
  },
});
