export const LuxuryTemplate = {
  id: 'luxury',
  name: 'Luxury',
  description: 'Elegant typography with premium spacing and sophisticated accent treatment.',
  layoutType: 'standard',

  layout: {
    headerAlignment: 'center',
    avatarSize: 96,
    contentSpacing: 'xl',
    sectionSpacing: 'lg',
  },

  appearance: {
    showAccentStrip: true,
    accentStripPosition: 'top',
    showAvatarBorder: true,
    showCardShadow: true,
    showSectionDividers: false,
    cardRadius: 'large',
    cardElevation: 'high',
    solidHeader: false,
  },

  typography: {
    nameVariant: 'h1',
    jobVariant: 'subtitle',
    bodyVariant: 'body',
  }
};
