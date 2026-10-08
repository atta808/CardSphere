import React from 'react';
import { View, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { BusinessCardFront } from './BusinessCardFront';

export const BusinessCard = React.forwardRef(({ profile, style, onSaveContact, onShare }, ref) => {
  return (
    <ViewShot
      ref={ref}
      options={{ format: 'png', quality: 1, result: 'tmpfile' }}
      style={[styles.container, style]}
    >
      <BusinessCardFront
        profile={profile}
        onSaveContact={onSaveContact}
        onShare={onShare}
      />
    </ViewShot>
  );
});

BusinessCard.displayName = 'BusinessCard';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
});
