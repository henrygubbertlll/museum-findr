import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookmarkSimple, Star } from 'phosphor-react-native';
import { Colors, Fonts, Radii, Spacing } from '../theme';
import type { Museum } from '../data/types';
import { useIsSaved, useStore } from '../store';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_H = 340;

interface Props {
  museum: Museum;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function HeroCard({ museum, onPress, style }: Props) {
  const isSaved = useIsSaved(museum.id);
  const toggleWishlist = useStore((s) => s.toggleWishlist);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.92}
      style={[styles.card, style]}
    >
      <Image
        source={{ uri: museum.heroImage }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Gradient overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(33,28,23,0.72)']}
        locations={[0.35, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Top badges */}
      <View style={styles.topRow}>
        {museum.openNow && (
          <View style={styles.openBadge}>
            <Text style={styles.openText}>Open now</Text>
          </View>
        )}
      </View>

      {/* Bottom info */}
      <View style={styles.bottom}>
        <View style={styles.bottomLeft}>
          <Text style={styles.name} numberOfLines={2}>{museum.name}</Text>
          <View style={styles.metaRow}>
            <Star size={12} weight="fill" color={Colors.gilt} />
            <Text style={styles.rating}>{museum.rating.toFixed(1)}</Text>
            <Text style={styles.meta}>
              {' '}({(museum.ratingCount / 1000).toFixed(1)}k) · {museum.neighborhood}
            </Text>
          </View>
        </View>

        {/* Save button */}
        <TouchableOpacity
          onPress={() => toggleWishlist(museum.id)}
          style={[styles.saveBtn, isSaved && styles.saveBtnActive]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <BookmarkSimple
            size={20}
            weight={isSaved ? 'fill' : 'thin'}
            color={isSaved ? Colors.oxblood : Colors.cream}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_W - Spacing.screenH * 2,
    height: CARD_H,
    borderRadius: Radii.card,
    overflow: 'hidden',
    backgroundColor: Colors.sand,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  topRow: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  openBadge: {
    backgroundColor: Colors.openGreen,
    borderRadius: Radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  openText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: '#FFFFFF',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bottomLeft: {
    flex: 1,
    marginRight: Spacing.md,
    gap: 6,
  },
  name: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: Colors.cream,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.cream,
  },
  meta: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: 'rgba(248,244,237,0.8)',
  },
  saveBtn: {
    width: 40,
    height: 40,
    borderRadius: Radii.pill,
    borderWidth: 1.5,
    borderColor: 'rgba(248,244,237,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33,28,23,0.3)',
  },
  saveBtnActive: {
    backgroundColor: Colors.cream,
    borderColor: Colors.cream,
  },
});
