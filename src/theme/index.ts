// MuseumFindr — Atelier design system tokens
// All values from README.md — do not edit freehand; trace back to README

export const Colors = {
  // Brand
  oxblood: '#7C2D28',
  oxbloodDeep: '#5C1F1B',
  oxbloodLight: '#9A3C35',

  // Text
  ink: '#211C17',
  stone: '#8A8073',
  muted: '#B8AE9E',
  bodyMuted: '#56524B',
  bodyMutedAlt: '#6F6A61',

  // Accents
  gilt: '#E8B450',       // star ratings + achievements ONLY
  openGreen: '#3AA066',  // "Open now" ONLY

  // Surfaces
  cream: '#F8F4ED',      // app canvas / screen background
  card: '#FFFFFF',       // elevated cards
  sand: '#EFE8DB',       // unselected chip backgrounds

  // Borders
  border: '#ECE3D4',
  borderStrong: '#E0D8CA',

  // Dark theme surfaces (warm, not pure black)
  darkCanvas: '#1A1612',
  darkCard: '#231E19',
  darkClay: '#C4614A',       // oxblood lifted for dark bg
  darkText: '#F4EFE6',
  darkTextSecondary: '#A59B8F',
  darkEyebrow: '#7A7068',
} as const;

export const Fonts = {
  display: 'CormorantGaramond-Medium',           // Cormorant 500
  displaySemiBold: 'CormorantGaramond-SemiBold', // Cormorant 600
  displayItalic: 'CormorantGaramond-MediumItalic',
  body: 'WorkSans-Regular',       // 400
  bodyMedium: 'WorkSans-Medium',  // 500
  bodySemiBold: 'WorkSans-SemiBold', // 600
  bodyBold: 'WorkSans-Bold',      // 700
  mono: 'SpaceMono-Regular',
} as const;

// Type scale from README
export const TextStyles = {
  screenTitle: {
    fontFamily: Fonts.display,
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: -0.32, // -0.01em at 32px
  },
  museumName: {
    fontFamily: Fonts.display,
    fontSize: 22,
    lineHeight: 22,
  },
  cardTitle: {
    fontFamily: Fonts.display,
    fontSize: 16,
    lineHeight: 16,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: 14,
    lineHeight: 21, // 1.5
  },
  buttonLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    lineHeight: 14,
  },
  metadata: {
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 16,
  },
  eyebrow: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    lineHeight: 10,
    letterSpacing: 2, // 0.2em at 10px
    textTransform: 'uppercase' as const,
  },
  monoEyebrow: {
    fontFamily: Fonts.mono,
    fontSize: 10,
    lineHeight: 10,
    letterSpacing: 2.2,
    textTransform: 'uppercase' as const,
  },
  reviewQuote: {
    fontFamily: Fonts.displayItalic,
    fontSize: 14,
    lineHeight: 20,
  },
} as const;

export const Radii = {
  card: 14,
  button: 12,
  chip: 8,
  pill: 999,
  bottomSheet: 26,
  thumbnail: 8,
} as const;

export const Shadows = {
  card: {
    shadowColor: '#211C17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
} as const;

export const Spacing = {
  screenH: 20,  // horizontal screen inset
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const HitSlop = { top: 8, bottom: 8, left: 8, right: 8 } as const;

export const TAB_BAR_HEIGHT = 64;
