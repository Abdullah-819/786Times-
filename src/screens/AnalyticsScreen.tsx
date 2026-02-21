import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { useTodaySchedule } from '../hooks/useTodaySchedule'
import { timetable } from '../data/timetable'
import { BlurView } from 'expo-blur'

export default function AnalyticsScreen({ navigation }: any) {
    const { metrics } = useTodaySchedule()
    const section = metrics.currentSection

    // Calculate semester stats
    const weeklyStats = Object.values(timetable[section] || {}).reduce((acc, day) => {
        day.forEach(l => {
            if (l.type === 'lecture') acc.lectures++
            else if (l.type === 'lab') acc.labs++
        })
        return acc
    }, { lectures: 0, labs: 0 })

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1E1B4B', '#111827']} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <Text style={styles.title}>Semester Insights</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <BlurView intensity={20} tint="dark" style={styles.mainCard}>
                    <Text style={styles.cardLabel}>WEEKLY COMMITMENT</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{weeklyStats.lectures + weeklyStats.labs}</Text>
                            <Text style={styles.statLabel}>Total Sprints</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{weeklyStats.labs}</Text>
                            <Text style={styles.statLabel}>Hands-on Labs</Text>
                        </View>
                    </View>
                </BlurView>

                <Text style={styles.sectionTitle}>LOAD DISTRIBUTION</Text>
                {Object.entries(timetable[section] || {}).map(([day, lectures]) => (
                    <View key={day} style={styles.dayRow}>
                        <Text style={styles.dayName}>{day}</Text>
                        <View style={styles.barContainer}>
                            <View style={[styles.bar, { width: `${(lectures.length / 8) * 100}%` }]} />
                        </View>
                        <Text style={styles.dayCount}>{lectures.length} pts</Text>
                    </View>
                ))}

                <BlurView intensity={10} tint="light" style={styles.tipCard}>
                    <Ionicons name="bulb-outline" size={20} color="#FBBF24" />
                    <Text style={styles.tipText}>Typically, Wednesdays are your most intense sprint days. Prepare ahead!</Text>
                </BlurView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: theme.colors.white,
        letterSpacing: -1,
    },
    content: {
        padding: theme.spacing.lg,
    },
    mainCard: {
        padding: 24,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        marginBottom: 32,
    },
    cardLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#818CF8',
        letterSpacing: 2,
        marginBottom: 20,
        textAlign: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statBox: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 32,
        fontWeight: '900',
        color: theme.colors.white,
    },
    statLabel: {
        fontSize: 12,
        color: '#A5B4FC',
        fontWeight: '600',
        marginTop: 4,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#6366F1',
        letterSpacing: 2,
        marginBottom: 20,
    },
    dayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    dayName: {
        width: 90,
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.white,
        textTransform: 'capitalize',
    },
    barContainer: {
        flex: 1,
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#6366F1',
    },
    dayCount: {
        width: 40,
        fontSize: 12,
        fontWeight: '800',
        color: '#818CF8',
        textAlign: 'right',
    },
    tipCard: {
        marginTop: 40,
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        overflow: 'hidden',
    },
    tipText: {
        flex: 1,
        color: '#CBD5E1',
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 18,
    }
})
