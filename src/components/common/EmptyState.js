import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, typography, spacing } from '../../theme';

export const EmptyState = ({ icon, title, description, action }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {icon ? <View style={{ marginBottom: spacing.md }}>{icon}</View> : null}
      {title ? <Text style={[styles.title, { color: colors.textPrimary, ...typography.title }]}>{title}</Text> : null}
      {description ? (
        <Text style={[styles.description, { color: colors.textSecondary, ...typography.body }]}>{description}</Text>
      ) : null}
      {action ? <View style={{ marginTop: spacing.md }}>{action}</View> : null}
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
  description: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
