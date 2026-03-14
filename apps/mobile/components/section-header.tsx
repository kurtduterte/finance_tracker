import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color'
import { Spacing } from '@/constants/theme'

type Props = {
  title: string
  actionLabel?: string
  onAction?: () => void
}

export function SectionHeader({ title, actionLabel, onAction }: Props) {
  const color = useThemeColor({}, 'text')
  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color }]}>{title}</Text>
      {actionLabel && onAction && (
        <Pressable onPress={onAction}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  title: { fontSize: 18, fontWeight: '700' },
  action: { fontSize: 14, color: '#1976D2' },
})
