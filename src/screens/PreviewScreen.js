import React, { useRef } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../theme';
import { PremiumHeader } from '../components/common/PremiumHeader';
import { ExportPreview } from '../components/export/ExportPreview';
import { ExportActions } from '../components/export/ExportActions';
import { useProfile } from '../hooks/useProfile';

export const PreviewScreen = React.memo(({ navigation }) => {
  const { colors } = useTheme();
  const { profile } = useProfile();

  const businessCardRef = useRef();
  const qrCardRef = useRef();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <PremiumHeader
        title="Export Card"
        onBack={() => navigation.goBack()}
        showBack={true}
      />

      <View style={[styles.previewBackground, { backgroundColor: colors.surface }]}>
        <ExportPreview
          profile={profile}
          businessCardRef={businessCardRef}
          qrCardRef={qrCardRef}
        />
      </View>

      <ExportActions
        profile={profile}
        businessCardRef={businessCardRef}
        qrCardRef={qrCardRef}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  previewBackground: {
    flex: 1,
  },
});
