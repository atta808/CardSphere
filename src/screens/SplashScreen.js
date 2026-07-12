import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { useTheme } from '../theme';
import { ROUTES } from '../navigation/routes';

export const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>CardSphere</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Loading...</Text>
        <View style={styles.spacer} />
        <Button
          title="Go to Onboarding"
          onPress={() => navigation.navigate(ROUTES.ONBOARDING)}
          color={colors.primary}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16 },
  spacer: { height: 24 },
});
