import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Heart,
  ChatCircle,
  DotsThree,
  UserPlus,
  Trophy,
  Star,
} from 'phosphor-react-native';
import { Colors, Fonts, Shadows, Spacing, TextStyles } from '../../src/theme';
import { getFeed } from '../../src/data/repository';
import type { FeedEvent } from '../../src/data/types';
import { allUsers, museumsById, collections } from '../../src/data/seed';
import { Eyebrow } from '../../src/components';

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'yesterday';
  return `${days}d ago`;
}

// -- Visit card --
function VisitCard({ event }: { event: Extract<FeedEvent, { kind: 'visit' }> }) {
  const user = allUsers[event.userId];
  const museum = museumsById[event.museumId];
  if (!user || !museum) return null;

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.actorInfo}>
          <Text style={styles.actorName}>{user.name}</Text>
          <Text style={styles.actorSub}>visited a museum · {timeAgo(event.at)}</Text>
        </View>
        <DotsThree size={18} weight="bold" color={Colors.stone} />
      </View>

      <View style={styles.imageStrip}>
        <Image source={{ uri: museum.heroImage }} style={StyleSheet.absoluteFillObject as any} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(10,8,5,0.62)']}
          style={StyleSheet.absoluteFillObject as any}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
        />
        <Text style={styles.stripName} numberOfLines={1}>{museum.name}</Text>
        <View style={styles.stripRating}>
          <Star size={11} weight="fill" color={Colors.gilt} />
          <Text style={styles.stripRatingText}>{museum.rating.toFixed(1)}</Text>
        </View>
      </View>

      {event.note ? (
        <Text style={styles.quote}>"{event.note}"</Text>
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Heart size={15} weight="thin" color={Colors.stone} />
          <Text style={styles.actionCount}>12</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <ChatCircle size={15} weight="thin" color={Colors.stone} />
          <Text style={styles.actionCount}>3</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.wishlistPill}>
          <Text style={styles.wishlistPillText}>Add to wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// -- Collection card --
function CollectionCard({ event }: { event: Extract<FeedEvent, { kind: 'collection' }> }) {
  const user = allUsers[event.userId];
  const col = collections.find((c) => c.id === event.collectionId);
  if (!user || !col) return null;

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.actorInfo}>
          <Text style={styles.actorName}>{user.name}</Text>
          <Text style={styles.actorSub}>saved to collection · {timeAgo(event.at)}</Text>
        </View>
        <DotsThree size={18} weight="bold" color={Colors.stone} />
      </View>

      <View style={styles.colRow}>
        <Image source={{ uri: col.cover }} style={styles.colThumb} resizeMode="cover" />
        <View style={styles.colInfo}>
          <Text style={styles.colTitle} numberOfLines={1}>{col.title}</Text>
          <Text style={styles.colSub}>{event.count} museums · Curated</Text>
        </View>
        <TouchableOpacity style={styles.joinBtn}>
          <Text style={styles.joinBtnText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// -- Milestone card --
function MilestoneCard({ event }: { event: Extract<FeedEvent, { kind: 'milestone' }> }) {
  const user = allUsers[event.userId];
  if (!user) return null;

  return (
    <LinearGradient
      colors={['#7C2D28', '#9A3C35']}
      style={[styles.card, styles.milestoneCard]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.cardTop}>
        <Image source={{ uri: user.avatar }} style={[styles.avatar, styles.avatarWhiteBorder]} />
        <View style={styles.actorInfo}>
          <Text style={[styles.actorName, styles.textWhite]}>{user.name}</Text>
          <Text style={[styles.actorSub, styles.textWhiteMuted]}>
            reached a milestone · {timeAgo(event.at)}
          </Text>
        </View>
        <Trophy size={20} weight="fill" color={Colors.gilt} />
      </View>

      <View style={styles.milestoneBody}>
        <Text style={styles.milestoneTitle}>{user.stats.visited} museums visited!</Text>
        <Text style={styles.milestoneSub}>A well-stamped passport. Keep exploring.</Text>
      </View>
    </LinearGradient>
  );
}

function FeedCard({ event }: { event: FeedEvent }) {
  if (event.kind === 'visit') return <VisitCard event={event} />;
  if (event.kind === 'collection') return <CollectionCard event={event} />;
  if (event.kind === 'milestone') return <MilestoneCard event={event} />;
  return null;
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
          <View>
            <Eyebrow mono color={Colors.stone}>Feed</Eyebrow>
            <Text style={styles.title}>Friends</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <UserPlus size={16} weight="thin" color={Colors.ink} />
          </TouchableOpacity>
        </View>

        {events.map((event) => (
          <FeedCard key={event.id} event={event} />
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
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
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginHorizontal: Spacing.screenH,
    marginBottom: 12,
    overflow: 'hidden',
    ...Shadows.card,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.sand,
    flexShrink: 0,
  },
  avatarWhiteBorder: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.75)',
  },
  actorInfo: { flex: 1 },
  actorName: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.ink,
    lineHeight: 16,
  },
  actorSub: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.stone,
    marginTop: 2,
  },
  textWhite: { color: '#fff' },
  textWhiteMuted: { color: 'rgba(255,255,255,0.65)' },

  imageStrip: {
    height: 110,
    position: 'relative',
    backgroundColor: Colors.sand,
  },
  stripName: {
    position: 'absolute',
    bottom: 9,
    left: 12,
    right: 64,
    fontFamily: Fonts.display,
    fontSize: 17,
    color: '#fff',
    lineHeight: 20,
  },
  stripRating: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  stripRatingText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: '#fff',
  },

  quote: {
    fontFamily: Fonts.displayItalic,
    fontSize: 13,
    color: Colors.bodyMuted,
    lineHeight: 18,
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 14,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionCount: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.stone,
  },
  wishlistPill: {
    backgroundColor: '#F0E3DF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  wishlistPillText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    color: Colors.oxblood,
  },

  colRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  colThumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: Colors.sand,
    flexShrink: 0,
  },
  colInfo: { flex: 1 },
  colTitle: {
    fontFamily: Fonts.display,
    fontSize: 15,
    color: Colors.ink,
    lineHeight: 18,
  },
  colSub: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.stone,
    marginTop: 3,
  },
  joinBtn: {
    backgroundColor: '#F0E3DF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  joinBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.oxblood,
  },

  milestoneCard: {
    backgroundColor: 'transparent',
  },
  milestoneBody: {
    paddingHorizontal: 14,
    paddingBottom: 16,
    paddingTop: 2,
  },
  milestoneTitle: {
    fontFamily: Fonts.display,
    fontSize: 18,
    color: '#fff',
    lineHeight: 22,
  },
  milestoneSub: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.72)',
    marginTop: 4,
  },
});
