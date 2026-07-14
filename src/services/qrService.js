export const qrService = {
  /**
   * Generates a vCard 3.0 string from a profile object.
   * @param {Object} profile - The user's profile data
   * @returns {string} - vCard 3.0 formatted string
   */
  generateVCard: (profile) => {
    if (!profile) return '';

    const { personal, contact, social } = profile;

    let vCard = 'BEGIN:VCARD\n';
    vCard += 'VERSION:3.0\n';

    // Personal Info
    if (personal?.fullName) {
      // N: Surname;Given Name;Middle Name;Prefix;Suffix
      // For simplicity, we just put the whole name in the display name (FN)
      // and as the first part of N.
      vCard += `N:${personal.fullName};;;;\n`;
      vCard += `FN:${personal.fullName}\n`;
    }

    if (personal?.jobTitle) {
      vCard += `TITLE:${personal.jobTitle}\n`;
    }

    if (personal?.company) {
      vCard += `ORG:${personal.company}\n`;
    }

    // Contact Info
    if (contact?.mobile) {
      vCard += `TEL;TYPE=CELL:${contact.mobile}\n`;
    }

    if (contact?.email) {
      vCard += `EMAIL;TYPE=WORK,INTERNET:${contact.email}\n`;
    }

    if (contact?.website) {
      vCard += `URL:${contact.website}\n`;
    }

    if (contact?.address) {
      // ADR: PO Box;Extended Address;Street;Locality;Region;Postal Code;Country
      // Since we only have a single address string, we'll put it in the "Street" field or as a single unformatted label
      vCard += `ADR;TYPE=WORK:;;${contact.address};;;;\n`;
    }

    // Social Links (Using URL fields as vCard 3.0 doesn't have dedicated fields for all socials,
    // or using X-SOCIALPROFILE for broader compatibility where applicable, but standard URL is safest)
    if (social?.linkedin) {
      vCard += `URL;type=pref:${social.linkedin}\n`;
    }
    if (social?.x) {
      vCard += `URL:${social.x}\n`;
    }
    if (social?.facebook) {
      vCard += `URL:${social.facebook}\n`;
    }
    if (social?.instagram) {
      vCard += `URL:${social.instagram}\n`;
    }
    if (social?.youtube) {
      vCard += `URL:${social.youtube}\n`;
    }

    vCard += 'END:VCARD';

    return vCard;
  }
};
