import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Share,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Trophy, ShareNetwork, X, Medal, Star, Compass } from 'phosphor-react-native';
import { Colors, Fonts } from '../src/theme';

const { width, height } = Dimensions.get('window');

// Static badge data — in a real app this would come from the store
const BADGES: Record<string, {
  title: string;
  description: string;
  icon: 'trophy' | 'medal' | 'star' | 'compass';
  current: number;
  total: number;
  nextTitle: string;
}> = {
  explorer: {
    title: 'The Explorer',
    description: "You've visited 20 museums. Your curiosity is officially unstoppable.",
    icon: 'trophy',
    current: 20,
    total: 50,
    nextTitle: 'The Curator',
  },
  curator: {
    title: 'The Curator',
    description: "50 museums. You don't just visit culture — you collect it.",
    icon: 'medal',
    current: 50,
    total: 100,
    nextTitle: 'The Connoisseur',
  },
  firstvisit: {
    title: 'First Stamp',
    description: 'Your passport is open. The journey of a thousand galleries begins.',
    icon: 'compass',
    current: 1,
    total: 5,
    nextTitle: 'The Regular',
  },
  regular: {
    title: 'The Regular',
    description: "Five museums visited. You're building a habit worth keeping.",
    icon: 'star',
    current: 5,
    total: 20,
    nextTitle: 'The Explorer',
  },
};

function BadgeIcon({ type, size }: { type: string; size: number }) {
  const iconProps = { size, color: '#5C1F1B', weight: 'fill' as const };
  switch (type) {
    case 'medal':   return <Medal {...iconProps} />;
    case 'star':    return <Star {...iconProps} />;
    case 'compass': return <Compass {...iconProps} />;
    default:        return <Trophy {...iconProps} />;
  }
}

export default function AchievementScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const badgeId = (params.id as string) ?? 'explorer';
  const badge = BADGES[badgeId] ?? BADGES.explorer;

  // Entrance animations
  const scale   = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, tension: 80, friction: 7, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 80, friction: 9, useNativeDriver: true }),
    ]).start();
  }, []);

  const progress = Math.min(badge.current / badge.total, 1);

  const handleShare = () => {
    Share.share({
      message: `I just earned "${badge.title}" on MuseumFindr — ${badge.current} museums visited! 🏛️`,
    });
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={['#9A3C35', '#7C2D28', '#5C1F1B']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Gilt glow orb */}
      <View style={styles.glowOrb} />

      {/* Confetti dots */}
      <View style={[styles.confetti, { left: '18%', top: '14%', width: 7, height: 7, borderRadius: 2, backgroundColor: Colors.gilt, transform: [{ rotate: '20deg' }] }]} />
      <View style={[styles.confetti, { right: '16%', top: '18%', width: 6, height: 6, borderRadius: 3, backgroundColor: '#F4D9A0' }]} />
      <View style={[styles.confetti, { left: '24%', top: '26%', width: 5, height: 5, borderRadius: 2.5, backgroundColor: '#fff', opacity: 0.7 }]} />
      <View style={[styles.confetti, { right: '22%', top: '32%', width: 8, height: 8, borderRadius: 2, backgroundColor: Colors.gilt, transform: [{ rotate: '-15deg' }] }]} />
      <View style={[styles.confetti, { left: '12%', top: '44%', width: 6, height: 6, borderRadius: 3, backgroundColor: '#F4D9A0', opacity: 0.8 }]} />
      <View style={[styles.confetti, { right: '18%', top: '50%', width: 5, height: 5, borderRadius: 2, backgroundColor: '#fff', opacity: 0.5, transform: [{ rotate: '30deg' }] }]} />
      <View style={[styles.confetti, { left: '30%', top: '60%', width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.gilt, opacity: 0.6 }]} />
      <View style={[styles.confetti, { right: '28%', top: '65%', width: 4, height: 4, borderRadius: 2, backgroundColor: '#F4D9A0', opacity: 0.7 }]} />

      {/* Close button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <X size={16} weight="bold" color="#fff" />
      </TouchableOpacity>

      {/* Main content */}
      <Animated.View style={[styles.content, { opacity }]}>
        {/* Medallion */}
        <Animated.View style={[styles.medallionWrap, { transform: [{ scale }] }]}>
          <View style={styles.medallion}>
            <View style={styles.medallionInner}>
              <BadgeIcon type={badge.icon} size={58} />
            </View>
          </View>
        </Animated.View>

        {/* Labels */}
        <Animated.View style={{ transform: [{ translateY: slideUp }], alignItems: 'center' }}>
          <Text style={styles.eyebrow}>Achievement unlocked</Text>
          <Text style={styles.title}>{badge.title}</Text>
          <Text style={styles.description}>{badge.description}</Text>

          {/* Progress to next */}
          <View style={styles.progressWrap}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Next: {badge.nextTitle}</Text>
              <Text style={styles.progressLabel}>{badge.current} / {badge.total}</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          </View>
        </Animated.View>
      </Animated.View>

      {/* CTAs */}
      <Animated.View style={[styles.ctas, { opacity }]}>
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.85}>
          <ShareNetwork size={18} weight="bold" color={Colors.oxblood} />
          <Text style={styles.shareBtnText}>Share achievement</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        >
          <Text style={styles.viewAllText}>View all badges</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C1F1B',
  },

  glowOrb: {
    position: 'absolute',
    left: '50%',
    top: '30%',
    marginLeft: -120,
    marginTop: -120,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'transparent',
    // Simulate glow with a large semi-transparent gilt circle
    shadowColor: Colors.gilt,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 80,
  },

  confetti: {
    position: 'absolute',
  },

  closeBtn: {
    position: 'absolute',
    top: 56,
    right: 20,
    zIndex: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
  },

  // Medallion
  medallionWrap: {
    marginBottom: 30,
  },
  medallion: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.gilt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: Colors.gilt,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.45,
    shadowRadius: 32,
    elevation: 12,
  },
  medallionInner: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: 'rgba(92,31,27,0.35)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text
  eyebrow: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.gilt,
    marginBottom: 14,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 34,
    lineHeight: 36,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.78)',
    textAlign: 'center',
    maxWidth: 240,
    marginBottom: 26,
  },

  // Progress
  progressWrap: {
    width: '100%',
    maxWidth: 240,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  progressLabel: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gilt,
    borderRadius: 3,
  },

  // CTAs
  ctas: {
    paddingHorizontal: 26,
    paddingBottom: 40,
    gap: 10,
    alignItems: 'center',
  },
  shareBtn: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 13,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  shareBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.oxblood,
  },
  viewAllText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    paddingVertical: 6,
  },
});
