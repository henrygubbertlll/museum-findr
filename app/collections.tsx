import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import { Colors, Fonts, Spacing, TextStyles } from '../src/theme';
import { collections } from '../src/data/seed';
import { Eyebrow } from '../src/components';

const { width: W } = Dimensions.get('window');
const GRID_GAP = 12;
const GRID_ITEM_W = (W - Spacing.screenH * 2 - GRID_GAP) / 2;

const img = (seed: string) => `https://picsum.photos/seed/${seed}/400/300`;

const ALL_COLLECTIONS = [
  ...collections,
  { id: 'e1', title: 'Hidden Gems', curator: 'The Editors', museumIds: ['m7', 'm1'], cover: img('hidden-gems') },
  { id: 'e2', title: 'Free Sundays', curator: 'The Editors', museumIds: ['m2', 'm6'], cover: img('free-sundays') },
  { id: 'e3', title: 'Modern Masters', curator: 'The Editors', museumIds: ['m3', 'm4', 'm5'], cover: img('modern-masters') },
  { id: 'e4', title: 'With Kids', curator: 'The Editors', museumIds: ['m2', 'm3'], cover: img('with-kids') },
];

export default function CollectionsScreen() {
  const router = useRouter();
  const featured = ALL_COLLECTIONS[0];
  const grid = ALL_COLLECTIONS.slice(1);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <ArrowLeft size={20} weight="thin" color={Colors.ink} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Eyebrow mono color={Colors.stone}>Curated by MuseumFindr</Eyebrow>
            <Text style={styles.title}>Collections</Text>
          </View>
        </View>

        {/* Featured card */}
        <TouchableOpacity style={styles.featuredCard} activeOpacity={0.88}>
          <Image source={{ uri: featured.cover }} style={StyleSheet.absoluteFillObject as any} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(10,7,4,0.1)', 'rgba(10,7,4,0)', 'rgba(10,7,4,0.88)']}
            locations={[0, 0.3, 1]}
            style={StyleSheet.absoluteFillObject as any}
          />
          <View style={styles.editorPill}>
            <Text style={styles.editorPillText}>EDITOR'S PICK</Text>
          </View>
          <View style={styles.featuredBottom}>
            <Text style={styles.featuredTitle}>{featured.title}</Text>
            <Text style={styles.featuredSub}>{featured.museumIds.length} museums · Curated</Text>
          </View>
        </TouchableOpacity>

        {/* 2-column grid */}
        <View style={styles.grid}>
          {grid.map((col) => (
            <TouchableOpacity key={col.id} style={styles.gridItem} activeOpacity={0.85}>
              <View style={styles.gridImageWrap}>
                <Image source={{ uri: col.cover }} style={StyleSheet.absoluteFillObject as any} resizeMode="cover" />
                <LinearGradient
                  colors={['rgba(10,7,4,0)', 'rgba(10,7,4,0.8)']}
                  locations={[0.4, 1]}
                  style={StyleSheet.absoluteFillObject as any}
                />
                <Text style={styles.gridTitle} numberOfLines={2}>{col.title}</Text>
              </View>
              <Text style={styles.gridSub}>{col.museumIds.length} museums</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: Spacing.screenH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center',
  },
  headerText: { flex: 1 },
  title: { ...TextStyles.screenTitle, color: Colors.ink, marginTop: 6 },
  featuredCard: {
    height: 200, marginHorizontal: Spacing.screenH,
    borderRadius: 18, overflow: 'hidden', backgroundColor: Colors.sand, marginBottom: 14,
  },
  editorPill: {
    position: 'absolute', top: 13, left: 13,
    backgroundColor: 'rgba(124,45,40,0.92)',
    paddingHorizontal: 11, paddingVertical: 5, borderRadius: 999,
  },
  editorPillText: {
    fontFamily: Fonts.bodySemiBold, fontSize: 9,
    letterSpacing: 1.0, textTransform: 'uppercase' as const, color: '#fff',
  },
  featuredBottom: { position: 'absolute', bottom: 15, left: 16, right: 16 },
  featuredTitle: { fontFamily: Fonts.display, fontSize: 24, lineHeight: 26, color: '#fff' },
  featuredSub: { fontFamily: Fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.78)', marginTop: 7 },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: GRID_GAP, paddingHorizontal: Spacing.screenH,
  },
  gridItem: { width: GRID_ITEM_W },
  gridImageWrap: {
    height: 120, borderRadius: 14, overflow: 'hidden',
    backgroundColor: Colors.sand, position: 'relative',
  },
  gridTitle: {
    position: 'absolute', bottom: 10, left: 11, right: 11,
    fontFamily: Fonts.display, fontSize: 15, lineHeight: 18, color: '#fff',
  },
  gridSub: { fontFamily: Fonts.body, fontSize: 11, color: Colors.stone, marginTop: 6 },
});
