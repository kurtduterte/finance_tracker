import { Text, type TextStyle, type StyleProp } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color'

type Props = {
  amount: number
  style?: StyleProp<TextStyle>
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = { sm: 14, md: 16, lg: 22, xl: 32 }

export function CurrencyText({ amount, style, size = 'md' }: Props) {
  const color = useThemeColor({}, 'text')
  const formatted = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(amount)

  return (
    <Text style={[{ color, fontSize: sizes[size], fontWeight: '600' }, style]}>
      {formatted}
    </Text>
  )
}
