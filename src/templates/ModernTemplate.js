export const ModernTemplate = {
  id: 'modern',
  name: 'Modern',
  description: 'Contemporary layout with rounded sections and an accent header.',
  layoutType: 'standard',

  layout: {
    headerAlignment: 'center',
    avatarSize: 100,
    contentSpacing: 'lg',
    sectionSpacing: 'md',
  },

  appearance: {
    showAccentStrip: false,
    showAvatarBorder: true,
    showCardShadow: true,
    showSectionDividers: false,
    cardRadius: 'xlarge',
    cardElevation: 'medium',
    solidHeader: true, // Use accent color as header background
  },

  typography: {
    nameVariant: 'h1',
    jobVariant: 'subtitle',
    bodyVariant: 'body',
  }
};
