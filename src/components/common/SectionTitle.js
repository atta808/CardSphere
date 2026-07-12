import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, typography, spacing } from '../../theme';

export const SectionTitle = ({ title, subtitle, style }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, style]} accessibilityRole="header">
      <Text style={[styles.title, { color: colors.textPrimary, ...typography.title }]} accessibilityLabel={title}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: colors.textSecondary, ...typography.subtitle }]} accessibilityLabel={subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
  },
});
