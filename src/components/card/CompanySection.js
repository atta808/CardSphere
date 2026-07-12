import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing } from '../../theme';

export const CompanySection = ({ profile }) => {
  const { colors } = useTheme();

  if (!profile?.personal?.company && !profile?.personal?.bio) {
    return null;
  }

  return (
    <View style={styles.container}>
      {profile?.personal?.company ? (
        <View style={styles.companyRow}>
          <MaterialCommunityIcons name="domain" size={16} color={colors.primary} style={styles.icon} />
          <Text style={[styles.company, { color: colors.primary }]}>
            {profile.personal.company}
          </Text>
        </View>
      ) : null}

      {profile?.personal?.bio ? (
        <Text style={[styles.bio, { color: colors.textSecondary }]}>
          {profile.personal.bio}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    marginRight: spacing.xs,
  },
  company: {
    ...typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  bio: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 22,
  },
});
