import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Colors, Fonts, TextStyles, Spacing } from '../../src/theme';
import { Eyebrow } from '../../src/components';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Eyebrow mono color={Colors.stone}>Explore</Eyebrow>
        <Text style={styles.title}>Map</Text>
      </View>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Map coming soon</Text>
        <Text style={styles.placeholderSub}>
          Will use react-native-maps with a warm custom style
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: {
    paddingHorizontal: Spacing.screenH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: 6,
  },
  title: { ...TextStyles.screenTitle, color: Colors.ink },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  placeholderText: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: Colors.stone,
  },
  placeholderSub: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
