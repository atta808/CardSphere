import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './routes';

import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { BottomTabs } from './BottomTabs';
import { EditCardScreen } from '../screens/EditCardScreen';
import { PreviewScreen } from '../screens/PreviewScreen';
import { QRCodeScreen } from '../screens/QRCodeScreen';
import { AboutScreen } from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SPLASH}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
      <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={ROUTES.MAIN_TABS} component={BottomTabs} />

      {/* Modal or standard screens */}
      <Stack.Screen name={ROUTES.EDIT_CARD} component={EditCardScreen} />
      <Stack.Screen name={ROUTES.PREVIEW} component={PreviewScreen} />
      <Stack.Screen name={ROUTES.QR_CODE} component={QRCodeScreen} />
      <Stack.Screen name={ROUTES.ABOUT} component={AboutScreen} />
    </Stack.Navigator>
  );
};
