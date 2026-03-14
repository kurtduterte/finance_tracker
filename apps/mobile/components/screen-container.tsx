import { SafeAreaView, ScrollView, View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color'
import { Spacing } from '@/constants/theme'

type Props = {
  children: React.ReactNode
  scrollable?: boolean
  style?: StyleProp<ViewStyle>
}

export function ScreenContainer({ children, scrollable = false, style }: Props) {
  const bg = useThemeColor({}, 'background')

  if (scrollable) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.content, style]}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: bg }]}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { flex: 1, padding: Spacing.md },
})
