import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, typography, radius } from '../../theme';

export const PremiumAvatar = ({
  type = 'placeholder', // image, initials, placeholder
  source,
  initials,
  size = 'medium', // small, medium, large, xl
  style,
}) => {
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);

  const getDimensions = () => {
    switch (size) {
      case 'small': return 32;
      case 'large': return 64;
      case 'xl': return 96;
      case 'medium':
      default: return 48;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 24;
      case 'xl': return 36;
      case 'medium':
      default: return 18;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 32;
      case 'xl': return 48;
      case 'medium':
      default: return 24;
    }
  };

  const dim = getDimensions();
  const borderRadius = radius.circle;

  const renderContent = () => {
    if (type === 'image' && source && !imageError) {
      return (
        <Image
          source={source}
          style={{ width: dim, height: dim, borderRadius }}
          onError={() => setImageError(true)}
        />
      );
    }

    if (type === 'initials' && initials) {
      return (
        <Text style={[styles.initials, { color: colors.primary, fontSize: getFontSize(), ...typography.title, fontSize: getFontSize() }]}>
          {initials.substring(0, 2).toUpperCase()}
        </Text>
      );
    }

    // Default to placeholder
    return <MaterialIcons name="person" size={getIconSize()} color={colors.textSecondary} />;
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: dim,
          height: dim,
          borderRadius,
          backgroundColor: type === 'image' && !imageError ? 'transparent' : colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  initials: {
    textAlign: 'center',
  },
});
