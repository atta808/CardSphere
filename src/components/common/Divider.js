import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

export const Divider = ({ style }) => {
  const { colors } = useTheme();
  return <View style={[styles.divider, { backgroundColor: colors.divider }, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
});
