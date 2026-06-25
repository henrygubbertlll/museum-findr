import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '../../src/components/TabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="saved" />
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
