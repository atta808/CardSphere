import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme, typography, radius } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const BusinessCardBack = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <MaterialCommunityIcons name="card-account-details-outline" size={64} color={colors.textSecondary} />
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        Business Card Back
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: radius.xlarge,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  text: {
    ...typography.title,
    marginTop: 16,
  },
});
