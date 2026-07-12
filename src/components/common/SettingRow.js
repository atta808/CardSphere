import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius } from '../../theme';

export const SettingRow = ({
  icon,
  title,
  subtitle,
  rightElement,
  onPress,
  style,
  isDestructive = false,
}) => {
  const { colors } = useTheme();

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[
        styles.container,
        { borderBottomColor: colors.border },
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole={onPress ? 'button' : 'none'}
      accessibilityLabel={title}
    >
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={isDestructive ? colors.error : colors.primary}
          />
        </View>
      )}
      <View style={styles.content}>
        <Text style={[
          styles.title,
          { color: isDestructive ? colors.error : colors.textPrimary }
        ]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      <View style={styles.rightElement}>
        {rightElement ? (
          rightElement
        ) : onPress ? (
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
        ) : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.body,
    fontWeight: '500',
  },
  subtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  rightElement: {
    marginLeft: spacing.md,
  },
});
