import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  MagnifyingGlass,
  PaperPlaneTilt,
  CaretRight,
} from 'phosphor-react-native';
import { Colors, Fonts, Spacing, Radii } from '../src/theme';
import { friends, currentUser } from '../src/data/seed';

// Suggestions — friends of friends (everyone in seed except already-followed)
const SUGGESTIONS = [
  { id: 's1', name: 'Clara Whitman',  handle: '@claraw',    mutuals: 3, visited: 31, avatar: 'https://i.pravatar.cc/150?u=clara' },
  { id: 's2', name: 'Daniel Cho',     handle: '@dancho',    mutuals: 1, visited: 58, avatar: 'https://i.pravatar.cc/150?u=daniel' },
  { id: 's3', name: 'Priya Anand',    handle: '@priyaart',  mutuals: 5, visited: 12, avatar: 'https://i.pravatar.cc/150?u=priya' },
  { id: 's4', name: 'Marcus Webb',    handle: '@marcuswebb',mutuals: 2, visited: 44, avatar: 'https://i.pravatar.cc/150?u=marcus' },
  { id: 's5', name: 'Yuki Tanaka',    handle: '@yukiT',     mutuals: 4, visited: 27, avatar: 'https://i.pravatar.cc/150?u=yuki' },
  { id: 's6', name: 'Sofia Reyes',    handle: '@sofiareyes',mutuals: 1, visited: 19, avatar: 'https://i.pravatar.cc/150?u=sofia' },
];

// Pre-seed Priya as already followed
const INITIAL_FOLLOWING = new Set(['s3']);

export default function FindFriendsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [following, setFollowing] = useState<Set<string>>(new Set(INITIAL_FOLLOWING));

  const toggleFollow = (id: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleInvite = () => {
    Share.share({
      message: 'Join me on MuseumFindr — discover and log every museum you visit! https://museumfindr.app',
      title: 'Invite to MuseumFindr',
    });
  };

  const filtered = query.trim()
    ? SUGGESTIONS.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.handle.toLowerCase().includes(query.toLowerCase())
      )
    : SUGGESTIONS;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.backBtn}
        >
          <ArrowLeft size={22} weight="thin" color={Colors.ink} />
        </TouchableOpacity>
        <Text style={styles.title}>Find friends</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* Search bar */}
        <View style={styles.searchBar}>
          <MagnifyingGlass size={18} weight="thin" color={Colors.stone} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or @handle"
            placeholderTextColor={Colors.muted}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
        </View>

        {/* Invite banner */}
        {!query && (
          <TouchableOpacity
            style={styles.inviteBanner}
            activeOpacity={0.88}
            onPress={handleInvite}
          >
            <PaperPlaneTilt size={26} weight="thin" color={Colors.gilt} />
            <View style={styles.inviteText}>
              <Text style={styles.inviteTitle}>Invite friends to MuseumFindr</Text>
              <Text style={styles.inviteSub}>Share your link, build your circle</Text>
            </View>
            <CaretRight size={13} weight="bold" color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        )}

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerLabel}>
            {query ? 'Results' : 'Suggested for you'}
          </Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Suggestion rows */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No results for "{query}"</Text>
          </View>
        ) : (
          filtered.map((person) => {
            const isFollowing = following.has(person.id);
            return (
              <View key={person.id} style={styles.row}>
                <Image
                  source={{ uri: person.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.info}>
                  <Text style={styles.name}>{person.name}</Text>
                  <Text style={styles.sub}>
                    {person.mutuals} mutual{person.mutuals !== 1 ? 's' : ''} · {person.visited} visited
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.followBtn, isFollowing && styles.followingBtn]}
                  onPress={() => toggleFollow(person.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.followText, isFollowing && styles.followingText]}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: Spacing.screenH,
    paddingTop: 12,
    paddingBottom: 10,
  },
  backBtn: {
    marginRight: 2,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: Colors.ink,
    lineHeight: 26,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.screenH,
    paddingBottom: 40,
    gap: 0,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.ink,
  },

  // Invite banner
  inviteBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.oxblood,
    borderRadius: 14,
    padding: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  inviteText: { flex: 1 },
  inviteTitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: '#fff',
    lineHeight: 17,
  },
  inviteSub: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: 'rgba(255,255,255,0.70)',
    marginTop: 2,
    lineHeight: 15,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E7DFD3' },
  dividerLabel: {
    fontFamily: Fonts.displayItalic,
    fontSize: 13,
    color: Colors.ink,
    flexShrink: 1,
  },

  // Person rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 9,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.sand,
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.ink,
    lineHeight: 18,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.stone,
    marginTop: 3,
  },
  followBtn: {
    backgroundColor: Colors.oxblood,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    flexShrink: 0,
  },
  followingBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  followText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: '#fff',
  },
  followingText: {
    color: Colors.stone,
  },

  // Empty state
  empty: {
    paddingTop: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.muted,
  },
});
