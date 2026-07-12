import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { useTheme } from '../theme';
import { ROUTES } from '../navigation/routes';

export const OnboardingScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Welcome to CardSphere</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Let's get started</Text>
        <View style={styles.spacer} />
        <Button
          title="Get Started"
          onPress={() => navigation.replace(ROUTES.MAIN_TABS)}
          color={colors.primary}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16 },
  spacer: { height: 24 },
});
