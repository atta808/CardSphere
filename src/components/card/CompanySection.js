import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing } from '../../theme';

export const CompanySection = ({ profile, templateConfig, accentColor }) => {
  const { colors } = useTheme();

  if (!profile?.personal?.company && !profile?.personal?.bio) {
    return null;
  }

  const { layout, typography: typoConfig } = templateConfig;

  const isRowAlignment = layout.headerAlignment === 'row';
  const isLeftAlignment = layout.headerAlignment === 'left';

  let containerAlignment = 'center';
  if (isLeftAlignment || isRowAlignment) containerAlignment = 'flex-start';

  let textAlign = 'center';
  if (isLeftAlignment || isRowAlignment) textAlign = 'left';

  return (
    <View style={[styles.container, { alignItems: containerAlignment, paddingBottom: spacing[layout.contentSpacing] || spacing.lg }]}>
      {profile?.personal?.company ? (
        <View style={styles.companyRow}>
          <MaterialCommunityIcons name="domain" size={16} color={accentColor} style={styles.icon} />
          <Text style={[styles.company, typography[typoConfig.bodyVariant], { color: accentColor }]}>
            {profile.personal.company}
          </Text>
        </View>
      ) : null}

      {profile?.personal?.bio ? (
        <Text style={[styles.bio, typography[typoConfig.bodyVariant], { color: colors.textSecondary, textAlign }]}>
          {profile.personal.bio}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
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
    fontWeight: '600',
  },
  bio: {
    lineHeight: 22,
  },
});
