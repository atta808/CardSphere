import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumInput } from '../components/common/PremiumInput';
import { PremiumButton } from '../components/common/PremiumButton';
import { PremiumCard } from '../components/common/PremiumCard';

export const EditCardScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="Edit Card"
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Profile Information */}
        <PremiumCard variant="elevated" style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Profile Information</Text>

          <View style={styles.avatarSection}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.surface }]}>
              <MaterialCommunityIcons name="account-circle" size={64} color={colors.primary} />
            </View>
            <PremiumButton
              title="Change Photo"
              variant="outline"
              size="small"
              leftIcon={<MaterialCommunityIcons name="camera" size={16} color={colors.primary} />}
            />
          </View>

          <PremiumInput
            label="Full Name"
            placeholder="e.g. Alex Developer"
            leftIcon={<MaterialCommunityIcons name="account" size={20} color={colors.textSecondary} />}
          />
          <PremiumInput
            label="Profession / Title"
            placeholder="e.g. Senior Software Engineer"
            leftIcon={<MaterialCommunityIcons name="briefcase" size={20} color={colors.textSecondary} />}
          />
        </PremiumCard>

        {/* Company Information */}
        <PremiumCard variant="elevated" style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Company Information</Text>
          <PremiumInput
            label="Company Name"
            placeholder="e.g. TechNaam Solutions"
            leftIcon={<MaterialCommunityIcons name="domain" size={20} color={colors.textSecondary} />}
          />
          <PremiumInput
            label="Department"
            placeholder="e.g. Engineering"
            leftIcon={<MaterialCommunityIcons name="sitemap" size={20} color={colors.textSecondary} />}
          />
        </PremiumCard>

        {/* Contact Information */}
        <PremiumCard variant="elevated" style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Contact Information</Text>
          <PremiumInput
            label="Email Address"
            placeholder="e.g. alex@example.com"
            leftIcon={<MaterialCommunityIcons name="email" size={20} color={colors.textSecondary} />}
          />
          <PremiumInput
            label="Phone Number"
            placeholder="e.g. +1 234 567 8900"
            leftIcon={<MaterialCommunityIcons name="phone" size={20} color={colors.textSecondary} />}
          />
          <PremiumInput
            label="Website"
            placeholder="e.g. www.example.com"
            leftIcon={<MaterialCommunityIcons name="web" size={20} color={colors.textSecondary} />}
          />
        </PremiumCard>

        {/* Social Links */}
        <PremiumCard variant="elevated" style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Social Links</Text>
          <PremiumInput
            label="LinkedIn"
            placeholder="linkedin.com/in/username"
            leftIcon={<MaterialCommunityIcons name="linkedin" size={20} color="#0077b5" />}
          />
          <PremiumInput
            label="Twitter"
            placeholder="twitter.com/username"
            leftIcon={<MaterialCommunityIcons name="twitter" size={20} color="#1DA1F2" />}
          />
          <PremiumInput
            label="GitHub"
            placeholder="github.com/username"
            leftIcon={<MaterialCommunityIcons name="github" size={20} color={colors.textPrimary} />}
          />
        </PremiumCard>

        {/* Theme Selection Placeholder */}
        <PremiumCard variant="elevated" style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Card Theme</Text>
          <View style={styles.themeOptions}>
            <View style={[styles.themeCircle, { backgroundColor: colors.primary, borderColor: colors.primary }]} />
            <View style={[styles.themeCircle, { backgroundColor: colors.secondary, borderColor: 'transparent' }]} />
            <View style={[styles.themeCircle, { backgroundColor: colors.success, borderColor: 'transparent' }]} />
            <View style={[styles.themeCircle, { backgroundColor: colors.warning, borderColor: 'transparent' }]} />
            <View style={[styles.themeCircle, { backgroundColor: colors.info, borderColor: 'transparent' }]} />
          </View>
        </PremiumCard>

        <View style={styles.saveContainer}>
          <PremiumButton
            title="Save Changes"
            variant="primary"
            onPress={() => navigation.goBack()}
            fullWidth
            leftIcon={<MaterialCommunityIcons name="check" size={20} color="#FFFFFF" />}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md },
  sectionCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: spacing.md,
  },
  themeCircle: {
    width: 40,
    height: 40,
    borderRadius: radius.circle,
    borderWidth: 2,
  },
  saveContainer: {
    marginTop: spacing.md,
  },
  bottomSpacer: {
    height: spacing.3xl,
  },
});
