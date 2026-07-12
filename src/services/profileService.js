import { profileRepository } from '../repositories/profileRepository';

const REQUIRED_FIELDS = [
  'fullName',
  'jobTitle',
  'company',
  'bio',
  'mobile',
  'email',
  'website',
  'address',
  'facebook',
  'linkedin',
  'instagram',
  'x',
  'youtube',
];

export const profileService = {
  /**
   * Generates a clean default profile
   * @returns {Object} A complete default profile object
   */
  generateDefaultProfile: () => {
    const now = new Date().toISOString();
    return {
      personal: {
        fullName: 'Your Name',
        jobTitle: 'Your Profession',
        company: 'Your Company',
        bio: 'Tell people about yourself.',
      },
      contact: {
        mobile: '',
        email: '',
        website: '',
        address: '',
      },
      social: {
        facebook: '',
        linkedin: '',
        instagram: '',
        x: '',
        youtube: '',
      },
      appearance: {
        theme: 'system',
        template: 'minimal',
        accentColor: '#0A84FF',
      },
      meta: {
        createdDate: now,
        updatedDate: now,
        profileVersion: 1,
      },
    };
  },

  /**
   * Calculates the completion percentage of a profile
   * @param {Object} profile - The profile object
   * @returns {number} Completion percentage (0-100)
   */
  calculateCompletionPercentage: (profile) => {
    if (!profile) return 0;

    let completedFields = 0;

    // Check personal fields
    if (profile.personal?.fullName?.trim()) completedFields++;
    if (profile.personal?.jobTitle?.trim()) completedFields++;
    if (profile.personal?.company?.trim()) completedFields++;
    if (profile.personal?.bio?.trim()) completedFields++;

    // Check contact fields
    if (profile.contact?.mobile?.trim()) completedFields++;
    if (profile.contact?.email?.trim()) completedFields++;
    if (profile.contact?.website?.trim()) completedFields++;
    if (profile.contact?.address?.trim()) completedFields++;

    // Check social fields
    if (profile.social?.facebook?.trim()) completedFields++;
    if (profile.social?.linkedin?.trim()) completedFields++;
    if (profile.social?.instagram?.trim()) completedFields++;
    if (profile.social?.x?.trim()) completedFields++;
    if (profile.social?.youtube?.trim()) completedFields++;

    return Math.round((completedFields / REQUIRED_FIELDS.length) * 100);
  },

  /**
   * Trims whitespace from all string values in the profile object
   * @param {Object} profile
   * @returns {Object} Cleaned profile
   */
  trimProfileData: (profile) => {
    const cleanProfile = JSON.parse(JSON.stringify(profile)); // Deep copy

    const trimObjectStrings = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'string') {
          obj[key] = obj[key].trim();
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          trimObjectStrings(obj[key]);
        }
      });
    };

    trimObjectStrings(cleanProfile);
    return cleanProfile;
  },

  /**
   * Loads the profile, returning a default one if none exists or if data is corrupted
   * @returns {Promise<Object>}
   */
  getProfile: async () => {
    try {
      const profile = await profileRepository.getProfile();
      if (!profile || !profile.personal || !profile.contact || !profile.social || !profile.appearance || !profile.meta) {
        return profileService.generateDefaultProfile();
      }
      return profile;
    } catch {
      return profileService.generateDefaultProfile();
    }
  },

  /**
   * Validates and saves the profile
   * @param {Object} profile
   * @returns {Promise<boolean>}
   */
  saveProfile: async (profile) => {
    const trimmedProfile = profileService.trimProfileData(profile);
    trimmedProfile.meta.updatedDate = new Date().toISOString();
    return await profileRepository.saveProfile(trimmedProfile);
  },

  /**
   * Resets the profile to defaults and saves it
   * @returns {Promise<Object>} The new default profile
   */
  resetProfile: async () => {
    const defaultProfile = profileService.generateDefaultProfile();
    await profileRepository.saveProfile(defaultProfile);
    return defaultProfile;
  },

  // Basic validation helpers
  validators: {
    isValidEmail: (email) => {
      if (!email || email.trim() === '') return true; // Optional field
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    },
    isValidWebsite: (url) => {
      if (!url || url.trim() === '') return true; // Optional field
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      return urlRegex.test(url.trim());
    },
    isValidPhone: (phone) => {
      if (!phone || phone.trim() === '') return true; // Optional field
      const phoneRegex = /^[\d\s+\-()]+$/;
      return phoneRegex.test(phone.trim());
    }
  }
};
