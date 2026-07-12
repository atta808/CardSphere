import { profileStorage } from '../storage/profileStorage';

export const profileRepository = {
  /**
   * Retrieves the current profile
   * @returns {Promise<Object|null>} Profile object or null
   */
  getProfile: async () => {
    return await profileStorage.loadProfile();
  },

  /**
   * Saves a new or updated profile
   * @param {Object} profile - The complete profile object to save
   * @returns {Promise<boolean>} Success status
   */
  saveProfile: async (profile) => {
    // ensure we are dealing with a clean object, avoid reference mutations
    const cleanProfile = JSON.parse(JSON.stringify(profile));
    return await profileStorage.saveProfile(cleanProfile);
  },

  /**
   * Deletes the profile
   * @returns {Promise<boolean>} Success status
   */
  deleteProfile: async () => {
    return await profileStorage.clearProfile();
  }
};
