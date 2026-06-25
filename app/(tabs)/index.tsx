import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MagnifyingGlass, SlidersHorizontal, MapPin } from 'phosphor-react-native';
import { Colors, Fonts, Spacing, TextStyles } from '../../src/theme';
import { getNearbyMuseums } from '../../src/data/repository';
import type { Museum, Category } from '../../src/data/types';
import { useStore } from '../../src/store';
import {
  Chip,
  Eyebrow,
  HeroCard,
  MuseumListCard,
  SectionHeader,
} from '../../src/components';

const CATEGORIES: Category[] = ['Art', 'History', 'Modern', 'Science', 'House-Museum', 'Photography'];

export default function DiscoverScreen() {
  const router = useRouter();
  const [museums, setMuseums] = useState<Museum[]>([]);
  const activeFilters = useStore((s) => s.activeFilters);
  const toggleFilter = useStore((s) => s.toggleFilter);

  useEffect(() => {
    const filter = activeFilters.length === 1 ? activeFilters[0] : undefined;
    getNearbyMuseums(filter).then(setMuseums);
  }, [activeFilters]);

  const hero = museums[0];
  const nearby = museums.slice(1);

  const goToMuseum = (id: string) => router.push(`/museum/${id}`);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.location}>
            <MapPin size={14} weight="fill" color={Colors.oxblood} />
            <Eyebrow mono color={Colors.oxblood} style={styles.locationText}>
              New York, NY
            </Eyebrow>
          </View>
          <Text style={styles.title}>Discover</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              onPress={() => router.push('/search' as any)}
            >
              <MagnifyingGlass size={22} weight="thin" color={Colors.ink} />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <SlidersHorizontal size={22} weight="thin" color={Colors.ink} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
          style={styles.chipsScroll}
        >
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              active={activeFilters.includes(cat)}
              onPress={() => toggleFilter(cat)}
              style={styles.chip}
            />
          ))}
        </ScrollView>

        {/* Hero card */}
        {hero && (
          <View style={styles.heroWrap}>
            <HeroCard museum={hero} onPress={() => goToMuseum(hero.id)} />
          </View>
        )}

        {/* Nearby list */}
        <View style={styles.section}>
          <SectionHeader title="Nearby" onSeeAll={() => {}} />
          {nearby.map((museum) => (
            <MuseumListCard
              key={museum.id}
              museum={museum}
              onPress={() => goToMuseum(museum.id)}
              style={styles.listCard}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scroll: { flex: 1 },
  content: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: Spacing.screenH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 10,
  },
  title: {
    ...TextStyles.screenTitle,
    color: Colors.ink,
  },
  headerActions: {
    position: 'absolute',
    right: Spacing.screenH,
    bottom: Spacing.lg,
    flexDirection: 'row',
    gap: Spacing.lg,
    alignItems: 'center',
  },
  chipsScroll: {
    marginBottom: Spacing.xl,
  },
  chips: {
    paddingHorizontal: Spacing.screenH,
    gap: Spacing.sm,
    flexDirection: 'row',
  },
  chip: {},
  heroWrap: {
    paddingHorizontal: Spacing.screenH,
    marginBottom: Spacing.xl,
  },
  section: {
    paddingHorizontal: Spacing.screenH,
  },
  listCard: {
    marginBottom: Spacing.sm,
  },
});
