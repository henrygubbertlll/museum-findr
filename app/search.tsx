import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  MagnifyingGlass,
  XCircle,
  ClockCounterClockwise,
  ArrowUpLeft,
  Star,
} from 'phosphor-react-native';
import { Colors, Fonts, Spacing } from '../src/theme';
import { museums } from '../src/data/seed';
import type { Museum } from '../src/data/types';

const RECENT_SEARCHES = ['Impressionism', 'Natural history', 'Photography'];

function HighlightText({ text, query, style }: { text: string; query: string; style?: object }) {
  if (!query) return <Text style={style}>{text}</Text>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <Text style={style}>{text}</Text>;
  return (
    <Text style={style}>
      {text.slice(0, idx)}
      <Text style={hlStyles.match}>{text.slice(idx, idx + query.length)}</Text>
      {text.slice(idx + query.length)}
    </Text>
  );
}
const hlStyles = StyleSheet.create({
  match: { backgroundColor: '#FBEFC8' },
});

function SearchResultRow({
  museum,
  query,
  onPress,
}: {
  museum: Museum;
  query: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.resultRow} onPress={onPress} activeOpacity={0.75}>
      <Image source={{ uri: museum.thumbnail }} style={styles.resultThumb} resizeMode="cover" />
      <View style={styles.resultInfo}>
        <HighlightText text={museum.name} query={query} style={styles.resultName} />
        <View style={styles.resultSubRow}>
          <HighlightText
            text={`${museum.category} · ${museum.distanceMi} mi`}
            query={query}
            style={styles.resultSub}
          />
        </View>
      </View>
      <View style={styles.resultRating}>
        <Star size={10} weight="fill" color={Colors.gilt} />
        <Text style={styles.resultRatingText}>{museum.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function SearchScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const results = query.trim().length > 0
    ? museums.filter((m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase()) ||
        m.neighborhood.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function handleRecentTap(term: string) {
    setQuery(term);
  }

  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MagnifyingGlass size={18} weight="thin" color={Colors.oxblood} />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Search museums…"
            placeholderTextColor={Colors.muted}
            style={styles.searchInput}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <XCircle size={17} weight="fill" color="#C0B09A" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {results.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Results</Text>
            {results.map((museum, i) => (
              <View key={museum.id}>
                <SearchResultRow
                  museum={museum}
                  query={query}
                  onPress={() => router.push(`/museum/${museum.id}` as any)}
                />
                {i < results.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        )}

        {query.length > 0 && results.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No museums match "{query}"</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Recent searches</Text>
          {RECENT_SEARCHES.map((term) => (
            <TouchableOpacity
              key={term}
              style={styles.recentRow}
              onPress={() => handleRecentTap(term)}
              activeOpacity={0.7}
            >
              <ClockCounterClockwise size={17} weight="thin" color={Colors.muted} />
              <Text style={styles.recentText}>{term}</Text>
              <ArrowUpLeft size={16} weight="thin" color="#C0B09A" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: Spacing.screenH,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.oxblood,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.ink,
    padding: 0,
  },
  cancelText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.oxblood,
  },

  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  section: {
    paddingHorizontal: Spacing.screenH,
    paddingTop: 4,
    marginBottom: 8,
  },
  sectionLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
    color: '#B8AD9E',
    marginBottom: 12,
    marginTop: 16,
  },

  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 9,
  },
  resultThumb: {
    width: 46,
    height: 46,
    borderRadius: 9,
    backgroundColor: Colors.sand,
    flexShrink: 0,
  },
  resultInfo: { flex: 1 },
  resultName: {
    fontFamily: Fonts.display,
    fontSize: 15,
    lineHeight: 18,
    color: Colors.ink,
  },
  resultSubRow: { marginTop: 3 },
  resultSub: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.stone,
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flexShrink: 0,
  },
  resultRatingText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    color: Colors.ink,
  },
  divider: {
    height: 1,
    backgroundColor: '#EFE8DB',
  },

  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 7,
  },
  recentText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.bodyMuted,
  },

  emptyState: {
    paddingHorizontal: Spacing.screenH,
    paddingTop: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.displayItalic,
    fontSize: 15,
    color: Colors.stone,
  },
});
