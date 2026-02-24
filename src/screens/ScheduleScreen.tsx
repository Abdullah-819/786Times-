import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { timetable, Weekday } from '../data/timetable'
import { BlurView } from 'expo-blur'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import * as Haptics from 'expo-haptics'
import { getLectureStatus, getNotificationSeconds } from '../utils/TimeUtils'
import Animated, {
    FadeInDown,
    FadeInRight,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withRepeat,
    withTiming,
    withSequence
} from 'react-native-reanimated'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export default function ScheduleScreen({ route, navigation }: any) {
    const [section, setSection] = useState(route.params?.section || 'SP25-BSE-3-B')
    const [slotMode, setSlotMode] = useState<'free' | 'booked'>('free')
    const days: Weekday[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    const [activeDay, setActiveDay] = useState<Weekday>(days[0])

    useEffect(() => {
        const loadSettings = async () => {
            const stored = await AsyncStorage.getItem('@selected_section')
            if (stored) setSection(stored)
            const slot = await AsyncStorage.getItem('@slot_mode')
            if (slot === 'booked') setSlotMode('booked')
        }
        loadSettings()
    }, [])

    const renderLectureCard = (lecture: any, index: number) => {
        return (
            <LectureCard key={lecture.id} lecture={lecture} index={index} />
        )
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={theme.colors.gradients.professional} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Weekly Sprint</Text>
                    <Text style={styles.subtitle}>{section} ({slotMode === 'free' ? 'free slots' : 'booked slots'})</Text>
                </View>
            </View>

            <View style={styles.daySelectorWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayScroll}>
                    {days.map((day) => (
                        <TouchableOpacity
                            key={day}
                            onPress={() => setActiveDay(day)}
                            style={[styles.dayBtn, activeDay === day && styles.dayBtnActive]}
                        >
                            <Text style={[styles.dayBtnText, activeDay === day && styles.dayBtnTextActive]}>
                                {day.substring(0, 3)}
                            </Text>
                            {activeDay === day && (
                                <Animated.View entering={FadeInRight} style={styles.dot} />
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View key={activeDay} entering={FadeInRight.duration(400)}>
                    {timetable[section]?.[activeDay]?.length > 0 ? (
                        timetable[section][activeDay].map((lecture, idx) => renderLectureCard(lecture, idx))
                    ) : (
                        <View style={styles.emptyState}>
                            <Ionicons name="cafe-outline" size={60} color="rgba(255,255,255,0.1)" />
                            <Text style={styles.noClasses}>No classes today. Take a breath.</Text>
                        </View>
                    )}
                </Animated.View>
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    )
}

function LectureCard({ lecture, index }: any) {
    const scale = useSharedValue(1)
    const opacity = useSharedValue(1)
    const [status, setStatus] = useState(getLectureStatus(lecture.start, lecture.end))
    const [isReminderSet, setIsReminderSet] = useState(false)

    const progressWidth = useSharedValue(status.progress * 100)

    useEffect(() => {
        const interval = setInterval(() => {
            const newStatus = getLectureStatus(lecture.start, lecture.end)
            setStatus(newStatus)
            progressWidth.value = withSpring(newStatus.progress * 100)
        }, 60000)
        return () => clearInterval(interval)
    }, [lecture])

    // Blinking effect for upcoming classes
    useEffect(() => {
        if (status.isUpcoming) {
            opacity.value = withRepeat(
                withSequence(
                    withTiming(0.4, { duration: 800 }),
                    withTiming(1, { duration: 800 })
                ),
                -1,
                true
            )
        } else {
            opacity.value = 1
        }
    }, [status.isUpcoming])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }))

    const progressStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`
    }))

    const blinkStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))

    const handlePressIn = () => { scale.value = withSpring(0.97) }
    const handlePressOut = () => { scale.value = withSpring(1) }

    const toggleReminder = async () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

        if (isReminderSet) {
            setIsReminderSet(false)
            return
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') return;

        setIsReminderSet(true)

        const secondsToAlert = getNotificationSeconds(lecture.start)

        await Notifications.scheduleNotificationAsync({
            content: {
                title: `10m Warning: ${lecture.title}`,
                body: `Starts soon at ${lecture.venue} with ${lecture.teacher}`,
                sound: true,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: Math.max(secondsToAlert, 1)
            },
        });

        if (secondsToAlert > 10) {
            Alert.alert("Reminder Set", `I'll alert you 10 minutes before ${lecture.title} starts!`)
        } else {
            Alert.alert("Reminder Set", `Class is starting soon! I'll alert you in 5 seconds.`)
        }
    }

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            layout={Layout.springify()}
            style={[
                styles.cardWrapper,
                status.isActive && styles.activeCardGlow,
                status.isCompleted && styles.completedCard
            ]}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <BlurView intensity={25} tint="dark" style={styles.lectureCard}>
                    {/* Left Accent Bar */}
                    <View style={[
                        styles.accentBar,
                        { backgroundColor: status.isCompleted ? '#10B981' : (lecture.type === 'lecture' ? '#6366F1' : '#FBBF24') }
                    ]} />

                    <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                            <View style={styles.headerLeftGroup}>
                                <View style={[styles.typeBadge, { backgroundColor: lecture.type === 'lecture' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(251, 191, 36, 0.15)' }]}>
                                    <Text style={[styles.typeText, { color: lecture.type === 'lecture' ? '#818CF8' : '#FBBF24' }]}>{lecture.type}</Text>
                                </View>
                                {status.isUpcoming ? (
                                    <Animated.View style={[styles.statusBadge, styles.statusBadgeUpcoming, blinkStyle]}>
                                        <View style={[styles.statusDot, { backgroundColor: '#EAB308' }]} />
                                        <Text style={[styles.statusLabel, { color: '#EAB308' }]}>{status.label}</Text>
                                    </Animated.View>
                                ) : (
                                    <View style={[
                                        styles.statusBadge,
                                        status.isActive && styles.statusBadgeActive,
                                        status.isCompleted && styles.statusBadgeCompleted
                                    ]}>
                                        <View style={[styles.statusDot, { backgroundColor: status.isActive ? '#10B981' : (status.isCompleted ? '#10B981' : '#94A3B8') }]} />
                                        <Text style={[styles.statusLabel, status.isCompleted && { color: '#10B981' }]}>{status.label}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.slotBadge}>
                                <Ionicons name="flash-outline" size={12} color={theme.colors.secondary} />
                                <Text style={styles.slotText}>{lecture.slot || 'N/A'}</Text>
                            </View>
                        </View>

                        <Text style={styles.lectureTitle}>{lecture.title}</Text>

                        <View style={styles.infoRow}>
                            <View style={styles.instructorBox}>
                                <View style={styles.miniIcon}>
                                    <Ionicons name="person" size={12} color="#fff" />
                                </View>
                                <Text style={styles.infoText} numberOfLines={1}>{lecture.teacher}</Text>
                            </View>
                            <View style={styles.venueBox}>
                                <Ionicons name="location-outline" size={14} color="#94A3B8" />
                                <Text style={styles.infoText}>{lecture.venue}</Text>
                            </View>
                        </View>

                        {/* Animated Progress Bar (Only show if active) */}
                        {status.isActive && (
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBarBg}>
                                    <Animated.View
                                        style={[
                                            styles.progressBarFill,
                                            progressStyle
                                        ]}
                                    />
                                </View>
                            </View>
                        )}

                        <View style={styles.divider} />

                        <View style={styles.cardFooter}>
                            <View style={styles.timeCluster}>
                                <Text style={styles.timeLabel}>SESSION</Text>
                                <View style={styles.timeValues}>
                                    <Text style={styles.timeMain}>{lecture.start}</Text>
                                    <View style={styles.timeConnector} />
                                    <Text style={styles.timeMain}>{lecture.end}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.bellBtn}
                                onPress={toggleReminder}
                            >
                                <LinearGradient
                                    colors={isReminderSet ? ['#10B981', '#059669'] : ['#6366F1', '#4F46E5']}
                                    style={styles.bellGradient}
                                >
                                    <Ionicons
                                        name={isReminderSet ? "notifications" : "notifications-outline"}
                                        size={18}
                                        color="#fff"
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </TouchableOpacity>
        </Animated.View>
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
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: theme.colors.white,
        letterSpacing: -1.5,
    },
    subtitle: {
        fontSize: 10,
        fontWeight: '800',
        color: '#818CF8',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    daySelectorWrapper: {
        marginBottom: 20,
    },
    dayScroll: {
        paddingHorizontal: theme.spacing.lg,
        gap: 12,
    },
    dayBtn: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dayBtnActive: {
        backgroundColor: '#6366F1',
        borderColor: '#818CF8',
    },
    dayBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#A5B4FC',
        textTransform: 'uppercase',
    },
    dayBtnTextActive: {
        color: '#fff',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: theme.spacing.lg,
    },
    cardWrapper: {
        marginBottom: 20,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        backgroundColor: '#0F172A',
    },
    activeCardGlow: {
        borderColor: 'rgba(99, 102, 241, 0.4)',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    completedCard: {
        borderColor: 'rgba(16, 185, 129, 0.2)',
        opacity: 0.7,
    },
    lectureCard: {
        flexDirection: 'row',
    },
    accentBar: {
        width: 6,
    },
    cardContent: {
        flex: 1,
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerLeftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    typeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusBadgeActive: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    statusBadgeUpcoming: {
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(234, 179, 8, 0.3)',
    },
    statusBadgeCompleted: {
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusLabel: {
        fontSize: 9,
        fontWeight: '800',
        color: '#CBD5E1',
        textTransform: 'uppercase',
    },
    typeText: {
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    slotBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    slotText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#64748B',
    },
    lectureTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -0.5,
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 12,
    },
    instructorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    miniIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    venueBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8',
    },
    progressContainer: {
        marginBottom: 16,
    },
    progressBarBg: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#6366F1',
        borderRadius: 2,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeCluster: {
        gap: 4,
    },
    timeLabel: {
        fontSize: 8,
        fontWeight: '900',
        color: '#6366F1',
        letterSpacing: 1.5,
    },
    timeValues: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    timeMain: {
        fontSize: 14,
        fontWeight: '900',
        color: '#fff',
    },
    timeConnector: {
        width: 6,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 1,
    },
    bellBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        overflow: 'hidden',
    },
    bellGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyState: {
        paddingVertical: 60,
        alignItems: 'center',
        gap: 16,
    },
    noClasses: {
        fontSize: 16,
        color: '#64748B',
        fontWeight: '700',
        textAlign: 'center',
    }
})
