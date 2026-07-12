import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing } from '../../theme';
import { PremiumButton } from './PremiumButton';

export const ErrorView = ({ title = 'An error occurred', message, onRetry }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={48} color={colors.error} style={{ marginBottom: spacing.md }} />
      <Text style={[styles.title, { color: colors.textPrimary, ...typography.title }]}>{title}</Text>
      {message ? (
        <Text style={[styles.message, { color: colors.textSecondary, ...typography.body }]}>{message}</Text>
      ) : null}
      {onRetry ? (
        <PremiumButton title="Retry" onPress={onRetry} variant="outline" style={{ marginTop: spacing.md }} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  message: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
