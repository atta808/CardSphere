import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';

export const HomeScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader title="Home" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={{ color: colors.textPrimary }}>Home Content</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
});
