import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Star,
  CalendarDots,
  UserPlus,
  Camera,
  GlobeHemisphereWest,
  CaretDown,
  CheckCircle,
} from 'phosphor-react-native';
import { Colors, Fonts, Spacing } from '../theme';
import type { Museum } from '../data/types';
import { useStore } from '../store';
import BottomSheet from './BottomSheet';

interface Props {
  visible: boolean;
  onClose: () => void;
  museum: Museum;
}

function todayLabel(): string {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export default function LogVisitSheet({ visible, onClose, museum }: Props) {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const [companion, setCompanion] = useState('');
  const addVisit = useStore((s) => s.addVisit);

  function handleSave() {
    if (rating === 0) return;
    addVisit({
      id: `v-${Date.now()}`,
      museumId: museum.id,
      userId: 'u0',
      date: todayISO(),
      rating,
      note: note.trim() || undefined,
      companion: companion.trim() || undefined,
    });
    setRating(0);
    setNote('');
    setCompanion('');
    onClose();
  }

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.content}>

        {/* Museum header */}
        <View style={styles.museumRow}>
          <Image source={{ uri: museum.thumbnail }} style={styles.thumb} resizeMode="cover" />
          <View style={styles.museumInfo}>
            <Text style={styles.eyebrow}>LOGGING VISIT</Text>
            <Text style={styles.museumName} numberOfLines={2}>{museum.name}</Text>
          </View>
        </View>

        {/* Star rating */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>How was it?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <TouchableOpacity key={n} onPress={() => setRating(n)} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                <Star
                  size={36}
                  weight={n <= rating ? 'fill' : 'thin'}
                  color={n <= rating ? Colors.gilt : '#D0C4B0'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date + companion row */}
        <View style={styles.metaRow}>
          <View style={styles.metaBox}>
            <CalendarDots size={18} weight="thin" color={Colors.oxblood} />
            <View>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{todayLabel()}</Text>
            </View>
          </View>

          <View style={styles.metaBox}>
            <UserPlus size={18} weight="thin" color={Colors.oxblood} />
            <View style={{ flex: 1 }}>
              <Text style={styles.metaLabel}>With</Text>
              <TextInput
                value={companion}
                onChangeText={setCompanion}
                placeholder="Add friends"
                placeholderTextColor={Colors.stone}
                style={styles.companionInput}
                returnKeyType="done"
              />
            </View>
          </View>
        </View>

        {/* Review note */}
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Share a note about your visit…"
          placeholderTextColor="#B8AE9E"
          multiline
          style={styles.noteInput}
          returnKeyType="done"
          blurOnSubmit
        />

        {/* Photo + privacy row */}
        <View style={styles.privacyRow}>
          <TouchableOpacity style={styles.cameraBtn}>
            <Camera size={20} weight="thin" color={Colors.stone} />
          </TouchableOpacity>
          <View style={styles.privacyInfo}>
            <GlobeHemisphereWest size={16} weight="thin" color={Colors.stone} />
            <Text style={styles.privacyText}>Shared with friends</Text>
          </View>
          <CaretDown size={11} weight="bold" color={Colors.muted} />
        </View>

        {/* Save CTA */}
        <TouchableOpacity
          style={[styles.saveBtn, rating === 0 && styles.saveBtnDisabled]}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <CheckCircle size={19} weight="fill" color="#fff" />
          <Text style={styles.saveBtnText}>Save to logbook</Text>
        </TouchableOpacity>

      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: 4,
    paddingBottom: 12,
  },
  museumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 22,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 11,
    backgroundColor: Colors.sand,
    flexShrink: 0,
  },
  museumInfo: { flex: 1 },
  eyebrow: {
    fontFamily: Fonts.mono,
    fontSize: 9,
    letterSpacing: 2.2,
    textTransform: 'uppercase' as const,
    color: Colors.oxblood,
  },
  museumName: {
    fontFamily: Fonts.display,
    fontSize: 19,
    lineHeight: 22,
    color: Colors.ink,
    marginTop: 4,
  },
  section: { marginBottom: 20 },
  sectionLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 0.4,
    color: Colors.bodyMuted,
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  metaBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0D8CA',
    borderRadius: 11,
    backgroundColor: Colors.card,
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  metaLabel: {
    fontFamily: Fonts.body,
    fontSize: 9,
    color: Colors.stone,
  },
  metaValue: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.ink,
    marginTop: 2,
  },
  companionInput: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.ink,
    padding: 0,
    marginTop: 2,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#E0D8CA',
    borderRadius: 11,
    backgroundColor: Colors.card,
    paddingHorizontal: 14,
    paddingTop: 13,
    paddingBottom: 13,
    height: 74,
    fontFamily: Fonts.displayItalic,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.ink,
    textAlignVertical: 'top',
    marginBottom: 14,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  cameraBtn: {
    width: 46,
    height: 46,
    borderWidth: 1.5,
    borderColor: '#D0C4B0',
    borderRadius: 11,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  privacyInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  privacyText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.stone,
  },
  saveBtn: {
    backgroundColor: Colors.oxblood,
    borderRadius: 13,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  saveBtnDisabled: {
    opacity: 0.45,
  },
  saveBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: '#fff',
  },
});
