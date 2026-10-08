import React from 'react';
import { View, StyleSheet, Text, Pressable, Linking, Alert } from 'react-native';
import { useTheme, spacing, typography } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const normalizeWebsite = (value) => {
  if (!value) return null;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
};

const openContactAction = async (type, value) => {
  if (!value) return;

  const urls = {
    phone: `tel:${value}`,
    email: `mailto:${value}`,
    website: normalizeWebsite(value),
    address: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`,
  };

  const url = urls[type];
  if (!url) return;

  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('Unable to open', 'This action is not supported on this device.');
      return;
    }
    await Linking.openURL(url);
  } catch {
    Alert.alert('Unable to open', 'Please check the contact information and try again.');
  }
};

export const ContactButtons = ({ profile, templateConfig, accentColor }) => {
  const { colors } = useTheme();

  const hasContact =
    profile?.contact?.mobile ||
    profile?.contact?.email ||
    profile?.contact?.website ||
    profile?.contact?.address;

  if (!hasContact) {
    return null;
  }

  const { layout, typography: typoConfig } = templateConfig;

  const renderContactItem = (icon, value, title, actionType) => {
    if (!value) return null;

    return (
      <Pressable
        style={({ pressed }) => [styles.contactItem, pressed && styles.pressed]}
        onPress={() => openContactAction(actionType, value)}
        accessibilityRole="button"
        accessibilityLabel={`${title}: ${value}`}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${accentColor}15` }]}>
          <MaterialCommunityIcons name={icon} size={20} color={accentColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.contactTitle, { color: colors.textSecondary }]}>{title}</Text>
          <Text
            style={[
              styles.contactValue,
              typography[typoConfig.bodyVariant],
              { color: colors.textPrimary },
            ]}
            numberOfLines={2}
          >
            {value}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSecondary} />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { paddingVertical: spacing[layout.sectionSpacing] || spacing.md }]}>
      {renderContactItem('phone', profile?.contact?.mobile, 'Mobile', 'phone')}
      {renderContactItem('email', profile?.contact?.email, 'Email', 'email')}
      {renderContactItem('web', profile?.contact?.website, 'Website', 'website')}
      {renderContactItem('map-marker', profile?.contact?.address, 'Address', 'address')}
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
  pressed: {
    opacity: 0.65,
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
