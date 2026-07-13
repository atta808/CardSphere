import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme, spacing, typography } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ContactButtons = ({ profile, templateConfig, accentColor }) => {
  const { colors } = useTheme();

  const hasContact = profile?.contact?.mobile || profile?.contact?.email || profile?.contact?.website || profile?.contact?.address;

  if (!hasContact) {
    return null;
  }

  const { layout, typography: typoConfig } = templateConfig;

  const renderContactItem = (icon, value, title) => {
    if (!value) return null;
    return (
      <View style={styles.contactItem}>
        <View style={[styles.iconContainer, { backgroundColor: `${accentColor}15` }]}>
          <MaterialCommunityIcons name={icon} size={20} color={accentColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.contactTitle, { color: colors.textSecondary }]}>{title}</Text>
          <Text style={[styles.contactValue, typography[typoConfig.bodyVariant], { color: colors.textPrimary }]}>{value}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingVertical: spacing[layout.sectionSpacing] || spacing.md }]}>
      {renderContactItem('phone', profile?.contact?.mobile, 'Mobile')}
      {renderContactItem('email', profile?.contact?.email, 'Email')}
      {renderContactItem('web', profile?.contact?.website, 'Website')}
      {renderContactItem('map-marker', profile?.contact?.address, 'Address')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contactTitle: {
    ...typography.caption,
    marginBottom: 2,
  },
  contactValue: {
    fontWeight: '500',
  },
});
