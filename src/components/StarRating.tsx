import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Star } from 'phosphor-react-native';
import { Colors } from '../theme';

interface Props {
  rating: number;   // 1–5, supports half stars (rounds to nearest 0.5)
  size?: number;
  style?: ViewStyle;
}

export default function StarRating({ rating, size = 14, style }: Props) {
  return (
    <View style={[styles.row, style]}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = rating >= n - 0.25;
        return (
          <Star
            key={n}
            size={size}
            weight={filled ? 'fill' : 'thin'}
            color={Colors.gilt}
            style={styles.star}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  star: {},
});
