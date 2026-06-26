import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  MagnifyingGlass,
  SlidersHorizontal,
  BuildingColumns,
  MapPin,
  Check,
  Crosshair,
  BookmarkSimple,
  CheckCircle,
  NavigationArrow,
  Star,
} from 'phosphor-react-native';
import { Colors, Fonts, Spacing } from '../../src/theme';
import { museums } from '../../src/data/seed';

const { width: W, height: H } = Dimensions.get('window');

type ChipLabel = 'All' | 'Art' | 'History' | 'Free' | 'Open';
const CHIPS: ChipLabel[] = ['All', 'Art', 'History', 'Free', 'Open'];

// Pin layout matching mockup
const PINS = [
  { id: 'm3', left: '52%' as const, top: '36%' as const, kind: 'selected' as const },
  { id: 'm1', left: '30%' as const, top: '25%' as const, kind: 'unvisited' as const },
  { id: 'm4', left: '68%' as const, top: '48%' as const, kind: 'unvisited' as const },
  { id: 'm2', left: '74%' as const, top: '28%' as const, kind: 'visited' as const },
];

const CLUSTER = { left: '20%' as const, top: '55%' as const, count: 5 };

export default function MapScreen() {
  const router = useRouter();
  const [activeChip, setActiveChip] = useState<ChipLabel>('All');
  const [selectedId, setSelectedId] = useState<string | null>('m3');

  const selectedMuseum = museums.find((m) => m.id === selectedId) ?? null;

  function handlePinPress(id: string) {
    setSelectedId(id === selectedId ? null : id);
  }

  return (
    <View style={styles.root}>

      {/* WARM MAP BACKGROUND */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={[styles.hRoad, { top: '28%', height: 6 }]} />
        <View style={[styles.hRoad, { top: '44%', height: 3 }]} />
        <View style={[styles.hRoad, { top: '58%', height: 6 }]} />
        <View style={[styles.hRoad, { top: '72%', height: 3 }]} />
        <View style={[styles.vRoad, { left: '22%', width: 6 }]} />
        <View style={[styles.vRoad, { left: '40%', width: 3 }]} />
        <View style={[styles.vRoad, { left: '62%', width: 6 }]} />
        <View style={[styles.vRoad, { left: '78%', width: 3 }]} />
        <View style={styles.park} />
        <View style={styles.water} />
      </View>

      {/* MUSEUM PINS */}
      {PINS.map((pin) => {
        const museum = museums.find((m) => m.id === pin.id);
        const isSelected = selectedId === pin.id;

        if (pin.kind === 'selected' || (pin.kind === 'unvisited' && isSelected)) {
          return (
            <TouchableOpacity
              key={pin.id}
              style={[styles.pinAnchor, { left: pin.left, top: pin.top }]}
              onPress={() => handlePinPress(pin.id)}
              activeOpacity={0.85}
            >
              <View style={styles.selectedPill}>
                <MapPin size={12} weight="fill" color="#fff" />
                <Text style={styles.selectedPillText} numberOfLines={1}>
                  {museum?.name.split(' ').slice(-1)[0] ?? 'Museum'}
                </Text>
              </View>
              <View style={styles.pillTip} />
            </TouchableOpacity>
          );
        }

        if (pin.kind === 'visited') {
          return (
            <TouchableOpacity
              key={pin.id}
              style={[styles.pinAnchor, { left: pin.left, top: pin.top }]}
              onPress={() => handlePinPress(pin.id)}
              activeOpacity={0.85}
            >
              <View style={styles.visitedPin}>
                <Check size={14} weight="fill" color={Colors.ink} />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={pin.id}
            style={[styles.pinAnchor, { left: pin.left, top: pin.top }]}
            onPress={() => handlePinPress(pin.id)}
            activeOpacity={0.85}
          >
            <View style={[styles.unvisitedPin, isSelected && styles.unvisitedPinActive]}>
              <BuildingColumns size={15} weight="thin" color={Colors.ink} />
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Cluster pin */}
      <TouchableOpacity
        style={[styles.pinAnchor, { left: CLUSTER.left, top: CLUSTERtop }]}
        onPress={() => setSelectedId-null)}
        activeOpacity={0.85}
      >
        <View style={styles.clusterPin}>
          <Text style={styles.clusterText}>{CLUSTER.count}</Text>
        </View>
      </TouchableOpacity>

      {/* User location dot */}
      <View style={[styles.pinAnchor, { left: '56%', top: '52%' }]} pointerEvents="none">
        <View style={styles.userHalo} />
        <View style={styles.userDot} />
      </View>

      {/* RECENTER BUTTOL€
 #•!>=
      <TouchableOpacity style={styles.recenterBtn} activeOpacity={0.85}>
        <Crosshair size={18} weight="thin" color={Colors.ink} />
      </TouchableOpacity>

      {/* FLOATING SEARCH + CHIPS */}
      <SafeAreaView style={styles.topOverlay} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push('/search' as any)}
          activeOpacity={0.9}
        >
          <MagnifyingGlass size={18} weight="thin" color="#8A8073" />
          <Text style={styles.searchPlaceholder}>Search museums...</Text>
          <View style={styles.filterIconWrap}>
            <SlidersHorizontal size={14} weight="thin" color={Colors.ink} />
          </View>
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
          style={styles.chipsRow}
          pointerEvents="box-none"
        >
          {CHIPS.map((chip) => (
            <TouchableOpacity
              key={chip}
              style={[styles.chip, activeChip === chip && styles.chipSelected]}
              onPress={() => setActiveChip(chip)}
              activeOpacity={0.85}
            >
              <Text style={[styles.chipText, activeChip === chip && styles.chipTextSelected]}>
                {chip}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* PEEK CARD */}
      {selectedMuseum && (
        <View style={styles.peekCard}>
          <View style={styles.peekInner}>
            <View style={styles.peekTop}>
              <Image
                source={{ uri: selectedMuseum.thumbnail }}
                style={styles.peekThumb}
                resizeMode="cover"
              />
              <View style={styles.peekInfo}>
                <Text style={styles.peekName} numberOfLines={2}>
                  {selectedMuseum.name}
                </Text>
                <View style={styles.peekMeta}>
                  <Star size={11} weight="fill" color={Colors.gilt} />
                  <Text style={styles.peekRating}>{selectedMuseum.rating}</Text>
                  <View style={styles.metaDot} />
                  <Text style={styles.peekDist}>{selectedMuseum.distanceMi} mi</Text>
                  <View style={styles.metaDot} />
                  <Text style={styles.peekOpen}>Open</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.bookmarkBtn}>
                <BookmarkSimple size={15} weight="thin" color={Colors.ink} />
              </TouchableOpacity>
            </View>
            <View style={styles.peekActions}>
              <TouchableOpacity
                style={styles.logBtn}
                onPress={() => router.push(('/museum/' + selectedMuseum.id) as any)}
                activeOpacity={0.85}
              >
                <CheckCircle size={16} weight="thin" color="#fff" />
                <Text style={styles.logBtnText}>Log visit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dirBtn} activeOpacity={0.85}>
                <NavigationArrow size={16} weight="thin" color={Colors.ink} />
                <Text style={styles.dirBtnText}>Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EDE6DA',
  },
  hRoad: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#F5F0E8',
  },
  vRoad: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#F5F0E8',
  },
  park: {
    position: 'absolute',
    left: '42%',
    right: '20%',
    top: '30%',
    bottom: '44%',
    backgroundColor: 'rgba(180,200,160,0.35)',
    borderRadius: 4,
  },
  water: {
    position: 'absolute',
    left: 0,
    right: '60%',
    top: '62%',
    bottom: 0,
    backgroundColor: 'rgba(160,190,210,0.25)',
  },
  pinAnchor: {
    position: 'absolute',
    zIndex: 25,
    alignItems: 'center',
  },
  selectedPill: {
    backgroundColor: Colors.oxblood,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    shadowColor: Colors.oxblood,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.42,
    shadowRadius: 14,
    elevation: 6,
  },
  selectedPillText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    color: '#fff',
  },
  pillTip: {
    width: 8,
    height: 8,
    backgroundColor: Colors.oxblood,
    transform: [{ rotate: '45deg' }],
    marginTop: -4,
    borderRadius: 1,
  },
  unvisitedPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E0D8CA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  unvisitedPinActive: {
    borderColor: Colors.oxblood,
  },
  visitedPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gilt,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.gilt,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  clusterPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#211c17',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  clusterText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 12,
    color: '#fff',
  },
  userHalo: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(27,48,102,0.12)',
    top: -8,
    left: -8,
  },
  userDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1B3066',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#1B3066',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  recenterBtn: {
    position: 'absolute',
    right: 14,
    bottom: 190,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 30,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  searchBar: {
    marginHorizontal: 14,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 5,
  },
  searchPlaceholder: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#b8ae9e',
    flex: 1,
  },
  filterIconWrap: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#E0D8CA',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  chipsRow: {
    marginTop: 10,
  },
  chips: {
    paddingHorizontal: 14,
    gap: 7,
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  chipSelected: {
    backgroundColor: Colors.oxblood,
    shadowColor: Colors.oxblood,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  chipText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    color: '#3d3126',
  },
  chipTextSelected: {
    color: '#fff',
  },
  peekCard: {
    position: 'absolute',
    bottom: 68,
    left: 0,
    right: 0,
    zIndex: 40,
  },
  peekInner: {
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 8,
  },
  peekTop: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    paddingBottom: 0,
    alignItems: 'center',
  },
  peekThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: Colors.sand,
    flexShrink: 0,
  },
  peekInfo: {
    flex: 1,
    minWidth: 0,
  },
  peekName: {
    fontFamily: Fonts.display,
    fontSize: 18,
    lineHeight: 21,
    color: '#211c17',
  },
  peekMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 5,
  },
  peekRating: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: '#211c17',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#d8cdb9',
  },
  peekDist: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: '#8A8073',
  },
  peekOpen: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: '#3aa066',
  },
  bookmarkBtn: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#E0D8CA',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  peekActions: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    paddingTop: 12,
    paddingBottom: 14,
  },
  logBtn: {
    flex: 1,
    backgroundColor: Colors.oxblood,
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  logBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: '#fff',
  },
  dirBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0D8CA',
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  dirBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: '#211c17',
  },
});
