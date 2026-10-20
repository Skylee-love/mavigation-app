/**
 * Route maps for every navigator in the app.
 *
 * The important idea of this assignment: **the screens and the stacks are the
 * same in both patterns**. Only the shell around them changes:
 *
 *   Pattern 1 (bottom tabs)          Pattern 2 (drawer)
 *   ┌────────────────────┐           ┌────────────────────┐
 *   │ Tab.Navigator     │           │ Drawer.Navigator   │
 *   │  ├ Today  (stack) │           │  ├ Today  (stack)  │
 *   │  ├ Explore (stack)│           │  ├ Explore (stack) │
 *   │  ├ Saved  (stack) │           │  ├ Saved  (stack)  │
 *   │  └ Profile(stack) │           │  ├ Profile (stack) │
 *   └────────────────────┘           │  ├ Settings        │
 *                                    │  └ About           │
 *                                    └────────────────────┘
 */

export type TrailDetailParams = {
  trailId: string;
};

/** Stack that lives under the "Today" tab / drawer entry. */
export type TodayStackParamList = {
  TodayHome: undefined;
  TrailDetail: TrailDetailParams;
};

/** Stack that lives under the "Explore" tab / drawer entry. */
export type ExploreStackParamList = {
  ExploreList: undefined;
  TrailDetail: TrailDetailParams;
  Filters: undefined;
};

/** Stack that lives under the "Saved" tab / drawer entry. */
export type SavedStackParamList = {
  SavedList: undefined;
  TrailDetail: TrailDetailParams;
};

/** Stack that lives under the "Profile" tab / drawer entry. */
export type ProfileStackParamList = {
  ProfileHome: undefined;
  Settings: undefined;
  About: undefined;
};

/** Shared type for the trail detail screen, which is reused by three stacks. */
export type TrailDetailStackParamList = {
  TrailDetail: TrailDetailParams;
};

/** Pattern 1 — bottom tab navigator. */
export type TabParamList = {
  Today: undefined;
  Explore: undefined;
  Saved: undefined;
  Profile: undefined;
};

/** Pattern 2 — drawer navigator. */
export type DrawerParamList = {
  Today: undefined;
  Explore: undefined;
  Saved: undefined;
  Profile: undefined;
  Settings: undefined;
  About: undefined;
};

/**
 * Routes that exist in *both* shells.
 *
 * `navigate('Explore')` is dispatched on the navigation object of the current
 * stack; because the stack does not know that route, React Navigation bubbles
 * the action up to the tab/drawer navigator. That is what lets the very same
 * screen code work with either pattern.
 */
export type RootShellParamList = {
  Today: undefined;
  Explore: undefined;
  Saved: undefined;
  Profile: undefined;
  Settings: undefined;
  About: undefined;
};
