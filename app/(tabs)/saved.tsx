import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Funnel, BookmarkSimple } from 'phosphor-react-native';
import { Colors, Fonts, Radii, Shadows, Spacing, TextStyles } from '../../src/theme';
import { getLogbook, getWishlist } from '../../src/data/repository';
import type { Museum, Visit } from '../../src/data/types';
import { museumsById, currentUser } from '../../src/data/seed';
import { StatStrip, VisitedCard, Eyebrow } from '../../src/components';

// Ruled divider with italic centred label
function Divider({ label }: { label: string }) {
  return (
    <View style={divStyles.row}>
      <View style={divStyles.line} />
      <Text style={divStyles.label}>{label}</Text>
      <View style={divStyles.line} />
    </View>
  );
}

const divStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: Spacing.screenH,
    marginBottom: 10,
    marginTop: 6,
  },
  line: { flex: 1, height: 1, backgroundColor: Colors.border },
  label: {
    fontFamily: Fonts.displayItalic,
    fontSize: 13,
    color: Colors.ink,
    flexShrink: 1,
  },
});

// Compact wishlist row
function WishlistRow({ museum, onPress }: { museum: Museum; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={wlStyles.row}>
      <Image source={{ uri: museum.thumbnail }} style={wlStyles.thumb} resizeMode="cover" />
      <View style={wlStyles.info}>
        <Text style={wlStyles.name} numberOfLines={1}>{museum.name}</Text>
        <Text style={wlStyles.sub}>{museum.category} · {museum.distanceMi} mi</Text>
      </View>
      <BookmarkSimple size={18} weight="fill" color={Colors.oxblood} />
    </TouchableOpacity>
  );
}

const wlStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: Spacing.screenH,
    marginBottom: 8,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    ...Shadows.card,
  },
  thumb: {
    width: 46,
    height: 46,
    borderRadius: 9,
    backgroundColor: Colors.sand,
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: {
    fontFamily: Fonts.display,
    fontSize: 15,
    color: Colors.ink,
    lineHeight: 18,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.stone,
    marginTop: 3,
  },
});

export default function SavedScreen() {
  const router = useRouter();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [wishlist, setWishlist] = useState<Museum[]>([]);

  useEffect(() => {
    getLogbook(currentUser.id).then(setVisits);
    getWishlist(currentUser.id).then(setWishlist);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Eyebrow mono color={Colors.stone}>Saved</Eyebrow>
            <Text style={styles.title}>Your Logbook</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Funnel size={15} weight="thin" color={Colors.ink} />
          </TouchableOpacity>
        </View>

        {/* Stats strip */}
        <StatStrip
          stats={[
            { value: currentUser.stats.visited, label: 'Visited' },
            { value: currentUser.stats.wishlist, label: 'Wishlist' },
            { value: currentUser.stats.cities, label: 'Cities' },
          ]}
          style={styles.stats}
        />

        {/* Recently visited */}
        {visits.length > 0 && (
          <View>
            <Divider label="Recently visited" />
            {visits.map((visit) => {
              const museum = museumsById[visit.museumId];
              if (!museum) return null;
              return (
                <VisitedCard
                  key={visit.id}
                  museum={museum}
                  visit={visit}
                  onPress={() => router.push(`/museum/${museum.id}` as any)}
                  style={styles.visitCard}
                />
              );
            })}
          </View>
        )}

        {/* Wishlist */}
        {wishlist.length > 0 && (
          <View style={styles.wishlistSection}>
            <Divider label="Wishlist" />
            {wishlist.map((museum) => (
              <WishlistRow
                key={museum.id}
                museum={museum}
                onPress={() => router.push(`/museum/${museum.id}` as any)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  scroll: { flex: 1 },
  content: { paddingBottom: 40 },
  header: {
    paddingHorizontal: Spacing.screenH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: { ...TextStyles.screenTitle, color: Colors.ink, marginTop: 6 },
  filterBtn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    marginHorizontal: Spacing.screenH,
    marginBottom: Spacing.xxl,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  visitCard: {
    marginHorizontal: Spacing.screenH,
    marginBottom: 8,
  },
  wishlistSection: {
    marginTop: 4,
  },
});
