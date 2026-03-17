import 'react-native-url-polyfill/auto'
import { useEffect } from 'react'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useSync } from '@/hooks/use-sync'
import { SyncSnackbar } from '@/components/sync-snackbar'
import { useAuthStore } from '@/store/auth-store'
import { MD3Colors } from '@/constants/theme'

const PurpleTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: MD3Colors.primary,
    background: MD3Colors.background,
    card: '#fff',
    text: MD3Colors.textPrimary,
    border: MD3Colors.outline,
  },
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { syncState } = useSync()
  const { session, loading, initialize } = useAuthStore()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = initialize()
    return unsubscribe
  }, [])

  useEffect(() => {
    if (loading) return

    const inAuth = segments[0] === '(auth)'

    if (!session && !inAuth) {
      router.replace('/(auth)/login')
    } else if (session && inAuth) {
      router.replace('/(tabs)')
    }
  }, [session, loading, segments])

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : PurpleTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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
