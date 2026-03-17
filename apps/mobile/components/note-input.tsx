import { View, TextInput, Text, StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color'
import { MD3Colors, BorderRadius, Spacing } from '@/constants/theme'

type Props = {
  value?: string
  onChange: (v: string) => void
}

const MAX = 200

export function NoteInput({ value = '', onChange }: Props) {
  const bg = useThemeColor({}, 'background')
  const color = useThemeColor({}, 'text')

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor: '#fff', color, borderColor: MD3Colors.outline }]}
        value={value}
        onChangeText={(t) => onChange(t.slice(0, MAX))}
        placeholder="Note (optional)"
        placeholderTextColor={MD3Colors.cash}
        multiline
        numberOfLines={3}
        maxLength={MAX}
      />
      <Text style={styles.counter}>{value.length}/{MAX}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.md },
  input: { borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.sm, fontSize: 14, minHeight: 80, textAlignVertical: 'top' },
  counter: { alignSelf: 'flex-end', fontSize: 11, color: MD3Colors.cash, marginTop: 2 },
})
