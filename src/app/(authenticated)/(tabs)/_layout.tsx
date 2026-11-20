import { Tabs } from "expo-router";
import { Home, UserRound } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#4F46E5',
      tabBarInactiveTintColor: '#94A3B8',
      tabBarStyle: { height: 66, paddingTop: 8, paddingBottom: 8, borderTopColor: '#E2E8F0' },
      tabBarLabelStyle: { fontWeight: '600', fontSize: 11 },
    }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} /> }} />
    </Tabs>
  );
}
