import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors, Fonts, Radii, Shadows, Spacing } from '../theme';
import type { Museum, Visit } from '../data/types';
import StarRating from './StarRating';

interface Props {
  museum: Museum;
  visit: Visit;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function VisitedCard({ museum, visit, onPress, style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.card, style]}
    >
      {/* Hero image */}
      <Image
        source={{ uri: museum.heroImage }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Visited badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Visited</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{museum.name}</Text>
          <StarRating rating={visit.rating} size={12} />
        </View>

        {visit.note ? (
          <Text style={styles.quote} numberOfLines={2}>"{visit.note}"</Text>
        ) : null}

        <Text style={styles.date}>
          {new Date(visit.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    overflow: 'hidden',
    ...Shadows.card,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.sand,
  },
  badge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: Colors.oxblood,
    borderRadius: Radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: Colors.cream,
    letterSpacing: 0.3,
  },
  content: {
    padding: Spacing.md,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  name: {
    fontFamily: Fonts.display,
    fontSize: 17,
    color: Colors.ink,
    flex: 1,
  },
  quote: {
    fontFamily: Fonts.displayItalic,
    fontSize: 13,
    color: Colors.bodyMuted,
    lineHeight: 18,
  },
  date: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.stone,
  },
});
