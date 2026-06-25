import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Fonts, Radii, Spacing } from '../theme';

type Variant = 'category' | 'pill';

interface Props {
  label: string;
  active?: boolean;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
}

export default function Chip({ label, active = false, onPress, variant = 'category', style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.base,
        variant === 'category' ? styles.category : styles.pill,
        active && styles.active,
        style,
      ]}
    >
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 34,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    borderRadius: Radii.chip,
    backgroundColor: Colors.sand,
  },
  pill: {
    borderRadius: Radii.pill,
    backgroundColor: Colors.sand,
  },
  active: {
    backgroundColor: Colors.oxblood,
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
  },
  labelInactive: { color: Colors.ink },
  labelActive: { color: Colors.cream },
});
