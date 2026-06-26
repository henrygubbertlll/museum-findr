import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors, Fonts } from '../src/theme';

const { height } = Dimensions.get('window');

const SLIDES = [
  {
    headline: 'Every museum\nworth visiting.',
    sub: "Discover the world's galleries, art collections, and cultural landmarks.",
  },
  {
    headline: 'Build your\ncultural passport.',
    sub: 'Log every visit, earn badges, and track your journey across cities.',
  },
  {
    headline: 'Better\ntogether.',
    sub: "Follow friends, swap recommendations, and see where they've been.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const isLast = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  function handleNext() {
    if (!isLast) setStep(step + 1);
  }

  function handleEnter() {
    router.replace('/(tabs)' as any);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Dark gallery background gradient */}
      <LinearGradient
        colors={['#1a1008', '#2c1810', '#0e0a05']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      />
      {/* Warm oxblood radial hint */}
      <LinearGradient
        colors={['rgba(124,45,40,0.40)', 'transparent']}
        style={[StyleSheet.absoluteFillObject, { height: height * 0.55 }]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <SafeAreaView style={styles.safe}>
        {/* Logo row + Skip */}
        <View style={styles.topRow}>
          <View style={styles.logoRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoLetter}>M</Text>
            </View>
            <Text style={styles.logoName}>MuseumFindr</Text>
          </View>
          <TouchableOpacity
            onPress={handleEnter}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Headline + subtitle */}
        <View style={styles.content}>
          <Text style={styles.headline}>{slide.headline}</Text>
          <Text style={styles.sub}>{slide.sub}</Text>
        </View>

        {/* Dots + CTAs */}
        <View style={styles.bottom}>
          <View style={styles.dots}>
            {SLIDES.map((_, i) => (
              <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
            ))}
          </View>

          {isLast ? (
            <>
              <TouchableOpacity
                style={styles.appleBtn}
                onPress={handleEnter}
                activeOpacity={0.85}
              >
                <Text style={styles.appleBtnText}>Continue with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.emailBtn}
                onPress={handleEnter}
                activeOpacity={0.85}
              >
                <Text style={styles.emailBtnText}>Sign up with email</Text>
              </TouchableOpacity>

              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 24, right: 24 }}
                onPress={handleEnter}
              >
                <Text style={styles.loginText}>
                  Already a member?{' '}
                  <Text style={styles.loginLink}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={handleNext}
              activeOpacity={0.85}
            >
              <Text style={styles.nextBtnText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0a05' },
  safe: { flex: 1, paddingHorizontal: 28 },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 8,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: Colors.oxblood,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontFamily: Fonts.display,
    fontSize: 18,
    color: '#fff',
    lineHeight: 22,
  },
  logoName: {
    fontFamily: Fonts.display,
    fontSize: 20,
    color: '#fff',
    letterSpacing: 0.2,
  },
  skipText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
  },

  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 52,
  },
  headline: {
    fontFamily: Fonts.display,
    fontSize: 52,
    color: '#fff',
    lineHeight: 56,
    letterSpacing: -0.3,
    marginBottom: 18,
  },
  sub: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 22,
    maxWidth: 300,
  },

  bottom: {
    paddingBottom: 14,
    gap: 12,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  dotActive: {
    width: 22,
    backgroundColor: Colors.gilt,
  },

  nextBtn: {
    width: '100%',
    backgroundColor: Colors.oxblood,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 15,
    color: '#fff',
  },

  appleBtn: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.11)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  appleBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 15,
    color: '#fff',
  },
  emailBtn: {
    width: '100%',
    backgroundColor: Colors.oxblood,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  emailBtnText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 15,
    color: '#fff',
  },
  loginText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.52)',
    marginTop: 4,
    paddingVertical: 4,
  },
  loginLink: {
    fontFamily: Fonts.bodySemiBold,
    color: Colors.gilt,
  },
});
