import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItem,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { DRAWER_ICONS } from '@/navigation/drawerIcons';
import { useNavigationPattern } from '@/navigation/NavigationPatternContext';

/**
 * Custom drawer content.
 *
 * Instead of the default list of links, the drawer gets:
 *   • a branded header,
 *   • two labelled groups (primary destinations / more),
 *   • a footer with the temporary pattern switcher.
 */
export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation, state, descriptors } = props;
  const theme = useTheme();
  const { pattern, setPattern, switchable } = useNavigationPattern();

  const primaryRoutes = state.routes.slice(0, 4);
  const secondaryRoutes = state.routes.slice(4);

  const renderItem = (route: (typeof state.routes)[number], index: number) => {
    const isFocused = state.index === index;
    const { options } = descriptors[route.key];
    const label =
      typeof options.drawerLabel === 'string' ? options.drawerLabel : (options.title ?? route.name);

    const onPress = () => {
      // Tell the drawer that the item was pressed (it closes the drawer).
      const event = navigation.emit({
        type: 'drawerItemPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    return (
      <DrawerItem
        key={route.key}
        label={label}
        focused={isFocused}
        onPress={onPress}
        icon={({ color, size }) => (
          <Ionicons name={DRAWER_ICONS[route.name as keyof typeof DRAWER_ICONS]} size={size} color={color} />
        )}
        labelStyle={styles.itemLabel}
        style={styles.item}
        accessibilityLabel={`${label} section`}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundElement }]}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View style={[styles.logo, { backgroundColor: theme.primary }]}>
          <Ionicons name="trail-sign-outline" size={22} color="#FFFFFF" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.text }]}>Trailhead</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Navigation patterns</Text>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>PRIMARY</Text>
        {primaryRoutes.map(renderItem)}

        <Text style={[styles.sectionLabel, styles.sectionLabelSpaced, { color: theme.textSecondary }]}>
          MORE
        </Text>
        {secondaryRoutes.map((route, index) => renderItem(route, index + primaryRoutes.length))}
      </DrawerContentScrollView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <Text style={[styles.footerLabel, { color: theme.textSecondary }]}>Navigation pattern</Text>
        {switchable ? (
          <Pressable
            onPress={() => setPattern('tabs')}
            accessibilityRole="button"
            accessibilityLabel="Switch to bottom tab navigation"
            style={({ pressed }) => [
              styles.footerButton,
              {
                backgroundColor: theme.backgroundSelected,
                opacity: pressed ? 0.7 : 1,
              },
            ]}>
            <Ionicons name="grid-outline" size={18} color={theme.primary} />
            <Text style={[styles.footerText, { color: theme.text }]}>Switch to bottom tabs</Text>
          </Pressable>
        ) : null}
        <Text style={[styles.footerHint, { color: theme.textSecondary }]}>
          Currently using the {pattern === 'drawer' ? 'drawer menu' : 'bottom tab bar'}.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingTop: 56,
    paddingBottom: Spacing.four,
    paddingHorizontal: Spacing.four,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
  },
  scrollContent: {
    paddingTop: Spacing.three,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  sectionLabelSpaced: {
    marginTop: Spacing.three,
  },
  item: {
    paddingVertical: 2,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    padding: Spacing.four,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: Spacing.two,
  },
  footerLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: 12,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.md,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footerHint: {
    fontSize: 12,
  },
});
