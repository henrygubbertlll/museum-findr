import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  CaretRight,
  MoonStars,
  Ruler,
  Bell,
  GlobeHemisphereWest,
  LockSimple,
  Question,
  SignOut,
} from 'phosphor-react-native';
import { Colors, Fonts, Spacing } from '../src/theme';

function SettingRow({
  icon,
  label,
  right,
  hasArrow = false,
  onPress,
  labelColor,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  right?: string;
  hasArrow?: boolean;
  onPress?: () => void;
  labelColor?: string;
  noBorder?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.row, noBorder && styles.rowNoBorder]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={[styles.rowLabel, labelColor ? { color: labelColor } : {}]}>{label}</Text>
      {right ? <Text style={styles.rowRight}>{right}</Text> : null}
      {hasArrow && <CaretRight size={12} weight="bold" color="#c0b09a" />}
    </TouchableOpacity>
  );
}

function ToggleRow({
  icon,
  label,
  value,
  onChange,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  noBorder?: boolean;
}) {
  return (
    <View style={[styles.row, noBorder && styles.rowNoBorder]}>
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#D8CDBC', true: Colors.oxblood }}
        thumbColor="#fff"
        ios_backgroundColor="#D8CDBC"
      />
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <ArrowLeft size={22} weight="thin" color={Colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Account card */}
        <TouchableOpacity style={styles.accountCard} activeOpacity={0.85}>
          <View style={styles.accountAvatar} />
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>Eleanor Vance</Text>
            <Text style={styles.accountHandle}>@eleanorv · Edit profile</Text>
          </View>
          <CaretRight size={13} weight="bold" color="#c0b09a" />
        </TouchableOpacity>

        {/* Preferences */}
        <Text style={styles.groupLabel}>Preferences</Text>
        <View style={styles.card}>
          <ToggleRow
            icon={<MoonStars size={20} weight="thin" color={Colors.oxblood} />}
            label="Dark mode"
            value={darkMode}
            onChange={setDarkMode}
          />
          <SettingRow
            icon={<Ruler size={20} weight="thin" color={Colors.oxblood} />}
            label="Distance units"
            right="Miles"
            hasArrow
          />
          <ToggleRow
            icon={<Bell size={20} weight="thin" color={Colors.oxblood} />}
            label="Push notifications"
            value={pushNotifs}
            onChange={setPushNotifs}
            noBorder
          />
        </View>

        {/* Privacy */}
        <Text style={styles.groupLabel}>Privacy</Text>
        <View style={styles.card}>
          <SettingRow
            icon={<GlobeHemisphereWest size={20} weight="thin" color={Colors.oxblood} />}
            label="Default visit privacy"
            right="Friends"
            hasArrow
          />
          <SettingRow
            icon={<LockSimple size={20} weight="thin" color={Colors.oxblood} />}
            label="Blocked accounts"
            hasArrow
            noBorder
          />
        </View>

        {/* Support */}
        <Text style={styles.groupLabel}>Support</Text>
        <View style={styles.card}>
          <SettingRow
            icon={<Question size={20} weight="thin" color={Colors.oxblood} />}
            label="Help center"
            hasArrow
          />
          <SettingRow
            icon={<SignOut size={20} weight="thin" color={Colors.oxblood} />}
            label="Log out"
            labelColor={Colors.oxblood}
            noBorder
          />
        </View>

        <Text style={styles.version}>MuseumFindr v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.screenH,
    paddingTop: 12,
    paddingBottom: 14,
  },
  headerTitle: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: Colors.ink,
  },
  content: {
    paddingHorizontal: Spacing.screenH,
    paddingBottom: 40,
  },

  // Account card
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 18,
  },
  accountAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#D8C9B4',
    flexShrink: 0,
  },
  accountInfo: { flex: 1 },
  accountName: {
    fontFamily: Fonts.display,
    fontSize: 18,
    color: Colors.ink,
    lineHeight: 20,
  },
  accountHandle: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: '#8A8073',
    marginTop: 3,
  },

  // Groups
  groupLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
    color: '#b8ad9e',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 13,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1EBE0',
  },
  rowNoBorder: {
    borderBottomWidth: 0,
  },
  rowIcon: {
    width: 22,
    alignItems: 'center',
  },
  rowLabel: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.ink,
  },
  rowRight: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#8A8073',
  },

  version: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    color: '#c0b09a',
    textAlign: 'center',
    marginTop: 8,
  },
});
