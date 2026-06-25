import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, TextStyles } from '../../src/theme';
import { getLogbook, getWishlist } from '../../src/data/repository';
import type { Museum, Visit } from '../../src/data/types';
import { museumsById } from '../../src/data/seed';
import { currentUser } from '../../src/data/seed';
import { SectionHeader, StatStrip, VisitedCard, MuseumListCard, Eyebrow } from '../../src/components';

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
          <Eyebrow mono color={Colors.stone}>Your Collection</Eyebrow>
          <Text style={styles.title}>Logbook</Text>
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
          <View style={styles.section}>
            <SectionHeader title="Recently Visited" />
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
          <View style={styles.section}>
            <SectionHeader title="Wishlist" />
            {wishlist.map((museum) => (
              <MuseumListCard
                key={museum.id}
                museum={museum}
                onPress={() => router.push(`/museum/${museum.id}` as any)}
                style={styles.listCard}
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
  content: { paddingBottom: 32 },
  header: {
    paddingHorizontal: Spacing.screenH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: 6,
  },
  title: { ...TextStyles.screenTitle, color: Colors.ink },
  stats: {
    marginHorizontal: Spacing.screenH,
    marginBottom: Spacing.xxl,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  section: {
    paddingHorizontal: Spacing.screenH,
    marginBottom: Spacing.xl,
  },
  visitCard: { marginBottom: Spacing.md },
  listCard: { marginBottom: Spacing.sm },
});
