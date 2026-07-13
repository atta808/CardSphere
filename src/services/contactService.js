export const contactService = {
  /**
   * Generates a standards-compliant vCard 3.0 string from a profile object.
   * @param {Object} profile - The user profile object
   * @returns {string} The vCard string
   */
  generateVCard: (profile) => {
    if (!profile) return '';

    const personal = profile.personal || {};
    const contact = profile.contact || {};
    const social = profile.social || {};

    const fullName = personal.fullName || 'User';
    // Basic split for N (LastName;FirstName;MiddleName;Prefix;Suffix)
    const nameParts = fullName.split(' ');
    let lastName = '';
    let firstName = '';
    if (nameParts.length > 1) {
        lastName = nameParts.pop() || '';
        firstName = nameParts.join(' ') || '';
    } else {
        firstName = fullName;
    }

    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${fullName}`,
      `N:${lastName};${firstName};;;`,
    ];

    if (personal.company) {
      lines.push(`ORG:${personal.company}`);
    }

    if (personal.jobTitle) {
      lines.push(`TITLE:${personal.jobTitle}`);
    }

    if (contact.mobile) {
      lines.push(`TEL;TYPE=CELL,VOICE:${contact.mobile}`);
    }

    if (contact.email) {
      lines.push(`EMAIL;TYPE=WORK,INTERNET:${contact.email}`);
    }

    if (contact.website) {
      let url = contact.website;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      lines.push(`URL:${url}`);
    }

    if (contact.address) {
      const escapedAddress = contact.address.replace(/\n/g, '\\n').replace(/,/g, '\\,');
      lines.push(`ADR;TYPE=WORK:;;${escapedAddress};;;;`);
    }

    if (social.linkedin) lines.push(`URL;type=LinkedIn:${social.linkedin}`);
    if (social.x) lines.push(`URL;type=X:${social.x}`);
    if (social.facebook) lines.push(`URL;type=Facebook:${social.facebook}`);
    if (social.instagram) lines.push(`URL;type=Instagram:${social.instagram}`);
    if (social.youtube) lines.push(`URL;type=YouTube:${social.youtube}`);

    if (personal.bio) {
        const escapedBio = personal.bio.replace(/\n/g, '\\n');
        lines.push(`NOTE:${escapedBio}`);
    }

    lines.push('END:VCARD');

    return lines.join('\r\n');
  }
};
