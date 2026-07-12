import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { ROUTES } from './routes';

import { HomeScreen } from '../screens/HomeScreen';
import { MyCardScreen } from '../screens/MyCardScreen';
import { TemplatesScreen } from '../screens/TemplatesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Home Tab',
        }}
      />
      <Tab.Screen
        name={ROUTES.MY_CARD}
        component={MyCardScreen}
        options={{
          tabBarLabel: 'My Card',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="card-account-details" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'My Card Tab',
        }}
      />
      <Tab.Screen
        name={ROUTES.TEMPLATES}
        component={TemplatesScreen}
        options={{
          tabBarLabel: 'Templates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-grid" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Templates Tab',
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Settings Tab',
        }}
      />
    </Tab.Navigator>
  );
};
