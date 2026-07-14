import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BusinessCardFront } from './BusinessCardFront';

export const BusinessCard = React.memo(({ profile, style }) => {
  // For Phase 6, we only render the front of the card.
  return (
    <View style={[styles.container, style]}>
      <BusinessCardFront profile={profile} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // A standard business card aspect ratio is typically 1.75 : 1, but for digital
    // we often want it taller or flexible. Let's provide a reasonable max width
    // and let the content dictate the height, or we can use an aspect ratio.
    // Following MyCardScreen's previous maxWidth: 400
    maxWidth: 400,
    alignSelf: 'center',
  },
});
