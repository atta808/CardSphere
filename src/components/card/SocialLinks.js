import React from 'react';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import { spacing } from '../../theme';
import { SocialButton } from '../common/SocialButton';

const normalizeUrl = (value) => {
  if (!value) return null;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
};

const openSocialLink = async (value) => {
  const url = normalizeUrl(value);
  if (!url) return;

  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('Unable to open link', 'This social link cannot be opened on this device.');
      return;
    }
    await Linking.openURL(url);
  } catch {
    Alert.alert('Unable to open link', 'Please check the social profile URL and try again.');
  }
};

export const SocialLinks = ({ profile, templateConfig }) => {
  const hasSocial =
    profile?.social?.linkedin ||
    profile?.social?.x ||
    profile?.social?.facebook ||
    profile?.social?.instagram ||
    profile?.social?.youtube;

  if (!hasSocial) {
    return null;
  }

  const { layout } = templateConfig || {};

  return (
    <View style={[styles.container, { paddingVertical: spacing[layout?.sectionSpacing] || spacing.md }]}>
      <View style={styles.socialGrid}>
        {profile?.social?.linkedin ? (
          <SocialButton
            icon="linkedin"
            color="#0077b5"
            size={48}
            onPress={() => openSocialLink(profile.social.linkedin)}
            style={styles.socialBtn}
            accessibilityLabel="Open LinkedIn profile"
          />
        ) : null}
        {profile?.social?.x ? (
          <SocialButton
            icon="twitter"
            color="#1DA1F2"
            size={48}
            onPress={() => openSocialLink(profile.social.x)}
            style={styles.socialBtn}
            accessibilityLabel="Open X profile"
          />
        ) : null}
        {profile?.social?.facebook ? (
          <SocialButton
            icon="facebook"
            color="#1877F2"
            size={48}
            onPress={() => openSocialLink(profile.social.facebook)}
            style={styles.socialBtn}
            accessibilityLabel="Open Facebook profile"
          />
        ) : null}
        {profile?.social?.instagram ? (
          <SocialButton
            icon="instagram"
            color="#E1306C"
            size={48}
            onPress={() => openSocialLink(profile.social.instagram)}
            style={styles.socialBtn}
            accessibilityLabel="Open Instagram profile"
          />
        ) : null}
        {profile?.social?.youtube ? (
          <SocialButton
            icon="youtube"
            color="#FF0000"
            size={48}
            onPress={() => openSocialLink(profile.social.youtube)}
            style={styles.socialBtn}
            accessibilityLabel="Open YouTube channel"
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  socialBtn: {
    margin: spacing.xs,
  },
});
