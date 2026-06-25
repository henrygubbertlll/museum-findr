import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, TextStyles } from '../../src/theme';
import { getFeed } from '../../src/data/repository';
import type { FeedEvent } from '../../src/data/types';
import { allUsers, museumsById, collections } from '../../src/data/seed';
import { Eyebrow } from '../../src/components';
import { Trophy, BookmarkSimple, Eye, Star } from 'phosphor-react-native';

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function FeedItem({ event }: { event: FeedEvent }) {
  const user = allUsers[event.userId];
  if (!user) return null;

  const renderContent = () => {
    if (event.kind === 'visit') {
      const museum = museumsById[event.museumId];
      return (
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <Eye size={14} weight="thin" color={Colors.oxblood} />
            <Text style={styles.itemAction}>visited</Text>
            <Text style={styles.itemTarget}>{museum?.name}</Text>
          </View>
          {event.note && <Text style={styles.itemQuote}>"{event.note}"</Text>}
          {museum && (
            <Image
              source={{ uri: museum.heroImage }}
              style={styles.itemImage}
              resizeMode="cover"
            />
          )}
        </View>
      );
    }
    if (event.kind === 'save') {
      const museum = museumsById[event.museumId];
      return (
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <BookmarkSimple size={14} weight="thin" color={Colors.oxblood} />
            <Text style={styles.itemAction}>saved</Text>
            <Text style={styles.itemTarget}>{museum?.name}</Text>
          </View>
        </View>
      );
    }
    if (event.kind === 'milestone') {
      return (
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <Trophy size={14} weight="fill" color={Colors.gilt} />
            <Text style={styles.itemAction}>earned a new badge</Text>
          </View>
        </View>
      );
    }
    if (event.kind === 'collection') {
      const col = collections.find((c) => c.id === event.collectionId);
      return (
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <Star size={14} weight="thin" color={Colors.oxblood} />
            <Text style={styles.itemAction}>added {event.count} to</Text>
            <Text style={styles.itemTarget}>{col?.title}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.item}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.itemBody}>
        <View style={styles.itemMeta}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.time}>{timeAgo(event.at)}</Text>
        </View>
        {renderContent()}
      </View>
    </View>
  );
}

export default function FeedScreen() {
  const [events, setEvents] = useState<FeedEvent[]>([]);

  useEffect(() => {
    getFeed('u0').then(setEvents);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Eyebrow mono color={Colors.stone}>Activity</Eyebrow>
          <Text style={styles.title}>Friends</Text>
        </View>
        {events.map((event) => (
          <FeedItem key={event.id} event={event} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingBottom: 32 },
  header: {
    paddingHorizontal: Spacing.screenH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: 6,
  },
  title: { ...TextStyles.screenTitle, color: Colors.ink },
  item: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenH,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.sand,
  },
  itemBody: { flex: 1, gap: 6 },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: { fontFamily: Fonts.bodySemiBold, fontSize: 14, color: Colors.ink },
  time: { fontFamily: Fonts.body, fontSize: 12, color: Colors.stone },
  itemContent: { gap: 8 },
  itemHeader: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  itemAction: { fontFamily: Fonts.body, fontSize: 13, color: Colors.stone },
  itemTarget: { fontFamily: Fonts.bodyMedium, fontSize: 13, color: Colors.ink, flex: 1 },
  itemQuote: {
    fontFamily: Fonts.displayItalic,
    fontSize: 13,
    color: Colors.bodyMuted,
    lineHeight: 18,
  },
  itemImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    backgroundColor: Colors.sand,
  },
});
