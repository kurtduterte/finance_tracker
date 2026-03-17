import { View, TextInput, Text, StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color'
import { MD3Colors, Spacing, BorderRadius } from '@/constants/theme'

type Props = {
  value: string
  onChange: (v: string) => void
  error?: string
}

export function AmountInput({ value, onChange, error }: Props) {
  const bg = useThemeColor({}, 'background')
  const color = useThemeColor({}, 'text')

  return (
    <View style={styles.container}>
      <View style={[styles.row, { backgroundColor: '#fff', borderColor: error ? MD3Colors.error : MD3Colors.outline }]}>
        <Text style={[styles.prefix, { color: MD3Colors.primary }]}>₱</Text>
        <TextInput
          style={[styles.input, { color }]}
          value={value}
          onChangeText={onChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={MD3Colors.cash}
          returnKeyType="done"
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, height: 56 },
  prefix: { fontSize: 24, fontWeight: '700', marginRight: Spacing.xs },
  input: { flex: 1, fontSize: 28, fontWeight: '700' },
  error: { color: MD3Colors.error, fontSize: 12, marginTop: 4 },
})
