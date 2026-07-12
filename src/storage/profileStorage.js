import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './storageKeys';

export const profileStorage = {
  /**
   * Save profile object to local storage
   * @param {Object} profile - Profile object to save
   * @returns {Promise<boolean>} Success status
   */
  saveProfile: async (profile) => {
    try {
      const jsonValue = JSON.stringify(profile);
      await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, jsonValue);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * Load profile object from local storage
   * @returns {Promise<Object|null>} Profile object or null if not found/error
   */
  loadProfile: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      return null;
    }
  },

  /**
   * Remove profile object from local storage
   * @returns {Promise<boolean>} Success status
   */
  clearProfile: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE);
      return true;
    } catch (error) {
      return false;
    }
  }
};
