import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Animated, StyleSheet, TouchableWithoutFeedback, Dimensions, PanResponder } from 'react-native';
import { useTheme, radius, spacing, shadows } from '../../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const PremiumBottomSheet = ({
  visible,
  onClose,
  children,
  height = SCREEN_HEIGHT * 0.5,
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(visible);
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  }, [visible, height, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 0,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > height * 0.3 || gestureState.vy > 0.5) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
    })
  ).current;

  if (!modalVisible) return null;

  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={onClose} accessibilityViewIsModal={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.sheetContainer,
                {
                  height,
                  backgroundColor: colors.surface,
                  borderTopLeftRadius: radius.xlarge,
                  borderTopRightRadius: radius.xlarge,
                  transform: [{ translateY }],
                  ...shadows.large,
                },
              ]}
            >
              <View style={styles.handleContainer}>
                <View style={[styles.handle, { backgroundColor: colors.border }]} />
              </View>
              <View style={styles.content}>
                {children}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    width: '100%',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
});
