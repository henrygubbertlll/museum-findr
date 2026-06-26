import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, BookmarkSimple } from 'phosphor-react-native';
import { Colors, Fonts, Shadows, Spacing } from '../../src/theme';
import { guides, museumsById, currentUser } from '../../src/data/seed';
import { useStore } from '../../src/store';
import { Button } from '../../src/components';

const HERO_H = 230;

export default function GuideScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const toggleWishlist = useStore((s) => s.toggleWishlist);

  const guide = guides.find((g) => g.id === id) ?? guides[0];
  const stopMuseums = guide.stops.map((s) => museumsById[s.museumId]).filter(Boolean);

  function saveAll() {
    stopMuseums.forEach((m) => { if (m) toggleWishlist(m.id); });
  }

  return (
    <View style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Hero */}
        <View style={styles.hero}>
          <Image source={{ uri: guide.cover }} style={StyleSheet.absoluteFillObject as any} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(10,7,4,0.4)', 'rgba(10,7,4,0)', 'rgba(10,7,4,0.9)']}
            locations={[0, 0.34, 1]}
            style={StyleSheet.absoluteFillObject as any}
          />
          <View style={styles.nav}>
            <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
              <ArrowLeft size={15} weight="bold" color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBtn}>
              <BookmarkSimple size={17} weight="thin" color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.heroBottom}>
            <Text style={styles.heroCategoryLabel}>{guide.city} · itinerary</Text>
            <Text style={styles.heroTitle}>{guide.title}</Text>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.intro}>
            {guide.stops.length} institutions across {guide.city} — from storied uptown halls to the city's most ambitious contemporary spaces.
          </Text>
          <View style={styles.byline}>
            <Image source={{ uri: currentUser.avatar }} style={styles.bylineAvatar} />
            <Text style={styles.bylineText}>{guide.byline}</Text>
          </View>

          {guide.stops.map((stop, i) => {
            const museum = museumsById[stop.museumId];
            if (!museum) return null;
            const isLast = i === guide.stops.length - 1;
            return (
              <View key={stop.museumId} style={styles.stopRow}>
                <View style={styles.stopLeft}>
                  <View style={styles.stopNum}>
                    <Text style={styles.stopNumText}>{i + 1}</Text>
                  </View>
                  {!isLast && <View style={styles.connector} />}
                </View>
                <TouchableOpacity
                  style={styles.stopCard}
                  activeOpacity={0.85}
                  onPress={() => router.push(`/museum/${museum.id}` as any)}
                >
                  <Image source={{ uri: museum.thumbnail }} style={styles.stopThumb} resizeMode="cover" />
                  <View style={styles.stopInfo}>
                    <Text style={styles.stopName}>{museum.name}</Text>
                    <Text style={styles.stopMeta}>{museum.category} · {museum.distanceMi} mi</Text>
                    {stop.note ? <Text style={styles.stopNote} numberOfLines={2}>{stop.note}</Text> : null}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.cta}>
        <Button
          label={`Save all ${stopMuseums.length} to wishlist`}
          variant="primary"
          fullWidth
          onPress={saveAll}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingBottom: 40 },
  hero: { height: HERO_H, backgroundColor: Colors.sand, position: 'relative' },
  nav: {
    position: 'absolute', top: 48, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.screenH,
  },
  navBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center',
  },
  heroBottom: { position: 'absolute', bottom: 16, left: Spacing.screenH, right: Spacing.screenH },
  heroCategoryLabel: {
    fontFamily: Fonts.bodySemiBold, fontSize: 9,
    letterSpacing: 1.6, textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)',
  },
  heroTitle: { fontFamily: Fonts.display, fontSize: 27, lineHeight: 28, color: '#fff', marginTop: 8 },
  body: { paddingHorizontal: Spacing.screenH, paddingTop: 16 },
  intro: { fontFamily: Fonts.displayItalic, fontSize: 15, lineHeight: 24, color: Colors.bodyMuted },
  byline: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 12, marginBottom: 20 },
  bylineAvatar: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.sand },
  bylineText: { fontFamily: Fonts.body, fontSize: 11, color: Colors.stone },
  stopRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginBottom: 14 },
  stopLeft: { alignItems: 'center', flexShrink: 0, width: 24 },
  stopNum: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.oxblood, alignItems: 'center', justifyContent: 'center',
  },
  stopNumText: { fontFamily: Fonts.bodyBold, fontSize: 11, color: '#fff' },
  connector: { width: 1.5, flex: 1, backgroundColor: '#E7DFD3', marginTop: 4, minHeight: 36 },
  stopCard: {
    flex: 1, flexDirection: 'row', gap: 11, alignItems: 'center',
    backgroundColor: Colors.card, borderRadius: 13, padding: 10, ...Shadows.card,
  },
  stopThumb: { width: 46, height: 46, borderRadius: 9, backgroundColor: Colors.sand, flexShrink: 0 },
  stopInfo: { flex: 1 },
  stopName: { fontFamily: Fonts.display, fontSize: 15, lineHeight: 18, color: Colors.ink },
  stopMeta: { fontFamily: Fonts.body, fontSize: 11, color: Colors.stone, marginTop: 3 },
  stopNote: { fontFamily: Fonts.displayItalic, fontSize: 12, lineHeight: 16, color: Colors.bodyMuted, marginTop: 4 },
  cta: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.cream, borderTopWidth: 1, borderTopColor: Colors.border,
    paddingHorizontal: Spacing.xl, paddingTop: 12, paddingBottom: 28,
  },
});
