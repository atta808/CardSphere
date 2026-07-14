import { templateRegistry } from '../templates/templateRegistry';

export const appearanceService = {
  /**
   * Retrieves the template configuration for a given template ID.
   * If the template is not found, it falls back to the default 'minimal' template.
   *
   * @param {string} templateId - The ID of the template to retrieve.
   * @returns {Object} The template configuration object.
   */
  getTemplateConfig: (templateId) => {
    return templateRegistry[templateId] || templateRegistry['minimal'];
  },
};
