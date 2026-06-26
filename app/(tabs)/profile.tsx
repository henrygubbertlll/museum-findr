import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  GearSix,
  Trophy,
  Medal,
  Globe,
  LockSimple,
} from 'phosphor-react-native';
import { Colors, Fonts, Shadows, Spacing, Radii } from '../../src/theme';
import { currentUser, visits, museumsById, friends } from '../../src/data/seed';
import { StatStrip } from '../../src/components';

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
    marginBottom: 12,
    marginTop: 18,
  },
  line: { flex: 1, height: 1, backgroundColor: '#E7DFD3' },
  label: {
    fontFamily: Fonts.displayItalic,
    fontSize: 13,
    color: Colors.ink,
    flexShrink: 1,
  },
});

function BadgeIcon({ icon, size }: { icon: string; size: number }) {
  if (icon === 'medal') return <Medal size={size} weight="fill" color="#C8923A" />;
  if (icon === 'globe') return <Globe size={size} weight="fill" color="#1B4D33" />;
  return <Trophy size={size} weight="fill" color={Colors.oxblood} />;
}

const BADGE_BG: Record<string, string> = {
  medal: '#FBF1DC',
  globe: '#EAEFE6',
  sparkle: '#F0E3DF',
};
const BADGE_BORDER: Record<string, string> = {
  medal: '#F0E0BC',
  globe: '#D6E0CE',
  sparkle: '#E5CFC9',
};

export default function ProfileScreen() {
  const { name, handle, avatar, stats, badges } = currentUser;
  const myVisits = visits.filter((v) => v.userId === currentUser.id).slice(0, 4);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        <View style={styles.heroHeader}>
          <TouchableOpacity style={styles.settingsBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <View style={styles.settingsCircle}>
              <GearSix size={18} weight="thin" color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={styles.avatarRow}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View style={styles.nameBlock}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.handle}>{handle} · New York</Text>
              <View style={styles.countsRow}>
                <View style={styles.countItem}>
                  <Text style={styles.countNum}>{friends.length + 139}</Text>
                  <Text style={styles.countLabel}>friends</Text>
                </View>
                <View style={styles.countItem}>
                  <Text style={styles.countNum}>{stats.visited}</Text>
                  <Text style={styles.countLabel}>visited</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <StatStrip
          stats={[
            { value: stats.visited, label: 'Museums' },
            { value: stats.cities, label: 'Cities' },
            { value: stats.visited * 4, label: 'Reviews' },
          ]}
          style={styles.stats}
        />

        <Divider label="Badges earned" />
        <View style={styles.badgesRow}>
          {badges.map((badge) => (
            <View key={badge.id} style={styles.badgeItem}>
              <View style={[
                styles.badgeCircle,
                {
                  backgroundColor: BADGE_BG[badge.icon] ?? '#F0E3DF',
                  borderColor: BADGE_BORDER[badge.icon] ?? '#E5CFC9',
                },
              ]}>
                <BadgeIcon icon={badge.icon} size={24} />
              </View>
              <Text style={styles.badgeLabel}>{badge.label}</Text>
            </View>
          ))}
          <View style={styles.badgeItem}>
            <View style={[styles.badgeCircle, styles.badgeLocked]}>
              <LockSimple size={22} weight="thin" color={Colors.muted} />
            </View>
            <Text style={[styles.badgeLabel, styles.badgeLabelLocked]}>Locked</Text>
          </View>
        </View>

        <Divider label="Recent visits" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentScroll}
        >
          {myVisits.map((visit) => {
            const museum = museumsById[visit.museumId];
            if (!museum) return null;
            return (
              <View key={visit.id} style={styles.recentCard}>
                <Image source={{ uri: museum.heroImage }} style={styles.recentThumb} resizeMode="cover" />
                <Text style={styles.recentName} numberOfLines={1}>{museum.name}</Text>
                <Text style={styles.recentDate}>
                  {new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingBottom: 40 },
  heroHeader: {
    backgroundColor: Colors.oxblood,
    paddingHorizontal: Spacing.screenH,
    paddingTop: 12,
    paddingBottom: 22,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  settingsBtn: { alignSelf: 'flex-end', marginBottom: 6 },
  settingsCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 2 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.oxbloodLight,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.85)',
    flexShrink: 0,
  },
  nameBlock: { flex: 1 },
  name: { fontFamily: Fonts.display, fontSize: 24, lineHeight: 26, color: '#fff' },
  handle: { fontFamily: Fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.70)', marginTop: 4 },
  countsRow: { flexDirection: 'row', gap: 14, marginTop: 9 },
  countItem: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  countNum: { fontFamily: Fonts.bodyBold, fontSize: 14, color: '#fff' },
  countLabel: { fontFamily: Fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.60)' },
  stats: {
    marginHorizontal: Spacing.screenH,
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  badgesRow: { flexDirection: 'row', paddingHorizontal: Spacing.screenH, gap: 10 },
  badgeItem: { flex: 1, alignItems: 'center', gap: 6 },
  badgeCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLocked: { backgroundColor: '#F3EEE6', borderColor: '#E5DDD0' },
  badgeLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 9,
    color: Colors.bodyMuted,
    textAlign: 'center',
    lineHeight: 12,
  },
  badgeLabelLocked: { color: Colors.muted },
  recentScroll: { paddingHorizontal: Spacing.screenH, gap: 10 },
  recentCard: { width: 104 },
  recentThumb: { width: 104, height: 80, borderRadius: 12, backgroundColor: Colors.sand },
  recentName: { fontFamily: Fonts.display, fontSize: 12, color: Colors.ink, marginTop: 6, lineHeight: 14 },
  recentDate: { fontFamily: Fonts.body, fontSize: 10, color: Colors.stone, marginTop: 3 },
});
