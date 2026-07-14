import React, { useMemo, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { useTheme, radius, shadows, animations } from '../../theme';
import { ProfileHeader } from './ProfileHeader';
import { CompanySection } from './CompanySection';
import { ContactButtons } from './ContactButtons';
import { SocialLinks } from './SocialLinks';
import { ActionButtons } from './ActionButtons';
import { appearanceService } from '../../services/appearanceService';

export const BusinessCardFront = React.memo(({ profile }) => {
  const { colors } = useTheme();

  const templateConfig = useMemo(() => {
    const templateId = profile?.appearance?.template || 'minimal';
    return appearanceService.getTemplateConfig(templateId);
  }, [profile?.appearance?.template]);

  const accentColor = profile?.appearance?.accentColor || colors.primary;

  // Use the profile's explicit radius and elevation if they exist, otherwise fallback to template defaults
  const radiusKey = profile?.appearance?.cardRadius || templateConfig.appearance.cardRadius || 'medium';
  const cardRadius = radius[radiusKey] || radius.medium;

  // Elevation mapping
  const elevationMapping = {
    none: shadows.none,
    low: shadows.small,
    medium: shadows.medium,
    high: shadows.large,
  };

  const elevationKey = profile?.appearance?.cardElevation || templateConfig.appearance.cardElevation || 'medium';
  const cardShadow = templateConfig.appearance.showCardShadow
    ? (elevationMapping[elevationKey] || shadows.medium)
    : shadows.none;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  // Trigger animation when template changes
  useEffect(() => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.95);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animations.fade,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, [templateConfig.id, fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: cardRadius,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          ...cardShadow
        }
      ]}
    >
      {/* Top Accent Strip */}
      {templateConfig.appearance.showAccentStrip && templateConfig.appearance.accentStripPosition === 'top' && (
        <View style={[styles.accentStrip, { backgroundColor: accentColor }]} />
      )}

      {/* Left Accent Strip */}
      {templateConfig.appearance.showAccentStrip && templateConfig.appearance.accentStripPosition === 'left' && (
        <View style={[styles.accentStripLeft, { backgroundColor: accentColor }]} />
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ProfileHeader profile={profile} templateConfig={templateConfig} accentColor={accentColor} />
        <CompanySection profile={profile} templateConfig={templateConfig} accentColor={accentColor} />

        {/* Subtle Divider */}
        {templateConfig.appearance.showSectionDividers && (
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        )}

        <ContactButtons profile={profile} templateConfig={templateConfig} accentColor={accentColor} />
        <SocialLinks profile={profile} templateConfig={templateConfig} accentColor={accentColor} />
        <ActionButtons templateConfig={templateConfig} accentColor={accentColor} />
      </ScrollView>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  accentStrip: {
    height: 6,
    width: '100%',
  },
  accentStripLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  divider: {
    height: 1,
    marginHorizontal: 24,
    marginVertical: 16,
  },
});
