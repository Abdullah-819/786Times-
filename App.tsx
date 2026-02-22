import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DashboardScreen from './src/screens/DashboardScreen'
import SectionSelectionScreen from './src/screens/SectionSelectionScreen'
import SlotViewingScreen from './src/screens/SlotViewingScreen'
import ScheduleScreen from './src/screens/ScheduleScreen'
import AddEventScreen from './src/screens/AddEventScreen'
import AnalyticsScreen from './src/screens/AnalyticsScreen'
import EventsListScreen from './src/screens/EventsListScreen'
import AboutScreen from './src/screens/AboutScreen'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { StyleSheet, Platform } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'android' ? Math.max(insets.bottom, 15) : insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            height: Platform.OS === 'ios' ? 88 : 70 + bottomPadding,
            paddingBottom: bottomPadding,
            backgroundColor: '#002E5D', // Professional CUI Navy
            borderTopColor: 'rgba(234, 179, 8, 0.2)', // Subtle Gold border
          }
        ],
        tabBarBackground: () => null,
        tabBarActiveTintColor: '#EAB308', // Spiritual Gold
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '900',
          marginBottom: Platform.OS === 'ios' ? 0 : 4,
          letterSpacing: 0.8,
          textTransform: 'uppercase'
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'Home') iconName = 'home-outline'
          else if (route.name === 'Schedule') iconName = 'calendar-outline'
          else if (route.name === 'Events') iconName = 'list-outline'
          else if (route.name === 'Analytics') iconName = 'stats-chart-outline'
          else if (route.name === 'About') iconName = 'person-outline'
          return <Ionicons name={iconName} size={22} color={color} />
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        initialParams={{ section: 'SP25-BSE-3-B' }} // Note: This will be dynamically updated by Dashboard navigation or storage
      />
      <Tab.Screen name="Events" component={EventsListScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null)

  useEffect(() => {
    AsyncStorage.getItem('@selected_section').then(val => {
      setInitialRoute(val ? 'Main' : 'SectionSelection')
    })
  }, [])

  if (!initialRoute) return null

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true
          }}
        >
          <Stack.Screen name="SectionSelection" component={SectionSelectionScreen} />
          <Stack.Screen name="SlotViewing" component={SlotViewingScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="AddEvent" component={AddEventScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    elevation: 8,
    backgroundColor: '#0F172A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  }
})