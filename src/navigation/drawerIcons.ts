import type { IconName } from '@/components/IconButton';
import type { DrawerParamList } from '@/navigation/types';

/**
 * Icons for the drawer destinations.
 *
 * Kept in its own module so the drawer navigator and the custom drawer content
 * do not have to import each other.
 */
export const DRAWER_ICONS: Record<keyof DrawerParamList, IconName> = {
  Today: 'sunny-outline',
  Explore: 'compass-outline',
  Saved: 'bookmark-outline',
  Profile: 'person-outline',
  Settings: 'settings-outline',
  About: 'information-circle-outline',
};
