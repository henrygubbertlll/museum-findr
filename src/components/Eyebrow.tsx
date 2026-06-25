import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Colors, TextStyles } from '../theme';

interface Props {
  children: React.ReactNode;
  mono?: boolean;
  color?: string;
  style?: TextStyle;
}

export default function Eyebrow({ children, mono = false, color = Colors.stone, style }: Props) {
  return (
    <Text style={[mono ? styles.mono : styles.sans, { color }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  sans: { ...TextStyles.eyebrow },
  mono: { ...TextStyles.monoEyebrow },
});
