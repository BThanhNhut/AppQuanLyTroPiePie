/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainNavigation from './src/navigations/MainNavigation';
import {SearchProvider} from './src/contexts/SearchContext';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {AuthProvider} from './src/contexts/AuthContext';
import {HomeProvider} from './src/contexts/HomeContext';

function App(): React.JSX.Element {
  return (
    <HomeProvider>
      <SearchProvider>
        <AuthProvider>
          <AlertNotificationRoot>
            <MainNavigation />
          </AlertNotificationRoot>
        </AuthProvider>
      </SearchProvider>
    </HomeProvider>
  );
}
export default App;
