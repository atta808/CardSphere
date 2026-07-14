import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, typography, spacing } from '../../theme';
import { PremiumAvatar } from '../common/PremiumAvatar';

export const ProfileHeader = ({ profile, templateConfig, accentColor }) => {
  const { colors } = useTheme();

  if (!profile?.personal?.fullName && !profile?.personal?.jobTitle) {
    return null;
  }

  const { layout, appearance, typography: typoConfig } = templateConfig;

  const isRowAlignment = layout.headerAlignment === 'row';
  const isLeftAlignment = layout.headerAlignment === 'left';

  let containerAlignment = 'center';
  if (isLeftAlignment) containerAlignment = 'flex-start';

  let textAlign = 'center';
  if (isLeftAlignment || isRowAlignment) textAlign = 'left';

  return (
    <View
      style={[
        styles.container,
        isRowAlignment && styles.rowContainer,
        !isRowAlignment && { alignItems: containerAlignment },
        {
          paddingTop: spacing[layout.contentSpacing] || spacing.xl,
          paddingBottom: spacing[layout.sectionSpacing] || spacing.md,
          backgroundColor: appearance.solidHeader ? `${accentColor}15` : 'transparent',
          paddingHorizontal: spacing.xl,
        }
      ]}
    >
      <View
        style={[
          styles.avatarBorder,
          {
            borderColor: appearance.showAvatarBorder ? accentColor : 'transparent',
            marginRight: isRowAlignment ? spacing.lg : 0,
            marginBottom: isRowAlignment ? 0 : spacing.md,
          }
        ]}
      >
        {/* Pass explicit size to PremiumAvatar or use its preset size?
            PremiumAvatar likely supports "large" or explicit pixels if we modify it.
            For now, we just pass the size down. PremiumAvatar might need a custom size prop. */}
        <PremiumAvatar size="large" customSize={layout.avatarSize} />
      </View>
      <View style={[styles.textContainer, { alignItems: isRowAlignment || isLeftAlignment ? 'flex-start' : 'center' }]}>
        {profile?.personal?.fullName ? (
          <Text style={[styles.name, typography[typoConfig.nameVariant], { color: colors.textPrimary, textAlign }]}>
            {profile.personal.fullName}
          </Text>
        ) : null}
        {profile?.personal?.jobTitle ? (
          <Text style={[styles.jobTitle, typography[typoConfig.jobVariant], { color: colors.textSecondary, textAlign }]}>
            {profile.personal.jobTitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Defaults overridden in style array
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBorder: {
    borderWidth: 2,
    borderRadius: 999, // Make sure it stays round
    padding: 2, // Space between border and avatar
  },
  textContainer: {
    flex: 1, // Useful for row alignment
  },
  name: {
    marginBottom: spacing.xs,
  },
  jobTitle: {
    fontWeight: 'normal',
  },
});
