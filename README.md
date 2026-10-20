# Trailhead — two navigation patterns, one app

**Mobile UX assignment** · Expo (SDK 58) · React Native 0.88 · React Navigation 7 · TypeScript

Trailhead is a trail-guide app that exists to answer one question: *how does the
navigation structure change the way an app feels?* The exact same screens are
mounted inside two different shells — a **bottom tab bar** and a **drawer /
hamburger menu** — so the only variable in the comparison is the navigation
structure itself.

| Pattern 1 — Bottom tabs                | Pattern 2 — Drawer / hamburger             |
| -------------------------------------- | ----------------------------------------- |
| `createBottomTabNavigator`             | `createDrawerNavigator`                    |
| 4 destinations, always visible         | 6 destinations, behind a menu button       |
| 1 tap to switch                        | 2 taps to switch (menu → destination)      |
| Thumb-reachable                        | Edge swipe or hamburger button            |
| ~5 destinations max                    | Scales to dozens of destinations           |

---

## Running the app

```bash
npm install
npm start          # then press "a" (Android), "i" (iOS) or "w" (web)
```

Other scripts:

```bash
npm run lint       # eslint (expo config)
npm run typecheck  # tsc --noEmit
```

Dependencies used by the navigation layer:

| Package                        | Why                                                        |
| ------------------------------ | ---------------------------------------------------------- |
| `@react-navigation/native`     | `NavigationContainer`, linking, theming                     |
| `@react-navigation/bottom-tabs`| Pattern 1                                                   |
| `@react-navigation/drawer`     | Pattern 2                                                   |
| `@react-navigation/native-stack` | Stacks that live inside both shells                      |
| `react-native-screens`         | Native screen primitives for the stacks                     |
| `react-native-gesture-handler` | Drawer swipe gesture                                        |
| `react-native-reanimated`      | Drawer open/close animation                                 |
| `react-native-safe-area-context` | Safe area insets for headers, tab bar and drawer           |

> **Note on Expo Router:** the starter template shipped with Expo Router. This
> assignment requires the React Navigation navigators directly
> (`createBottomTabNavigator` / `createDrawerNavigator`), so the Expo Router
> scaffold was removed and the app now boots from `index.tsx` → `src/App.tsx`.

---

## Demonstrating both patterns

### Option A — runtime switcher (used by default)

Every screen header carries a **⇄ switcher button** (top right). One tap swaps
the whole shell, so both patterns can be compared on a single device without a
reload. The same control also appears on:

- **Profile → Navigation pattern** (two-way chooser)
- **Settings → Navigation** (two-way chooser)
- **Drawer footer** ("Switch to bottom tabs")

### Option B — structural switch

The navigators are structurally separated, so the root export can be swapped in
one line. In `src/App.tsx`:

```tsx
import { DrawerRoot, TabsRoot } from '@/navigation/rootShells';

// <SwitchableRoot />  → runtime switcher (default)
export default function App() {
  return <TabsRoot />; // ← or <DrawerRoot />
}
```

`src/navigation/rootShells.tsx` exports two complete, self-contained roots
(`TabsRoot`, `DrawerRoot`). When a single pattern is mounted structurally the
switcher UI hides itself, so the app never promises a switch it cannot perform.

To change the pattern the app boots with, edit one constant:

```ts
// src/navigation/NavigationPatternContext.tsx
export const DEFAULT_NAVIGATION_PATTERN: NavigationPattern = 'tabs';
```

---

## Project structure

```
index.tsx                     Entry point (registerRootComponent)
src/
  App.tsx                     Providers + NavigationContainer
  navigation/
    types.ts                  Route maps for every navigator
    RootNavigator.tsx         Renders the selected shell
    TabNavigator.tsx          ── PATTERN 1: bottom tabs
    DrawerNavigator.tsx       ── PATTERN 2: drawer / hamburger
    CustomDrawerContent.tsx   Branded drawer with groups + switcher
    stacks.tsx                The stacks shared by BOTH patterns
    NavigationPatternContext.tsx  Which pattern is active / switchable
    navigationTheme.ts        Design tokens → React Navigation theme
    rootShells.tsx            TabsRoot / DrawerRoot (structural switch)
    useRootNavigation.ts      Navigation prop that reaches the shell
  screens/                    Today, Explore, TrailDetail, Saved,
                              Profile, Settings, Filters, About
  components/                 TrailCard, PatternChooser, IconButton, …
  state/                      SavedTrailsContext, FiltersContext
  data/trails.ts              Static demo content
  constants/theme.ts          Colours, spacing, radii
```

