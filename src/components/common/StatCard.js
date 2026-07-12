import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../../theme';
import { PremiumCard } from './PremiumCard';

export const StatCard = ({
  icon,
  label,
  value,
  trend,
  trendValue,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <PremiumCard variant="elevated" style={[styles.card, style]} contentStyle={styles.content}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
          <MaterialCommunityIcons name={icon} size={20} color={colors.primary} />
        </View>
        {trend && (
          <View style={[
            styles.trendContainer,
            { backgroundColor: trend === 'up' ? `${colors.success}20` : `${colors.error}20` }
          ]}>
            <MaterialCommunityIcons
              name={trend === 'up' ? 'trending-up' : 'trending-down'}
              size={14}
              color={trend === 'up' ? colors.success : colors.error}
            />
            {trendValue && (
              <Text style={[
                styles.trendText,
                { color: trend === 'up' ? colors.success : colors.error }
              ]}>
                {trendValue}
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.dataContainer}>
        <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      </View>
    </PremiumCard>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.xs,
    borderRadius: radius.large,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: radius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.small,
  },
  trendText: {
    ...typography.smallText,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  dataContainer: {
    marginTop: spacing.xs,
  },
  value: {
    ...typography.title,
    fontWeight: 'bold',
  },
  label: {
    ...typography.caption,
    marginTop: 2,
  },
});
