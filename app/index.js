/**
 * @format
 */

import {AppRegistry} from 'react-native';
import index from './src/index';
import {name as appName} from './app.json';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

AppRegistry.registerComponent(appName, () => index);
