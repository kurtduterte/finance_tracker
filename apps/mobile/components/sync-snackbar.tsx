import { useEffect, useRef } from 'react'
import { Animated, Text, StyleSheet } from 'react-native'
import type { SyncState } from '@/hooks/use-sync'
import { MD3Colors } from '@/constants/theme'

const messages: Record<SyncState, string | null> = {
  idle: null,
  syncing: 'Syncing...',
  success: 'All synced ✓',
  error: 'Sync failed — will retry',
}

const bgColors: Record<SyncState, string> = {
  idle: 'transparent',
  syncing: MD3Colors.primary,
  success: MD3Colors.secondary,
  error: MD3Colors.error,
}

export function SyncSnackbar({ state }: { state: SyncState }) {
  const translateY = useRef(new Animated.Value(80)).current

  useEffect(() => {
    if (state === 'idle') {
      Animated.timing(translateY, { toValue: 80, duration: 200, useNativeDriver: true }).start()
    } else {
      Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }).start()
    }
  }, [state, translateY])

  const message = messages[state]
  if (!message) return null

  return (
    <Animated.View
      style={[styles.bar, { backgroundColor: bgColors[state], transform: [{ translateY }] }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bar: { position: 'absolute', bottom: 80, left: 16, right: 16, borderRadius: 8, padding: 12, alignItems: 'center' },
  text: { color: '#fff', fontWeight: '600', fontSize: 14 },
})
