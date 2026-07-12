import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, typography, spacing } from '../../theme';
import { PremiumAvatar } from '../common/PremiumAvatar';

export const ProfileHeader = ({ profile }) => {
  const { colors } = useTheme();

  if (!profile?.personal?.fullName && !profile?.personal?.jobTitle) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.avatarBorder, { borderColor: colors.primary }]}>
        <PremiumAvatar size="large" />
      </View>
      <View style={styles.textContainer}>
        {profile?.personal?.fullName ? (
          <Text style={[styles.name, { color: colors.textPrimary }]}>
            {profile.personal.fullName}
          </Text>
        ) : null}
        {profile?.personal?.jobTitle ? (
          <Text style={[styles.jobTitle, { color: colors.textSecondary }]}>
            {profile.personal.jobTitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  avatarBorder: {
    borderWidth: 2,
    borderRadius: 100, // Make sure it stays round
    padding: 2, // Space between border and avatar
    marginBottom: spacing.md,
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    ...typography.heading,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  jobTitle: {
    ...typography.title,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
