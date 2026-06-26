import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Heart, ChatCircle, Trophy, Check } from 'phosphor-react-native';
import { Colors, Fonts, Spacing } from '../src/theme';
import { notifications as seedNotifications, allUsers } from '../src/data/seed';

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 24) return hrs < 1 ? 'Just now' : `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? 'Yesterday' : `${days}d ago`;
}

const KIND_META: Record<string, { bg: string; Icon: any }> = {
  like: { bg: Colors.oxblood, Icon: Heart },
  comment: { bg: '#1B3066', Icon: ChatCircle },
  milestone: { bg: '#FBF1DC', Icon: Trophy },
  follow: { bg: Colors.oxblood, Icon: Check },
};

interface NotifRowProps {
  notif: typeof seedNotifications[0];
  isUnread: boolean;
  onRead: () => void;
}

function NotifRow({ notif, isUnread, onRead }: NotifRowProps) {
  const user = allUsers[notif.userId];
  const meta = KIND_META[notif.kind] ?? KIND_META.follow;
  const isMilestone = notif.kind === 'milestone';

  return (
    <TouchableOpacity
      style={[styles.row, isUnread && styles.rowUnread]}
      onPress={onRead}
      activeOpacity={0.8}
    >
      {isUnread && <View style={styles.unreadDot} />}

      <View style={styles.avatarWrap}>
        {isMilestone ? (
          <View style={[styles.avatar, styles.trophyAvatar]}>
            <Trophy size={20} weight="fill" color={Colors.gilt} />
          </View>
        ) : (
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        )}
        {!isMilestone && (
          <View style={[styles.badge, { backgroundColor: meta.bg }]}>
            <meta.Icon size={9} weight="fill" color="#fff" />
          </View>
        )}
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.notifText}>{notif.text}</Text>
        <Text style={styles.notifTime}>{timeAgo(notif.at)}</Text>
      </View>

      {notif.kind === 'follow' && isUnread && (
        <View style={styles.actionBtns}>
          <TouchableOpacity style={styles.acceptBtn} onPress={onRead}>
            <Text style={styles.acceptBtnText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineBtn}>
            <Text style={styles.declineBtnText}>×</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [readIds, setReadIds] = useState<Set<string>>(
    new Set(seedNotifications.filter((n) => n.read).map((n) => n.id))
  );

  const markRead = (id: string) => setReadIds((prev) => new Set([...prev, id]));
  const markAllRead = () => setReadIds(new Set(seedNotifications.map((n) => n.id)));

  const today = seedNotifications.filter(
    (n) => (Date.now() - new Date(n.at).getTime()) / 3600000 < 24
  );
  const earlier = seedNotifications.filter(
    (n) => (Date.now() - new Date(n.at).getTime()) / 3600000 >= 24
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ArrowLeft size={22} weight="thin" color={Colors.ink} />
          </TouchableOpacity>
          <Text style={styles.title}>Activity</Text>
        </View>
        <TouchableOpacity onPress={markAllRead} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {today.length > 0 && (
          <View>
            <Text style={styles.groupLabel}>Today</Text>
            {today.map((n) => (
              <NotifRow key={n.id} notif={n} isUnread={!readIds.has(n.id)} onRead={() => markRead(n.id)} />
            ))}
          </View>
        )}
        {earlier.length > 0 && (
          <View>
            <Text style={styles.groupLabel}>Earlier</Text>
            {earlier.map((n) => (
              <NotifRow key={n.id} notif={n} isUnread={!readIds.has(n.id)} onRead={() => markRead(n.id)} />
            ))}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenH, paddingTop: 12, paddingBottom: 14,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontFamily: Fonts.display, fontSize: 22, color: Colors.ink },
  markAllText: { fontFamily: Fonts.bodyMedium, fontSize: 11, color: Colors.oxblood },
  groupLabel: {
    fontFamily: Fonts.bodySemiBold, fontSize: 10, letterSpacing: 1.6,
    textTransform: 'uppercase' as const, color: '#B8AD9E',
    paddingHorizontal: Spacing.screenH, paddingBottom: 10, paddingTop: 4,
  },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 11,
    paddingVertical: 11, paddingHorizontal: Spacing.screenH, position: 'relative',
  },
  rowUnread: { backgroundColor: '#FBF6EE' },
  unreadDot: {
    position: 'absolute', left: 8,
    width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.oxblood,
  },
  avatarWrap: { position: 'relative', flexShrink: 0 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.sand },
  trophyAvatar: { backgroundColor: '#FBF1DC', alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute', bottom: -2, right: -2,
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#FBF6EE',
  },
  textBlock: { flex: 1 },
  notifText: { fontFamily: Fonts.body, fontSize: 13, lineHeight: 18, color: Colors.ink },
  notifTime: { fontFamily: Fonts.body, fontSize: 11, color: '#B8AD9E', marginTop: 2 },
  actionBtns: { flexDirection: 'row', gap: 6, flexShrink: 0 },
  acceptBtn: {
    backgroundColor: Colors.oxblood, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8,
  },
  acceptBtnText: { fontFamily: Fonts.bodySemiBold, fontSize: 11, color: '#fff' },
  declineBtn: {
    borderWidth: 1, borderColor: '#E0D8CA',
    paddingHorizontal: 11, paddingVertical: 6, borderRadius: 8,
  },
  declineBtnText: { fontFamily: Fonts.bodySemiBold, fontSize: 13, color: Colors.ink },
});
