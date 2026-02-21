import { View, Text, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'
import { theme } from '../theme'

interface Props {
  lectures: number
  labs: number
  intensity: string
}

export default function MetricsCard({ lectures, labs, intensity }: Props) {
  return (
    <BlurView intensity={30} tint="light" style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Overview</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.label}>Lectures</Text>
          <Text style={styles.value}>{lectures}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.label}>Labs</Text>
          <Text style={styles.value}>{labs}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.label}>Intense</Text>
          <Text style={styles.value}>{intensity}</Text>
        </View>
      </View>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
})
