import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  ShareNetwork,
  CalendarBlank,
  Ticket,
  MapPinLine,
  CaretRight,
  BookmarkSimple,
} from 'phosphor-react-native';
import { Colors, Fonts, Spacing } from '../../src/theme';
import { museums } from '../../src/data/seed';

const HERO_H = 248;

// Build a flat exhibit→museum lookup from seed data
const exhibitMap: Record<string, { exhibit: (typeof museums)[0]['exhibits'][0]; museum: (typeof museums)[0] }> = {};
museums.forEach((m) => {
  m.exhibits.forEach((e) => {
    exhibitMap[e.id] = { exhibit: e, museum: m };
  });
});

// Mock gallery images (3 extra thumbs reusing exhibit image)
function galleryImages(imageUrl: string) {
  return [imageUrl, imageUrl + '?v=2', imageUrl + '?v=3'];
}

export default function ExhibitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const entry = exhibitMap[id as string] ?? Object.values(exhibitMap)[0];
  const { exhibit, museum } = entry;

  const gallery = galleryImages(exhibit.image);
  const GALLERY_EXTRA = 24;

  // Determine if ticketed (non-permanent = add-on)
  const isPermanent = exhibit.dates === 'Permanent';

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Hero */}
        <View style={styles.hero}>
          <Image source={{ uri: exhibit.image }} style={StyleSheet.absoluteFillObject as any} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(10,7,4,0.4)', 'rgba(10,7,4,0)', 'rgba(10,7,4,0.9)']}
            locations={[0, 0.32, 1]}
            style={StyleSheet.absoluteFillObject as any}
          />

          {/* Nav row */}
          <View style={styles.nav}>
            <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
              <ArrowLeft size={15} weight="bold" color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBtn}>
              <ShareNetwork size={17} weight="thin" color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Hero bottom */}
          <View style={styles.heroBottom}>
            {!isPermanent && (
              <View style={styles.onViewPill}>
                <View style={styles.onViewDot} />
                <Text style={styles.onViewText}>On view now</Text>
              </View>
            )}
            <Text style={styles.heroTitle}>{exhibit.title}</Text>
          </View>
        </View>

        {/* Meta row */}
        <View style={styles.metaRow}>
          <View style={[styles.metaCell, styles.metaCellBorder]}>
            <CalendarBlank size={18} weight="thin" color={Colors.oxblood} />
            <Text style={styles.metaLabel}>Through</Text>
            <Text style={styles.metaValue}>{isPermanent ? 'Permanent' : exhibit.dates.replace('Through ', '')}</Text>
          </View>
          <View style={[styles.metaCell, styles.metaCellBorder]}>
            <Ticket size={18} weight="thin" color={Colors.oxblood} />
            <Text style={styles.metaLabel}>{isPermanent ? 'Included' : '+$8'}</Text>
            <Text style={styles.metaValue}>{isPermanent ? 'With entry' : 'Add-on'}</Text>
          </View>
          <View style={styles.metaCell}>
            <MapPinLine size={18} weight="thin" color={Colors.oxblood} />
            <Text style={styles.metaLabel}>Floor 2</Text>
            <Text style={styles.metaValue}>Gallery 1</Text>
          </View>
        </View>

        {/* At the museum */}
        <TouchableOpacity
          style={styles.museumRow}
          activeOpacity={0.85}
          onPress={() => router.push(`/museum/${museum.id}` as any)}
        >
          <Image source={{ uri: museum.thumbnail }} style={styles.museumThumb} resizeMode="cover" />
          <View style={styles.museumInfo}>
            <Text style={styles.museumAtLabel}>At</Text>
            <Text style={styles.museumName}>{museum.name}</Text>
          </View>
          <CaretRight size={12} weight="bold" color="#c0b09a" />
        </TouchableOpacity>

        {/* About */}
        <View style={styles.about}>
          <Text style={styles.aboutTitle}>About the exhibit</Text>
          <Text style={styles.aboutBody}>{exhibit.blurb}</Text>
        </View>

        {/* Gallery strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryStrip}
          style={styles.galleryScroll}
        >
          {gallery.map((uri, i) => {
            const isLast = i === gallery.length - 1;
            return (
              <View key={i} style={styles.galleryThumb}>
                <Image source={{ uri }} style={StyleSheet.absoluteFillObject as any} resizeMode="cover" />
                {isLast && (
                  <View style={styles.galleryMore}>
                    <Text style={styles.galleryMoreText}>+{GALLERY_EXTRA}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.cta}>
        <TouchableOpacity style={styles.ticketBtn} activeOpacity={0.88}>
          <Text style={styles.ticketBtnText}>Get tickets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookmarkBtn}>
          <BookmarkSimple size={21} weight="thin" color={Colors.ink} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingBottom: 40 },

  hero: {
    height: HERO_H,
    backgroundColor: Colors.sand,
    position: 'relative',
  },
  nav: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenH,
    zIndex: 10,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBottom: {
    position: 'absolute',
    bottom: 16,
    left: 18,
    right: 18,
    zIndex: 10,
  },
  onViewPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.oxblood,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  onViewDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.gilt,
  },
  onViewText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    letterSpacing: 1.0,
    textTransform: 'uppercase' as const,
    color: '#fff',
  },
  heroTitle: {
    fontFamily: Fonts.display,
    fontSize: 28,
    lineHeight: 29,
    color: '#fff',
  },

  // Meta row
  metaRow: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#EBE2D3',
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: Colors.card,
  },
  metaCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 4,
  },
  metaCellBorder: {
    borderRightWidth: 1,
    borderRightColor: '#EBE2D3',
  },
  metaLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    color: Colors.ink,
  },
  metaValue: {
    fontFamily: Fonts.body,
    fontSize: 10,
    color: Colors.stone,
  },

  // Museum row
  museumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 18,
    marginTop: 16,
    padding: 10,
    backgroundColor: Colors.card,
    borderRadius: 12,
    shadowColor: '#211c17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  museumThumb: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: Colors.sand,
    flexShrink: 0,
  },
  museumInfo: { flex: 1 },
  museumAtLabel: {
    fontFamily: Fonts.body,
    fontSize: 10,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
    color: '#b8ad9e',
  },
  museumName: {
    fontFamily: Fonts.display,
    fontSize: 15,
    lineHeight: 18,
    color: Colors.ink,
    marginTop: 3,
  },

  // About
  about: {
    paddingHorizontal: Spacing.screenH,
    paddingTop: 16,
  },
  aboutTitle: {
    fontFamily: Fonts.display,
    fontSize: 18,
    color: Colors.ink,
    marginBottom: 8,
  },
  aboutBody: {
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 20.8,
    color: '#56524b',
  },

  // Gallery
  galleryScroll: {
    marginTop: 16,
  },
  galleryStrip: {
    paddingHorizontal: Spacing.screenH,
    gap: 8,
    flexDirection: 'row',
  },
  galleryThumb: {
    width: 84,
    height: 84,
    borderRadius: 11,
    overflow: 'hidden',
    backgroundColor: Colors.sand,
    position: 'relative',
  },
  galleryMore: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,15,11,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  } as any,
  galleryMoreText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: '#fff',
  },

  // Sticky CTA
  cta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: '#ECE3D4',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 28,
    flexDirection: 'row',
    gap: 10,
  },
  ticketBtn: {
    flex: 1,
    backgroundColor: Colors.oxblood,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: '#fff',
  },
  bookmarkBtn: {
    width: 50,
    borderWidth: 1,
    borderColor: '#E0D8CA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
