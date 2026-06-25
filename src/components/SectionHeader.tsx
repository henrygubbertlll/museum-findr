import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Fonts, Spacing } from '../theme';

interface Props {
  title: string;
  onSeeAll?: () => void;
  style?: ViewStyle;
}

export default function SectionHeader({ title, onSeeAll, style }: Props) {
  return (
    <View style={[styles.row, style]}>
      <Text style={styles.title}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.ink,
    letterSpacing: 0,
  },
  seeAll: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.oxblood,
  },
});
