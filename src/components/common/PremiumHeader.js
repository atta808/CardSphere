import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

export const PremiumHeader = ({
  title,
  subtitle,
  onBack,
  leftAction,
  rightAction,
  showBackButton = false,
}) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]}>
      <View style={[styles.container, { borderBottomColor: colors.border }]}>
        {/* Left Section */}
        <View style={styles.leftContainer}>
          {showBackButton ? (
            <TouchableOpacity onPress={onBack} style={styles.iconButton} accessibilityLabel="Go back">
              <MaterialCommunityIcons name="chevron-left" size={28} color={colors.textPrimary} />
            </TouchableOpacity>
          ) : leftAction ? (
            leftAction
          ) : null}
        </View>

        {/* Center Section */}
        <View style={styles.centerContainer}>
          <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right Section */}
        <View style={styles.rightContainer}>
          {rightAction ? rightAction : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
});
