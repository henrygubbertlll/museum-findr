# MuseumFindr — How to run it

## One-time setup (do this once)

1. Open **Terminal** (or Command Prompt / PowerShell on Windows)
2. Navigate to this folder:
   ```
   cd "C:\Users\henry\Downloads\MuseumFindr Brand Identity\design_handoff_museumfindr_app\Museum Findr"
   ```
3. Install packages:
   ```
   npm install
   ```
4. Install the Expo Go app on your iPhone or Android phone from the App Store / Play Store.

## Running the app

```
npx expo start
```

A QR code will appear. Scan it with:
- **iPhone**: Camera app
- **Android**: Expo Go app

The app will open on your phone. It hot-reloads — any code change shows up instantly.

## What's built so far

- ✅ Full design token system (colors, fonts, spacing, radii)
- ✅ Mock data layer (8 NYC museums, visits, feed, users)
- ✅ Shared component library (Button, Chip, HeroCard, MuseumListCard, VisitedCard, TabBar, StatStrip, StarRating, BottomSheet, Eyebrow, SectionHeader)
- ✅ Navigation shell: 5-tab bottom bar (Discover, Map, Saved, Friends, You)
- ✅ Discover screen — hero card, category chips, nearby list
- ✅ Museum Detail screen — hero, info, exhibits, "Log this visit" CTA
- ✅ Logbook/Saved screen — stats strip, visited cards, wishlist
- ✅ Friends Feed screen — activity timeline
- ✅ Profile screen — oxblood header, stats, badges

## Next up

- Log Visit bottom sheet (star rating + note)
- Search screen
- Map screen (react-native-maps)
- Collections & Guide screens
- Dark mode
