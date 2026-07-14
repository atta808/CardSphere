import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../theme';
import { SocialButton } from '../common/SocialButton';

export const SocialLinks = ({ profile, templateConfig }) => {


  const hasSocial = profile?.social?.linkedin || profile?.social?.x || profile?.social?.facebook || profile?.social?.instagram || profile?.social?.youtube;

  if (!hasSocial) {
    return null;
  }

  const { layout } = templateConfig || {};

  return (
    <View style={[styles.container, { paddingVertical: spacing[layout?.sectionSpacing] || spacing.md }]}>
      <View style={styles.socialGrid}>
        {profile?.social?.linkedin ? <SocialButton icon="linkedin" color="#0077b5" size={48} onPress={() => {}} style={styles.socialBtn} /> : null}
        {profile?.social?.x ? <SocialButton icon="twitter" color="#1DA1F2" size={48} onPress={() => {}} style={styles.socialBtn} /> : null}
        {profile?.social?.facebook ? <SocialButton icon="facebook" color="#1877F2" size={48} onPress={() => {}} style={styles.socialBtn} /> : null}
        {profile?.social?.instagram ? <SocialButton icon="instagram" color="#E1306C" size={48} onPress={() => {}} style={styles.socialBtn} /> : null}
        {profile?.social?.youtube ? <SocialButton icon="youtube" color="#FF0000" size={48} onPress={() => {}} style={styles.socialBtn} /> : null}
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
