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
import { GearSix, Trophy } from 'phosphor-react-native';
import { Colors, Fonts, Spacing, TextStyles, Radii } from '../../src/theme';
import { currentUser } from '../../src/data/seed';
import { StatStrip, Eyebrow } from '../../src/components';

export default function ProfileScreen() {
  const { name, handle, avatar, bio, stats, badges } = currentUser;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Oxblood header */}
        <View style={styles.heroHeader}>
          <TouchableOpacity style={styles.settingsBtn}>
            <GearSix size={22} weight="thin" color={Colors.cream} />
          </TouchableOpacity>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.handle}>{handle}</Text>
          {bio && <Text style={styles.bio}>{bio}</Text>}
        </View>

        {/* Stats */}
        <StatStrip
          stats={[
            { value: stats.visited, label: 'Visited' },
            { value: stats.wishlist, label: 'Wishlist' },
            { value: stats.cities, label: 'Cities' },
          ]}
          style={styles.stats}
        />

        {/* Badges */}
        {badges.length > 0 && (
          <View style={styles.section}>
            <Eyebrow style={styles.sectionEyebrow}>Badges</Eyebrow>
            <View style={styles.badges}>
              {badges.map((badge) => (
                <View key={badge.id} style={styles.badge}>
                  <View style={styles.badgeIcon}>
                    <Trophy size={20} weight="fill" color={Colors.gilt} />
                  </View>
                  <Text style={styles.badgeLabel}>{badge.label}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingBottom: 40 },
  heroHeader: {
    backgroundColor: Colors.oxblood,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.screenH,
  },
  settingsBtn: {
    position: 'absolute',
    right: Spacing.screenH,
    top: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.oxbloodLight,
    borderWidth: 2,
    borderColor: 'rgba(248,244,237,0.3)',
    marginBottom: 4,
  },
  name: {
    fontFamily: Fonts.display,
    fontSize: 24,
    color: Colors.cream,
  },
  handle: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(248,244,237,0.65)',
  },
  bio: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(248,244,237,0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
  stats: {
    marginHorizontal: Spacing.screenH,
    marginTop: -16,
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#211C17',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  section: {
    paddingHorizontal: Spacing.screenH,
    marginTop: Spacing.xl,
  },
  sectionEyebrow: {
    marginBottom: Spacing.md,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  badge: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 6,
    minWidth: 90,
  },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(232,180,80,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: Colors.ink,
    textAlign: 'center',
  },
});
