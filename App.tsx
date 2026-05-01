import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingScreen from './Pages/LoadingScreen';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import SchedulePage from './Pages/Schedule';
import MapPage from './Pages/Map';
import AlertPage from './Pages/Report';
import ProfilePage from './Pages/Profile';
import GlobalStatusBar from './Components/GlobalStatusBar';
import BottomNavbar from './Components/BottomNavbar';
import Header from './Components/Header';

// Placeholder components for Profile screen
const PlaceholderScreen = ({ name }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20, color: '#1e7135', fontWeight: 'bold' }}>{name} Screen</Text>
  </View>
);

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Splash');

  const handleFinishLoading = () => setCurrentScreen('Login');
  const handleLogin = () => setCurrentScreen('Dashboard');
  const handleNavigate = (screen) => setCurrentScreen(screen);
  const handleLogout = () => setCurrentScreen('Login');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <LoadingScreen onFinish={handleFinishLoading} />;
      case 'Login':
        return <LoginPage onLogin={handleLogin} />;
      case 'Dashboard':
        return <Dashboard />;
      case 'Schedule':
        return <SchedulePage />;
      case 'Map':
        return <MapPage />;
      case 'Alerts':
        return <AlertPage />;
      case 'Profile':
        return <ProfilePage onLogout={handleLogout} />;
      default:
        return <View style={{ flex: 1, backgroundColor: 'white' }} />; // Fallback instead of null to avoid black screen
    }
  };

  const mainScreens = ['Dashboard', 'Schedule', 'Map', 'Alerts', 'Profile'];
  const showNavbar = mainScreens.includes(currentScreen);
  const showHeader = mainScreens.includes(currentScreen);

  // Map screen IDs to header titles
  const screenTitles = {
    'Dashboard': 'Dashboard',
    'Schedule': ' Schedule',
    'Map': ' Map',
    'Alerts': 'Report',
    'Profile': 'Profile',
  };

  return (
    <SafeAreaProvider>
      <View style={styles.appWrapper}>
        <View style={styles.topBarWrapper}>
          <GlobalStatusBar />
          {showHeader && <Header title={screenTitles[currentScreen] || 'OmniBins'} />}
        </View>

        <View style={styles.contentArea}>
          {renderScreen()}
        </View>

        {showNavbar && (
          <BottomNavbar
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  contentArea: {
    flex: 1,
  },
});

export default App;
