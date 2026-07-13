export const CorporateTemplate = {
  id: 'corporate',
  name: 'Corporate',
  description: 'Executive appearance with conservative spacing and formal styling.',
  layoutType: 'standard',

  layout: {
    headerAlignment: 'row', // Avatar on left, text on right
    avatarSize: 72,
    contentSpacing: 'md',
    sectionSpacing: 'md',
  },

  appearance: {
    showAccentStrip: true,
    accentStripPosition: 'left',
    showAvatarBorder: true,
    showCardShadow: true,
    showSectionDividers: true,
    cardRadius: 'small',
    cardElevation: 'low',
    solidHeader: false,
  },

  typography: {
    nameVariant: 'title',
    jobVariant: 'body',
    bodyVariant: 'body',
  }
};
