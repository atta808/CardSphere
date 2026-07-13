import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

export const shareService = {
  /**
   * Saves an image URI to the device's photo gallery.
   * Requests permissions if necessary.
   * @param {string} uri - The local URI of the image (e.g. from view-shot)
   * @returns {Promise<{success: boolean, message: string}>}
   */
  saveToGallery: async (uri) => {
    try {
      if (!uri) {
        return { success: false, message: 'Invalid image URI.' };
      }

      if (Platform.OS === 'web') {
         return { success: false, message: 'Saving to gallery is not supported on web.' };
      }

      // Dynamically import MediaLibrary to avoid native module crash on web where it's missing entirely sometimes
      const MediaLibrary = require('expo-media-library');

      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== 'granted') {
        return {
          success: false,
          message: 'Permission to access media library is required to save the QR code.'
        };
      }

      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(uri);

      if (asset) {
        return { success: true, message: 'QR Code saved to gallery successfully!' };
      } else {
        return { success: false, message: 'Failed to save QR Code to gallery.' };
      }

    } catch (error) {
      return { success: false, message: 'An unexpected error occurred while saving.' };
    }
  },

  /**
   * Shares a file via the native sharing dialog.
   * @param {string} uri - The local URI of the file to share
   * @param {Object} options - Optional sharing options (e.g. mimeType, dialogTitle)
   * @returns {Promise<{success: boolean, message: string}>}
   */
  shareFile: async (uri, options = {}) => {
    try {
      if (!uri) {
        return { success: false, message: 'Invalid file URI.' };
      }

      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        return { success: false, message: 'Sharing is not available on this device.' };
      }

      await Sharing.shareAsync(uri, {
        dialogTitle: 'Share QR Code',
        mimeType: 'image/png',
        UTI: 'public.png',
        ...options,
      });

      return { success: true, message: 'Shared successfully.' };
    } catch (error) {
      return { success: false, message: 'An unexpected error occurred while sharing.' };
    } finally {
      try {
        await FileSystem.deleteAsync(uri, { idempotent: true });
      } catch (e) {
        // Fallback catch if delete fails
      }
    }
  }
};
