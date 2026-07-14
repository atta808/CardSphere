import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { PremiumInput } from '../components/common/PremiumInput';
import { PremiumButton } from '../components/common/PremiumButton';
import { PremiumCard } from '../components/common/PremiumCard';
import { useProfile } from '../hooks/useProfile';
import { profileService } from '../services/profileService';

export const EditCardScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile, saveProfile, resetProfile, loading } = useProfile();

  const [formData, setFormData] = useState({
    personal: { fullName: '', jobTitle: '', company: '', bio: '' },
    contact: { mobile: '', email: '', website: '', address: '' },
    social: { facebook: '', linkedin: '', instagram: '', x: '', youtube: '' },
    appearance: { theme: 'system', template: 'minimal', accentColor: '#0A84FF' },
    meta: { createdDate: '', updatedDate: '', profileVersion: 1 }
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(JSON.parse(JSON.stringify(profile)));
    }
  }, [profile]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!profileService.validators.isValidEmail(formData.contact.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!profileService.validators.isValidWebsite(formData.contact.website)) {
      newErrors.website = 'Please enter a valid URL';
    }
    if (!profileService.validators.isValidPhone(formData.contact.mobile)) {
      newErrors.mobile = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);
    const success = await saveProfile(formData);
    setIsSaving(false);

    if (success) {
      navigation.goBack();
    }
  };

  const handleReset = () => {
    Alert.alert(
      "Reset Profile",
      "Are you sure you want to reset your profile to default values? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            setIsSaving(true);
            await resetProfile();
            setIsSaving(false);
          }
        }
      ]
    );
  };

  const hasErrors = Object.keys(errors).length > 0;

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
            value={formData.personal.fullName}
            onChangeText={(text) => handleChange('personal', 'fullName', text)}
            leftIcon={<MaterialCommunityIcons name="account" size={20} color={colors.textSecondary} />}
          />
          <PremiumInput
            label="Profession / Title"
            placeholder="e.g. Senior Software Engineer"
            value={formData.personal.jobTitle}
            onChangeText={(text) => handleChange('personal', 'jobTitle', text)}
            leftIcon={<MaterialCommunityIcons name="briefcase" size={20} color={colors.textSecondary} />}
          />
          <PremiumInput
            label="Bio"
            placeholder="Tell people about yourself"
            value={formData.personal.bio}
            onChangeText={(text) => handleChange('personal', 'bio', text)}
            leftIcon={<MaterialCommunityIcons name="text" size={20} color={colors.textSecondary} />}
            multiline
            style={{ minHeight: 80, alignItems: 'flex-start' }}
            inputStyle={{ marginTop: spacing.sm }}
          />
        </PremiumCard>

        {/* Company Information */}
        <PremiumCard variant="elevated" style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Company Information</Text>
          <PremiumInput
            label="Company Name"
            placeholder="e.g. TechNaam Solutions"
            value={formData.personal.company}
            onChangeText={(text) => handleChange('personal', 'company', text)}
            leftIcon={<MaterialCommunityIcons name="domain" size={20} color={colors.textSecondary} />}
          />
        </PremiumCard>

        {/* Contact Information */}
        <PremiumCard variant="elevated" style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Contact Information</Text>
          <PremiumInput
            label="Email Address"
            placeholder="e.g. alex@example.com"
            value={formData.contact.email}
            onChangeText={(text) => handleChange('contact', 'email', text)}
            errorText={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<MaterialCommunityIcons name="email" size={20} color={colors.textSecondary} />}
          />
          <PremiumInput
            label="Phone Number"
            placeholder="e.g. +1 234 567 8900"
            value={formData.contact.mobile}
            onChangeText={(text) => handleChange('contact', 'mobile', text)}
            errorText={errors.mobile}
            keyboardType="phone-pad"
            leftIcon={<MaterialCommunityIcons name="phone" size={20} color={colors.textSecondary} />}
          />
          <PremiumInput
            label="Website"
            placeholder="e.g. https://www.example.com"
            value={formData.contact.website}
            onChangeText={(text) => handleChange('contact', 'website', text)}
            errorText={errors.website}
            keyboardType="url"
            autoCapitalize="none"
            leftIcon={<MaterialCommunityIcons name="web" size={20} color={colors.textSecondary} />}
          />
          <PremiumInput
            label="Address"
            placeholder="e.g. 123 Tech Lane, City"
            value={formData.contact.address}
            onChangeText={(text) => handleChange('contact', 'address', text)}
            leftIcon={<MaterialCommunityIcons name="map-marker" size={20} color={colors.textSecondary} />}
          />
        </PremiumCard>

        {/* Social Links */}
        <PremiumCard variant="elevated" style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Social Links</Text>
          <PremiumInput
            label="LinkedIn"
            placeholder="linkedin.com/in/username"
            value={formData.social.linkedin}
            onChangeText={(text) => handleChange('social', 'linkedin', text)}
            autoCapitalize="none"
            leftIcon={<MaterialCommunityIcons name="linkedin" size={20} color="#0077b5" />}
          />
          <PremiumInput
            label="X (Twitter)"
            placeholder="x.com/username"
            value={formData.social.x}
            onChangeText={(text) => handleChange('social', 'x', text)}
            autoCapitalize="none"
            leftIcon={<MaterialCommunityIcons name="twitter" size={20} color="#1DA1F2" />}
          />
          <PremiumInput
            label="Facebook"
            placeholder="facebook.com/username"
            value={formData.social.facebook}
            onChangeText={(text) => handleChange('social', 'facebook', text)}
            autoCapitalize="none"
            leftIcon={<MaterialCommunityIcons name="facebook" size={20} color="#1877F2" />}
          />
          <PremiumInput
            label="Instagram"
            placeholder="instagram.com/username"
            value={formData.social.instagram}
            onChangeText={(text) => handleChange('social', 'instagram', text)}
            autoCapitalize="none"
            leftIcon={<MaterialCommunityIcons name="instagram" size={20} color="#E1306C" />}
          />
          <PremiumInput
            label="YouTube"
            placeholder="youtube.com/c/username"
            value={formData.social.youtube}
            onChangeText={(text) => handleChange('social', 'youtube', text)}
            autoCapitalize="none"
            leftIcon={<MaterialCommunityIcons name="youtube" size={20} color="#FF0000" />}
          />
        </PremiumCard>

        <View style={styles.saveContainer}>
          <PremiumButton
            title={isSaving ? "Saving..." : "Save Changes"}
            variant="primary"
            onPress={handleSave}
            disabled={hasErrors || isSaving || loading}
            fullWidth
            leftIcon={<MaterialCommunityIcons name="check" size={20} color={hasErrors || isSaving ? colors.textSecondary : "#FFFFFF"} />}
          />
          <PremiumButton
            title="Reset Profile"
            variant="ghost"
            onPress={handleReset}
            disabled={isSaving || loading}
            fullWidth
            style={{ marginTop: spacing.md }}
            textStyle={{ color: colors.error }}
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
    height: spacing['3xl'],
  },
});
