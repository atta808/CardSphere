import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, radius } from '../../theme';
import { ProfileHeader } from './ProfileHeader';
import { CompanySection } from './CompanySection';
import { ContactButtons } from './ContactButtons';
import { SocialLinks } from './SocialLinks';
import { ActionButtons } from './ActionButtons';

export const BusinessCardFront = ({ profile }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Top Accent Strip */}
      <View style={[styles.accentStrip, { backgroundColor: colors.primary }]} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ProfileHeader profile={profile} />
        <CompanySection profile={profile} />

        {/* Subtle Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <ContactButtons profile={profile} />
        <SocialLinks profile={profile} />
        <ActionButtons />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: radius.xlarge,
    overflow: 'hidden',
    // Soft elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  accentStrip: {
    height: 6,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  divider: {
    height: 1,
    marginHorizontal: 24,
    marginVertical: 8,
  },
});
