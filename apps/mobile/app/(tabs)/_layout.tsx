import { Tabs } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { HapticTab } from '@/components/haptic-tab'
import { AddTabButton } from '@/components/add-tab-button'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Colors } from '@/constants/theme'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const tint = Colors[colorScheme ?? 'light'].tint

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarButton: (props) => <AddTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
