import { StyleSheet, View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useAuthStore } from '@/store/auth-store'
import { MD3Colors, Spacing, BorderRadius, Shadow } from '@/constants/theme'

type MenuItemProps = {
  icon: keyof typeof MaterialIcons.glyphMap
  label: string
  onPress?: () => void
  danger?: boolean
}

function MenuItem({ icon, label, onPress, danger }: MenuItemProps) {
  return (
    <Pressable style={[styles.menuItem, Shadow.card]} onPress={onPress}>
      <View style={[styles.menuIcon, { backgroundColor: danger ? '#FFEBEE' : MD3Colors.primaryContainer }]}>
        <MaterialIcons name={icon} size={20} color={danger ? '#D32F2F' : MD3Colors.primary} />
      </View>
      <Text style={[styles.menuLabel, { color: danger ? '#D32F2F' : MD3Colors.textPrimary }]}>
        {label}
      </Text>
      {!danger && <MaterialIcons name="chevron-right" size={20} color={MD3Colors.textSecondary} />}
    </Pressable>
  )
}

export default function AccountScreen() {
  const { user, signOut } = useAuthStore()

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'ME'

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.title}>Account</Text>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.email}>{user?.email ?? 'Not signed in'}</Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuItem icon="person-outline" label="Edit Profile" />
        <MenuItem icon="notifications-none" label="Notifications" />
        <MenuItem icon="security" label="Privacy & Security" />
        <MenuItem icon="help-outline" label="Help & Support" />
        <MenuItem icon="logout" label="Sign Out" onPress={signOut} danger />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: MD3Colors.background },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: MD3Colors.textPrimary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  avatarSection: { alignItems: 'center', paddingVertical: Spacing.lg },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: MD3Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '800' },
  email: { fontSize: 14, color: MD3Colors.textSecondary, fontWeight: '500' },
  menu: { paddingHorizontal: Spacing.md, gap: Spacing.sm },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600' },
})
