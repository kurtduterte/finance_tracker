import { Pressable, StyleSheet, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { MD3Colors, Shadow } from '@/constants/theme'

export function AddTabButton({ onPress }: BottomTabBarButtonProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={[styles.fab, Shadow.fab]}
        onPress={onPress}
        android_ripple={{ color: MD3Colors.primaryContainer, borderless: true }}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', justifyContent: 'center', top: -16 },
  fab: { width: 56, height: 56, borderRadius: 28, backgroundColor: MD3Colors.primary, alignItems: 'center', justifyContent: 'center' },
})
