import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Fonts } from '../theme';

export interface StatItem {
  value: string | number;
  label: string;
}

interface Props {
  stats: StatItem[];
  style?: ViewStyle;
  light?: boolean; // white text variant for oxblood backgrounds
}

export default function StatStrip({ stats, style, light = false }: Props) {
  const valueColor = light ? Colors.cream : Colors.ink;
  const labelColor = light ? 'rgba(248,244,237,0.65)' : Colors.stone;

  return (
    <View style={[styles.row, style]}>
      {stats.map((stat, i) => (
        <React.Fragment key={stat.label}>
          {i > 0 && <View style={[styles.divider, light && styles.dividerLight]} />}
          <View style={styles.cell}>
            <Text style={[styles.value, { color: valueColor }]}>{stat.value}</Text>
            <Text style={[styles.label, { color: labelColor }]}>{stat.label}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  value: {
    fontFamily: Fonts.display,
    fontSize: 28,
    lineHeight: 28,
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: 12,
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },
  dividerLight: {
    backgroundColor: 'rgba(248,244,237,0.25)',
  },
});
