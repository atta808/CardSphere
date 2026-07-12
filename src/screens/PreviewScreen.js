import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumButton } from '../components/common/PremiumButton';
import { BusinessCard } from '../components/card/BusinessCard';
import { useProfile } from '../hooks/useProfile';

export const PreviewScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile } = useProfile();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="Card Preview"
        onBack={() => navigation.goBack()}
        rightIcon="share-variant"
        onRightPress={() => {}}
      />

      <View style={[styles.previewBackground, { backgroundColor: colors.surface }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <BusinessCard profile={profile} />
        </ScrollView>
      </View>

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <PremiumButton
          title="Share Link"
          variant="outline"
          leftIcon={<MaterialCommunityIcons name="link" size={20} color={colors.primary} />}
          style={styles.actionBtn}
        />
        <PremiumButton
          title="Show QR"
          variant="primary"
          leftIcon={<MaterialCommunityIcons name="qrcode" size={20} color="#FFFFFF" />}
          style={styles.actionBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  previewBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    paddingBottom: spacing['2xl'],
    borderTopWidth: 1,
    gap: spacing.md,
  },
  actionBtn: {
    flex: 1,
  },
});
