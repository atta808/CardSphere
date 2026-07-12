import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../../theme';
import { PremiumCard } from './PremiumCard';

export const ActionTile = ({
  icon,
  title,
  onPress,
  style,
  color,
}) => {
  const { colors } = useTheme();

  const iconColor = color || colors.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[styles.wrapper, style]}
    >
      <PremiumCard variant="elevated" style={styles.card} contentStyle={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${iconColor}20` }]}>
          <MaterialCommunityIcons name={icon} size={28} color={iconColor} />
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
          {title}
        </Text>
      </PremiumCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minWidth: 100,
    margin: spacing.xs,
  },
  card: {
    borderRadius: radius.large,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    minHeight: 110,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.caption,
    fontWeight: '600',
    textAlign: 'center',
  },
});
