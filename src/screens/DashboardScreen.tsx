import { View, StyleSheet, ScrollView, Text, Alert, TouchableOpacity } from 'react-native'
import { useState, useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import MetricsCard from '../components/MetricsCard'
import TimelineBar from '../components/TimelineBar'
import ActionButton from '../components/ActionButton'
import StatusBadge from '../components/StatusBadge'
import { useTodaySchedule } from '../hooks/useTodaySchedule'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BlurView } from 'expo-blur'
import { getRandomQuote, getRandomDhikr } from '../data/quotes'
import { Section, SECTIONS } from '../data/timetable'
import { Quote } from '../data/quotes'

export default function DashboardScreen({ navigation }: any) {
  const insets = useSafeAreaInsets()
  const { todayLectures, metrics } = useTodaySchedule()
  const quote = useMemo(() => getRandomQuote(), [])
  const [dhikrCount, setDhikrCount] = useState(0)
  const dhikr = useMemo(() => getRandomDhikr(), [])

  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  const intensityMessage = useMemo(() => {
    switch (metrics.intensity) {
      case 'High': return 'very busy'
      case 'Moderate': return 'moderately busy'
      default: return 'relaxed'
    }
  }, [metrics.intensity])

  const handleChangeSection = () => {
    Alert.alert(
      "App Control",
      "Manage your academic experience",
      [
        { text: "Add New Event", onPress: () => navigation.navigate('AddEvent') },
        {
          text: "Switch Section",
          onPress: async () => {
            await AsyncStorage.removeItem('@selected_section');
            navigation.replace('SectionSelection');
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    )
  }

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={theme.colors.gradients.professional}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Area */}
        <View style={styles.headerArea}>
          <View style={styles.headerTop}>
            <Text style={styles.dayText}>{dayName}</Text>
            <TouchableOpacity onPress={handleChangeSection} style={styles.settingsBtn}>
              <Ionicons name="options-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerInfo}>
            <StatusBadge
              status={metrics.totalItems === 0 ? 'Free' : 'In Sprint'}
              intensity={metrics.intensity as 'High' | 'Moderate' | 'Low'}
            />
            <View style={styles.metricsHeaderRow}>
              <Text style={styles.metricText}>{metrics.labsCount} Lab Sprints</Text>
              <View style={styles.dot} />
              <Text style={styles.metricText}>{metrics.lecturesCount} Theoretical Sprints</Text>
            </View>
          </View>

          <Text style={styles.blessingText}>
            academic day is {intensityMessage}, <Text style={styles.accentText}>Allahu-Akbar</Text>
          </Text>
        </View>

        {/* Prominent Spiritual Section: Arabic Ayat */}
        <BlurView intensity={20} tint="dark" style={styles.quoteCard}>
          <Ionicons name="sparkles" size={20} color={theme.colors.secondary} style={styles.quoteIcon} />
          <Text style={styles.arabicText}>{quote.arabic}</Text>
          <Text style={styles.translationText}>{quote.translation}</Text>
          {quote.reference && <Text style={styles.referenceText}>{quote.reference}</Text>}
        </BlurView>

        {/* Daily Dhikr Reminder */}
        <BlurView intensity={15} tint="dark" style={styles.dhikrBox}>
          <View style={styles.dhikrHeader}>
            <Ionicons name="infinite-outline" size={16} color={theme.colors.secondary} />
            <Text style={styles.dhikrTitle}>DAILY DHIKR</Text>
          </View>
          <Text style={styles.dhikrContent}>Subhanallah ({dhikrCount})</Text>
        </BlurView>

        <MetricsCard
          lectures={metrics.lecturesCount}
          labs={metrics.labsCount}
          intensity={metrics.intensity}
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button for Modern Feel */}
      <TouchableOpacity
        style={[styles.floatingAddBtn, { bottom: 20 }]}
        onPress={() => navigation.navigate('AddEvent')}
      >
        <LinearGradient colors={['#818CF8', '#6366F1']} style={styles.fabGradient}>
          <Ionicons name="add" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: theme.spacing.lg,
    paddingTop: 80,
  },
  headerArea: {
    marginBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dayText: {
    fontSize: 42,
    fontWeight: '900',
    color: theme.colors.white,
    letterSpacing: -2,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  metricsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#CBD5E1',
    textTransform: 'uppercase',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#818CF8',
    marginHorizontal: 8,
  },
  blessingText: {
    fontSize: 15,
    color: '#A5B4FC',
    fontWeight: '600',
  },
  accentText: {
    color: '#fff',
    fontWeight: '800',
  },
  dhikrBox: {
    marginBottom: theme.spacing.xl,
    padding: 20,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dhikrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dhikrTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#818CF8',
    letterSpacing: 2,
  },
  dhikrContent: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.white,
    lineHeight: 22,
  },
  quoteCard: {
    padding: 30,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  quoteIcon: {
    marginBottom: 16,
  },
  arabicText: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 38,
  },
  translationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  referenceText: {
    fontSize: 10,
    color: theme.colors.secondary,
    marginTop: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  floatingAddBtn: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  }
})