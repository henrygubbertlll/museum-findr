import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle } from 'phosphor-react-native';
import { Colors, Fonts, Radii, Shadows, Spacing } from '../theme';
import type { Museum, Visit } from '../data/types';
import StarRating from './StarRating';

interface Props {
  museum: Museum;
  visit: Visit;
  onPress?: () => void;
  style?: ViewStyle;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function VisitedCard({ museum, visit, onPress, style }: Props) {
  const dateLabel = visit.companion
    ? `${formatDate(visit.date)} · ${visit.companion}`
    : formatDate(visit.date);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.card, style]}
    >
      {/* Hero image with gradient overlay */}
      <View style={styles.heroWrap}>
        <Image
          source={{ uri: museum.heroImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(10,8,5,0.58)']}
          style={styles.gradient}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
        />

        {/* Visited badge — white bg, oxblood icon */}
        <View style={styles.badge}>
          <CheckCircle size={11} weight="fill" color={Colors.oxblood} />
          <Text style={styles.badgeText}>VISITED</Text>
        </View>

        {/* Museum name overlaid at bottom of image */}
        <Text style={styles.heroName} numberOfLines={1}>{museum.name}</Text>
      </View>

      {/* Content row */}
      <View style={styles.content}>
        <View style={styles.meta}>
          <Text style={styles.date}>{dateLabel}</Text>
          <StarRating rating={visit.rating} size={11} />
        </View>
        {visit.note ? (
          <Text style={styles.quote} numberOfLines={2}>"{visit.note}"</Text>
        ) : null}
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
  heroWrap: {
    height: 80,
    position: 'relative',
    backgroundColor: Colors.sand,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.94)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    color: Colors.ink,
    letterSpacing: 0.6,
  },
  heroName: {
    position: 'absolute',
    bottom: 9,
    left: 12,
    right: 12,
    fontFamily: Fonts.display,
    fontSize: 15,
    color: '#fff',
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 6,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.stone,
  },
  quote: {
    fontFamily: Fonts.displayItalic,
    fontSize: 13,
    color: Colors.bodyMuted,
    lineHeight: 18,
  },
});
