import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useTheme } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { ROUTES } from '../navigation/routes';

export const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={{ color: colors.textPrimary }}>Settings Content</Text>
        <View style={styles.spacer} />
        <Button
          title="About"
          onPress={() => navigation.navigate(ROUTES.ABOUT)}
          color={colors.primary}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  spacer: { height: 16 },
});
