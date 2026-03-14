import { View, Text, Pressable, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useThemeColor } from '@/hooks/use-theme-color'
import { Spacing, MD3Colors } from '@/constants/theme'

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon, title, message, actionLabel, onAction }: Props) {
  const color = useThemeColor({}, 'text')
  return (
    <View style={styles.container}>
      <MaterialIcons name={icon} size={64} color={MD3Colors.outline} />
      <Text style={[styles.title, { color }]}>{title}</Text>
      <Text style={[styles.message, { color: MD3Colors.cash }]}>{message}</Text>
      {actionLabel && onAction && (
        <Pressable style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, padding: Spacing.xl },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  message: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  button: { marginTop: Spacing.sm, backgroundColor: MD3Colors.primary, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: 20 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
})
