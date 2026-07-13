export const MinimalTemplate = {
  id: 'minimal',
  name: 'Minimal',
  description: 'Clean whitespace with a thin accent line and professional typography.',
  layoutType: 'standard',

  layout: {
    headerAlignment: 'left',
    avatarSize: 80,
    contentSpacing: 'md',
    sectionSpacing: 'sm',
  },

  appearance: {
    showAccentStrip: true,
    accentStripPosition: 'top', // 'top' | 'left'
    showAvatarBorder: false,
    showCardShadow: false,
    showSectionDividers: true,
    cardRadius: 'large',
    cardElevation: 'none',
  },

  typography: {
    nameVariant: 'title',
    jobVariant: 'body',
    bodyVariant: 'caption',
  }
};
