export const CreativeTemplate = {
  id: 'creative',
  name: 'Creative',
  description: 'Bold accents, larger avatar, and a modern card composition.',
  layoutType: 'standard',

  layout: {
    headerAlignment: 'center',
    avatarSize: 120,
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
    solidHeader: true,
  },

  typography: {
    nameVariant: 'h1',
    jobVariant: 'subtitle',
    bodyVariant: 'body',
  }
};