---

## How the two patterns share one codebase

The interesting part of this project is that **no screen knows which pattern it
is running in**.

```
Pattern 1 (tabs)                       Pattern 2 (drawer)
┌──────────────────────────┐           ┌──────────────────────────┐
│ Tab.Navigator             │           │ Drawer.Navigator          │
│  ├ Today   → TodayStack   │           │  ├ Today   → TodayStack   │
│  ├ Explore → ExploreStack │           │  ├ Explore → ExploreStack │
│  ├ Saved   → SavedStack   │           │  ├ Saved   → SavedStack   │
│  └ Profile → ProfileStack │           │  ├ Profile → ProfileStack │
└──────────────────────────┘           │  ├ Settings → SettingsLeaf│
                                       │  └ About    → AboutLeaf   │
                                       └──────────────────────────┘
```

`src/navigation/stacks.tsx` defines the four stacks once; both navigators mount
them. The screens are completely pattern-agnostic.

### One screen, two destinations

The Today screen has a "See all" link that must reach *Explore*. In tab mode
that means switching tabs, in drawer mode it means opening a different drawer
entry — but the code is identical:

```ts
const rootNavigation = useRootNavigation();
rootNavigation.navigate('Explore');
```

`useRootNavigation()` returns the navigation object of the current stack. The
stack does not know a route called `Explore`, so React Navigation bubbles the
action up to the parent navigator — the tab bar in one case, the drawer in the
other. The same call therefore works in both shells.

### Chrome follows the shell, not the screen

The header of a stack root screen shows a **hamburger button** only when the
drawer is mounted. That is decided by `NavigationShellProvider`, which each
navigator declares:

```tsx
// DrawerNavigator.tsx
<NavigationShellProvider shell="drawer"> … </NavigationShellProvider>

// TabNavigator.tsx
<NavigationShellProvider shell="tabs"> … </NavigationShellProvider>
```

`MenuButton` reads that context and renders nothing in the tab build, so the
UI never shows a hamburger that cannot open anything.

---

## Ergonomics — what actually changes

| Aspect                | Bottom tabs                                   | Drawer                                        |
| --------------------- | --------------------------------------------- | --------------------------------------------- |
| Taps to switch        | 1                                             | 2 (menu → destination)                        |
| Visibility            | All destinations permanently visible          | Destinations hidden until the menu is opened   |
| Thumb reach           | Tab bar sits in the thumb zone                | Menu button sits in the top-left corner       |
| Screen real estate    | Tab bar permanently occupies ~64 pt           | Content area is completely free               |
| Capacity              | Comfortable up to ~5 destinations              | Scales to dozens of destinations               |
| Secondary destinations | Cluttered the bar                             | Natural home for Settings / About             |
| Gesture               | Tap the tab                                   | Swipe from the screen edge                    |
| Context switching     | Feels continuous (bar always there)           | Feels like a discrete mode change             |

The drawer therefore wins on *scale and hierarchy* (it keeps Settings and About
out of the primary bar), while the tab bar wins on *speed and reach* for a
small set of peer destinations. The `About` screen in the app contains the same
comparison in-app, which makes it easy to point at during the demo.

---

## Notes / scope

- The assignment explicitly excludes state persistence, so the saved-trail list
  and the filters live in plain React contexts (`src/state/`) and reset when
  the app restarts.
- Content is static (`src/data/trails.ts`) so the demo runs completely offline.
- Light and dark mode are both supported through `useTheme()`.
- The temporary switcher is intentionally isolated in
  `src/components/PatternSwitchButton.tsx` and
  `src/components/PatternChooser.tsx`, so it can be deleted in one pass before
  shipping.
