import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, radius } from '../../theme';

export const SocialButton = ({
  icon,
  onPress,
  color,
  size = 48,
  style,
}) => {
  const { colors } = useTheme();

  const iconColor = color || colors.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Social link: ${icon}`}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor: `${iconColor}15`,
        },
        style
      ]}
    >
      <MaterialCommunityIcons name={icon} size={size * 0.5} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.circle,
  },
});
