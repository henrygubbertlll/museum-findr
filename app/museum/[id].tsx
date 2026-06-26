import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  BookmarkSimple,
  Clock,
  Ticket,
  MapPin,
  Star,
} from 'phosphor-react-native';
import { Colors, Fonts, Radii, Shadows, Spacing, TextStyles } from '../../src/theme';
import { getMuseum } from '../../src/data/repository';
import type { Museum } from '../../src/data/types';
import { useIsSaved, useStore } from '../../src/store';
import { Button, StarRating, Eyebrow, LogVisitSheet } from '../../src/components';

const { width: W } = Dimensions.get('window');
const HERO_H = 300;

export default function MuseumDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [museum, setMuseum] = useState<Museum | null>(null);
  const [logSheetOpen, setLogSheetOpen] = useState(false);
  const isSaved = useIsSaved(id ?? '');
  const toggleWishlist = useStore((s) => s.toggleWishlist);

  useEffect(() => {
    if (id) getMuseum(id).then(setMuseum);
  }, [id]);

  if (!museum) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image source={{ uri: museum.heroImage }} style={styles.heroImg} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(33,28,23,0.45)', 'transparent']}
            locations={[0, 0.5]}
            style={StyleSheet.absoluteFill}
          />

          {/* Nav */}
          <View style={styles.nav}>
            <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
              <ArrowLeft size={20} weight="thin" color={Colors.cream} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navBtn, isSaved && styles.navBtnActive]}
              onPress={() => toggleWishlist(museum.id)}
            >
              <BookmarkSimple
                size={20}
                weight={isSaved ? 'fill' : 'thin'}
                color={isSaved ? Colors.oxblood : Colors.cream}
              />
            </TouchableOpacity>
          </View>

          {/* Open badge */}
          {museum.openNow && (
            <View style={styles.openBadge}>
              <Text style={styles.openText}>Open now</Text>
            </View>
          )}
        </View>

        {/* Info block */}
        <View style={styles.infoBlock}>
          <Eyebrow mono color={Colors.stone}>{museum.category} · {museum.neighborhood}</Eyebrow>
          <Text style={styles.name}>{museum.name}</Text>

          {/* Rating row */}
          <View style={styles.ratingRow}>
            <StarRating rating={museum.rating} size={13} />
            <Text style={styles.ratingText}>
              {museum.rating.toFixed(1)} · {museum.ratingCount.toLocaleString()} reviews
            </Text>
          </View>

          <Text style={styles.blurb}>{museum.blurb}</Text>

          {/* Meta pills */}
          <View style={styles.metaPills}>
            <View style={styles.pill}>
              <Clock size={13} weight="thin" color={Colors.stone} />
              <Text style={styles.pillText}>{museum.hoursToday}</Text>
            </View>
            <View style={styles.pill}>
              <Ticket size={13} weight="thin" color={Colors.stone} />
              <Text style={styles.pillText}>{museum.admission}</Text>
            </View>
            <View style={styles.pill}>
              <MapPin size={13} weight="thin" color={Colors.stone} />
              <Text style={styles.pillText}>{museum.distanceMi} mi away</Text>
            </View>
          </View>
        </View>

        {/* Exhibits */}
        {museum.exhibits.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exhibitions</Text>
            {museum.exhibits.map((exhibit) => (
              <View key={exhibit.id} style={styles.exhibitCard}>
                <Image
                  source={{ uri: exhibit.image }}
                  style={styles.exhibitImg}
                  resizeMode="cover"
                />
                <View style={styles.exhibitInfo}>
                  <Text style={styles.exhibitTitle}>{exhibit.title}</Text>
                  <Text style={styles.exhibitDates}>{exhibit.dates}</Text>
                  <Text style={styles.exhibitBlurb} numberOfLines={2}>{exhibit.blurb}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.cta}>
        <Button label="Log this visit" variant="primary" fullWidth onPress={() => setLogSheetOpen(true)} />
      </View>

      {/* Log Visit Sheet */}
      <LogVisitSheet
        visible={logSheetOpen}
        onClose={() => setLogSheetOpen(false)}
        museum={museum}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingBottom: 100 },
  hero: { width: W, height: HERO_H, backgroundColor: Colors.sand },
  heroImg: { ...StyleSheet.absoluteFillObject },
  nav: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenH,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(33,28,23,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnActive: { backgroundColor: Colors.cream },
  openBadge: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
    backgroundColor: Colors.openGreen,
    borderRadius: Radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  openText: { fontFamily: Fonts.bodyMedium, fontSize: 11, color: '#FFF' },
  infoBlock: {
    padding: Spacing.xl,
    gap: 10,
    backgroundColor: Colors.cream,
  },
  name: {
    fontFamily: Fonts.display,
    fontSize: 28,
    lineHeight: 30,
    color: Colors.ink,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.stone,
  },
  blurb: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.bodyMuted,
  },
  metaPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.sand,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.stone,
  },
  section: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Colors.ink,
  },
  exhibitCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 10,
  },
  exhibitImg: {
    width: 80,
    height: 70,
    borderRadius: 8,
    backgroundColor: Colors.sand,
    flexShrink: 0,
  },
  exhibitInfo: { flex: 1, gap: 4 },
  exhibitTitle: {
    fontFamily: Fonts.displaySemiBold,
    fontSize: 14,
    color: Colors.ink,
    lineHeight: 17,
  },
  exhibitDates: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.stone,
  },
  exhibitBlurb: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.bodyMuted,
  },
  cta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.cream,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.xl,
    paddingTop: 12,
    paddingBottom: 28,
  },
});
