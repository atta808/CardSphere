import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

export const PremiumSwitch = ({
  value,
  onValueChange,
  disabled = false,
  style,
  accessibilityLabel,
}) => {
  const { colors } = useTheme();
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 20 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, translateX]);

  const toggleSwitch = () => {
    if (!disabled && onValueChange) {
      onValueChange(!value);
    }
  };

  const backgroundColor = value ? colors.primary : colors.border;
  const thumbColor = '#FFFFFF';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleSwitch}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.container,
        { backgroundColor, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: thumbColor,
            transform: [{ translateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
