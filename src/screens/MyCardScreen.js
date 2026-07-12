import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useTheme } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { ROUTES } from '../navigation/routes';

export const MyCardScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader title="My Card" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={{ color: colors.textPrimary }}>My Card Content</Text>
        <View style={styles.spacer} />
        <Button
          title="Edit Card"
          onPress={() => navigation.navigate(ROUTES.EDIT_CARD)}
          color={colors.primary}
        />
        <View style={styles.spacer} />
        <Button
          title="Show QR Code"
          onPress={() => navigation.navigate(ROUTES.QR_CODE)}
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
