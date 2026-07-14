import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme, spacing, radius } from '../../theme';

export const SkeletonLoader = ({ type = 'text', style, width, height }) => {
  const { colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  const getStyles = () => {
    switch (type) {
      case 'avatar':
        return {
          width: width || 48,
          height: height || 48,
          borderRadius: radius.circle,
        };
      case 'card':
        return {
          width: width || '100%',
          height: height || 200,
          borderRadius: radius.large,
        };
      case 'list':
        return {
          width: width || '100%',
          height: height || 80,
          borderRadius: radius.medium,
        };
      case 'text':
      default:
        return {
          width: width || '100%',
          height: height || 16,
          borderRadius: radius.small,
          marginBottom: spacing.xs,
        };
    }
  };

  return (
    <Animated.View
      style={[
        getStyles(),
        { backgroundColor: colors.border, opacity },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading content"
    />
  );
};
