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
        android_ripple={{ color: '#ffffff33', borderless: true }}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', justifyContent: 'center', top: -20 },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: MD3Colors.fabDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
