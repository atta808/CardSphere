import * as Print from 'expo-print';

export const printService = {
  /**
   * Prints the given PDF file using the native print dialog.
   * @param {string} fileUri - The local URI of the PDF file to print
   * @returns {Promise<{success: boolean, message: string}>}
   */
  printPDF: async (fileUri) => {
    try {
      if (!fileUri) {
        return { success: false, message: 'Invalid PDF file URI.' };
      }

      await Print.printAsync({
        uri: fileUri,
      });

      return { success: true, message: 'Printed successfully.' };
    } catch (error) {
      return { success: false, message: `Failed to print: ${error.message}` };
    }
  }
};
