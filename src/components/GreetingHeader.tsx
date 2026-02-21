import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'

interface Props {
  name: string
  message: string
}

export default function GreetingHeader({ name, message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, {name}</Text>
      <Text style={styles.subtitle}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
})