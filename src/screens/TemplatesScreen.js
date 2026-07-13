import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { useProfile } from '../hooks/useProfile';
import { ACCENT_COLORS } from '../constants/accentColors';
import { templateRegistry } from '../templates';

const TEMPLATE_ICONS = {
  minimal: { icon: 'card-outline', color: '#607D8B' },
  modern: { icon: 'card-bulleted-outline', color: '#2196F3' },
  corporate: { icon: 'domain', color: '#1976D2' },
  luxury: { icon: 'crown-outline', color: '#9C27B0' },
  creative: { icon: 'palette-outline', color: '#FF5722' },
  elegant: { icon: 'diamond-stone', color: '#009688' },
};

export const TemplatesScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile, saveProfile, updateProfile } = useProfile();

  const currentTemplate = profile?.appearance?.template || 'minimal';
  const currentAccent = profile?.appearance?.accentColor || '#0A84FF';

  const handleTemplateSelect = useCallback(async (templateId) => {
    if (templateId === currentTemplate) return;

    // Update local state for instant feedback
    const updatedAppearance = { ...profile?.appearance, template: templateId };
    updateProfile({ appearance: updatedAppearance });

    // Persist via saveProfile using the updated profile structure
    const updatedProfile = { ...profile, appearance: updatedAppearance };
    await saveProfile(updatedProfile);
  }, [profile, currentTemplate, updateProfile, saveProfile]);

  const handleAccentSelect = useCallback(async (accentColor) => {
    if (accentColor === currentAccent) return;

    const updatedAppearance = { ...profile?.appearance, accentColor };
    updateProfile({ appearance: updatedAppearance });

    const updatedProfile = { ...profile, appearance: updatedAppearance };
    await saveProfile(updatedProfile);
  }, [profile, currentAccent, updateProfile, saveProfile]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="Card Appearance"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Accent Colors Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Accent Color</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select a primary color for your card.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorRow}
        >
          {ACCENT_COLORS.map((color) => {
            const isSelected = color.value === currentAccent;
            return (
              <TouchableOpacity
                key={color.id}
                activeOpacity={0.8}
                onPress={() => handleAccentSelect(color.value)}
                style={[
                  styles.colorSwatchContainer,
                  { borderColor: isSelected ? color.value : 'transparent' }
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`Select ${color.name} color`}
              >
                <View style={[styles.colorSwatch, { backgroundColor: color.value }]}>
                  {isSelected && (
                    <MaterialCommunityIcons name="check" size={20} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Templates Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Choose a Design</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select a template that best represents your professional identity.
          </Text>
        </View>

        <View style={styles.grid}>
          {Object.values(templateRegistry).map((template) => {
            const isSelected = template.id === currentTemplate;
            const templateStyle = TEMPLATE_ICONS[template.id] || TEMPLATE_ICONS.minimal;

            return (
              <TouchableOpacity
                key={template.id}
                activeOpacity={0.8}
                onPress={() => handleTemplateSelect(template.id)}
                style={[
                  styles.cardWrapper,
                  { borderColor: isSelected ? currentAccent : 'transparent' }
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`Select ${template.name} template`}
              >
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.iconContainer, { backgroundColor: `${templateStyle.color}15` }]}>
                    <MaterialCommunityIcons name={templateStyle.icon} size={32} color={templateStyle.color} />
                  </View>
                  <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{template.name}</Text>
                  <Text style={[styles.cardDescription, { color: colors.textSecondary }]} numberOfLines={2}>{template.description}</Text>

                  {isSelected && (
                    <View style={[styles.badge, { backgroundColor: currentAccent }]}>
                      <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: spacing.md
  },
  sectionHeader: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
  },
  colorRow: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  colorSwatchContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: spacing.md,
    borderRadius: radius.large + 2,
    borderWidth: 2,
  },
  card: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.large,
    borderWidth: 1,
    height: 160,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: radius.circle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  cardDescription: {
    ...typography.caption,
    textAlign: 'center',
    paddingHorizontal: spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: radius.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSpacer: {
    height: spacing['3xl'],
  },
});
