import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  Compass,
  MapTrifold,
  BookmarkSimple,
  Users,
  UserCircle,
} from 'phosphor-react-native';
import { Colors, Fonts, TAB_BAR_HEIGHT } from '../theme';

const TABS = [
  { key: 'index',   label: 'Discover', Icon: Compass },
  { key: 'map',     label: 'Map',      Icon: MapTrifold },
  { key: 'saved',   label: 'Saved',    Icon: BookmarkSimple },
  { key: 'feed',    label: 'Friends',  Icon: Users },
  { key: 'profile', label: 'You',      Icon: UserCircle },
] as const;

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const tab = TABS[index];
        if (!tab) return null;
        const isActive = state.index === index;
        const { Icon } = tab;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Icon
              size={24}
              weight={isActive ? 'fill' : 'thin'}
              color={isActive ? Colors.oxblood : Colors.muted}
            />
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT + (Platform.OS === 'ios' ? 20 : 0),
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingTop: 8,
  },
  label: {
    fontSize: 10,
    fontFamily: Fonts.bodyMedium,
    letterSpacing: 0.2,
  },
  labelActive: { color: Colors.oxblood },
  labelInactive: { color: Colors.muted },
});
