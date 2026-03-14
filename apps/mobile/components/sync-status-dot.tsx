import { View, StyleSheet } from 'react-native'
import type { SyncStatus } from '@/domain/types'
import { MD3Colors } from '@/constants/theme'

const statusColor: Record<SyncStatus, string> = {
  pending: MD3Colors.warning,
  synced: MD3Colors.secondary,
  failed: MD3Colors.error,
}

export function SyncStatusDot({ status }: { status: SyncStatus }) {
  return (
    <View style={[styles.dot, { backgroundColor: statusColor[status] }]} />
  )
}

const styles = StyleSheet.create({
  dot: { width: 8, height: 8, borderRadius: 4 },
})
