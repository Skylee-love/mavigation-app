import { registerRootComponent } from 'expo';

import App from './src/App';

/**
 * Entry point.
 *
 * `registerRootComponent` calls `AppRegistry.registerComponent('main', () => App)`
 * and makes sure the environment is set up correctly for both Expo Go and
 * standalone builds.
 */
registerRootComponent(App);
