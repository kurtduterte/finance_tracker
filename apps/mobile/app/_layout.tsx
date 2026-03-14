import 'react-native-url-polyfill/auto'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useSync } from '@/hooks/use-sync'
import { SyncSnackbar } from '@/components/sync-snackbar'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { syncState } = useSync()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="expense/[id]"
          options={{ presentation: 'modal', title: 'Edit Expense', headerShown: true }}
        />
      </Stack>
      <SyncSnackbar state={syncState} />
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
