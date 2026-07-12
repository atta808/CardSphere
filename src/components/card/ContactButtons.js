import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme, spacing, typography } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ContactButtons = ({ profile }) => {
  const { colors } = useTheme();

  const hasContact = profile?.contact?.mobile || profile?.contact?.email || profile?.contact?.website || profile?.contact?.address;

  if (!hasContact) {
    return null;
  }

  const renderContactItem = (icon, value, title) => {
    if (!value) return null;
    return (
      <View style={styles.contactItem}>
        <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
          <MaterialCommunityIcons name={icon} size={20} color={colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.contactTitle, { color: colors.textSecondary }]}>{title}</Text>
          <Text style={[styles.contactValue, { color: colors.textPrimary }]}>{value}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
    paddingVertical: spacing.md,
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
    ...typography.body,
    fontWeight: '500',
  },
});
