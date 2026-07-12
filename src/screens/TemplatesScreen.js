import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';

const TEMPLATES = [
  { id: 'minimal', name: 'Minimal', icon: 'card-outline', color: '#607D8B' },
  { id: 'modern', name: 'Modern', icon: 'card-bulleted-outline', color: '#2196F3' },
  { id: 'luxury', name: 'Luxury', icon: 'crown-outline', color: '#9C27B0' },
  { id: 'corporate', name: 'Corporate', icon: 'domain', color: '#1976D2' },
  { id: 'creative', name: 'Creative', icon: 'palette-outline', color: '#FF5722' },
  { id: 'elegant', name: 'Elegant', icon: 'diamond-stone', color: '#009688' },
];

export const TemplatesScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="Card Templates"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Choose a Design</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Select a template that best represents your professional identity.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {TEMPLATES.map((template, index) => {
            const isSelected = index === 1; // Modern selected as example
            return (
              <TouchableOpacity
                key={template.id}
                activeOpacity={0.8}
                style={[
                  styles.cardWrapper,
                  { borderColor: isSelected ? colors.primary : 'transparent' }
                ]}
              >
                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[styles.iconContainer, { backgroundColor: `${template.color}15` }]}>
                    <MaterialCommunityIcons name={template.icon} size={32} color={template.color} />
                  </View>
                  <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{template.name}</Text>

                  {isSelected && (
                    <View style={[styles.badge, { backgroundColor: colors.primary }]}>
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
  header: {
    padding: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
  },
  content: {
    padding: spacing.md
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    height: spacing.3xl,
  },
});
