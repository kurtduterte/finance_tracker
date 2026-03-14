import { View, Text, Pressable, StyleSheet } from 'react-native'
import dayjs from 'dayjs'
import { MD3Colors, BorderRadius, Spacing } from '@/constants/theme'
import { useThemeColor } from '@/hooks/use-theme-color'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type Props = {
  value: string   // YYYY-MM-DD
  onChange: (date: string) => void
  error?: string
}

export function DateField({ value, onChange, error }: Props) {
  const color = useThemeColor({}, 'text')
  const formatted = dayjs(value).format('ddd, MMM D YYYY')

  // For Expo Go compatibility we use a simple date selector
  // In a dev build, replace with @react-native-community/datetimepicker
  const adjustDate = (delta: number) => {
    const newDate = dayjs(value).add(delta, 'day').format('YYYY-MM-DD')
    onChange(newDate)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.row, { borderColor: error ? MD3Colors.error : MD3Colors.outline }]}>
        <Pressable onPress={() => adjustDate(-1)} style={styles.arrow}>
          <MaterialIcons name="chevron-left" size={24} color={MD3Colors.primary} />
        </Pressable>
        <Text style={[styles.date, { color }]}>{formatted}</Text>
        <Pressable onPress={() => adjustDate(1)} style={styles.arrow}>
          <MaterialIcons name="chevron-right" size={24} color={MD3Colors.primary} />
        </Pressable>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: BorderRadius.md, height: 52 },
  arrow: { padding: Spacing.sm },
  date: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '500' },
  error: { color: MD3Colors.error, fontSize: 12, marginTop: 4 },
})
