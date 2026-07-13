import * as FileSystem from 'expo-file-system';
import { contactService } from './contactService';

export const exportService = {
  /**
   * Captures a React Native component (via its ref) as a high-resolution PNG using ViewShot.
   * @param {Object} ref - The ref of the ViewShot component
   * @returns {Promise<string>} The local URI of the captured image
   */
  captureComponent: async (ref) => {
    if (!ref || !ref.current) {
      throw new Error('Invalid component ref provided for capture.');
    }
    try {
      const uri = await ref.current.capture();
      return uri;
    } catch (error) {
      throw new Error(`Failed to capture component: ${error.message}`);
    }
  },

  /**
   * Saves a string of data to a file in the document directory.
   * @param {string} content - The content to save
   * @param {string} filename - The name of the file (e.g., contact.vcf)
   * @returns {Promise<string>} The local URI of the saved file
   */
  saveStringToFile: async (content, filename) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
      return fileUri;
    } catch (error) {
      throw new Error(`Failed to save file: ${error.message}`);
    }
  },

  /**
   * Generates a vCard file for the given profile and saves it to a temporary file.
   * @param {Object} profile - The user profile
   * @returns {Promise<string>} The local URI of the saved .vcf file
   */
  exportVCard: async (profile) => {
    try {
      const vCardContent = contactService.generateVCard(profile);
      const filename = `contact_${Date.now()}.vcf`;
      const uri = await exportService.saveStringToFile(vCardContent, filename);
      return uri;
    } catch (error) {
      throw new Error(`Failed to export vCard: ${error.message}`);
    }
  },

  /**
   * Cleans up temporary files generated during export.
   * @param {string[]} uris - Array of local URIs to delete
   */
  cleanupFiles: async (uris) => {
    for (const uri of uris) {
      if (uri) {
        try {
          await FileSystem.deleteAsync(uri, { idempotent: true });
        } catch (error) {
          // Silent catch for cleanup failures
        }
      }
    }
  }
};
