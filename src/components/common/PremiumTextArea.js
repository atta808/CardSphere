import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme, typography, spacing, radius } from '../../theme';

export const PremiumTextArea = ({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  maxLength,
  style,
  inputStyle,
  containerStyle,
  ...props
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (errorText) return colors.error;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  const getBackgroundColor = () => {
    if (disabled) return colors.background;
    return colors.surface;
  };

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
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          editable={!disabled}
          multiline
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          textAlignVertical="top"
          style={[
            styles.input,
            { color: colors.textPrimary, ...typography.body },
            inputStyle,
          ]}
          {...props}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          {errorText ? (
            <Text style={[styles.errorText, { color: colors.error, ...typography.caption }]}>{errorText}</Text>
          ) : helperText ? (
            <Text style={[styles.helperText, { color: colors.textSecondary, ...typography.caption }]}>{helperText}</Text>
          ) : null}
        </View>

        {maxLength ? (
          <Text style={[styles.counter, { color: colors.textSecondary, ...typography.caption }]}>
            {value?.length || 0}/{maxLength}
          </Text>
        ) : null}
      </View>
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
    minHeight: 120,
    padding: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  footerLeft: {
    flex: 1,
  },
  errorText: {},
  helperText: {},
  counter: {
    marginLeft: spacing.md,
  },
});
