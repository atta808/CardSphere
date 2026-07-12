import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, typography, spacing, radius, shadows } from '../../theme';
import { PremiumButton } from './PremiumButton';

export const PremiumModal = ({
  visible,
  onClose,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
}) => {
  const { colors } = useTheme();

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContainer,
                { backgroundColor: colors.surface, borderRadius: radius.large, ...shadows.large },
              ]}
            >
              <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary, ...typography.title }]}>
                  {title}
                </Text>
                {onClose ? (
                  <TouchableOpacity onPress={onClose} style={styles.closeButton} accessibilityLabel="Close modal">
                    <MaterialIcons name="close" size={24} color={colors.textSecondary} />
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={styles.body}>
                {description ? (
                  <Text style={[styles.description, { color: colors.textSecondary, ...typography.body }]}>
                    {description}
                  </Text>
                ) : null}
                {children}
              </View>

              {(primaryAction || secondaryAction) ? (
                <View style={styles.footer}>
                  {secondaryAction ? (
                    <PremiumButton
                      title={secondaryAction.label}
                      onPress={secondaryAction.onPress}
                      variant="ghost"
                      style={styles.actionButton}
                    />
                  ) : null}
                  {primaryAction ? (
                    <PremiumButton
                      title={primaryAction.label}
                      onPress={primaryAction.onPress}
                      variant="primary"
                      style={styles.actionButton}
                    />
                  ) : null}
                </View>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: spacing.xs,
  },
  body: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  description: {
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  actionButton: {
    marginLeft: spacing.sm,
  },
});
