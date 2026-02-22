import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { timetable, Weekday } from '../data/timetable'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown, FadeInRight, Layout, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }))

    const handlePressIn = () => { scale.value = withSpring(0.97) }
    const handlePressOut = () => { scale.value = withSpring(1) }

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            layout={Layout.springify()}
            style={styles.cardWrapper}
        >
            <TouchableOpacity activeOpacity={0.9}>
                <BlurView intensity={25} tint="dark" style={styles.lectureCard}>
                    {/* Left Accent Bar */}
                    <View style={[
                        styles.accentBar,
                        { backgroundColor: lecture.type === 'lecture' ? '#6366F1' : '#FBBF24' }
                    ]} />

                    <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.typeBadge, { backgroundColor: lecture.type === 'lecture' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(251, 191, 36, 0.15)' }]}>
                                <Text style={[styles.typeText, { color: lecture.type === 'lecture' ? '#818CF8' : '#FBBF24' }]}>{lecture.type}</Text>
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

                            <TouchableOpacity style={styles.bellBtn}>
                                <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.bellGradient}>
                                    <Ionicons name="notifications" size={18} color="#fff" />
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
    lectureCard: {
        flexDirection: 'row',
        padding: 0, // Controlled by content
    },
    accentBar: {
        width: 6,
        height: '100%',
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
    typeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    slotBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    slotText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
    },
    lectureTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    instructorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    miniIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
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
        color: '#CBD5E1',
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
        fontSize: 15,
        fontWeight: '900',
        color: '#fff',
    },
    timeConnector: {
        width: 8,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 1,
    },
    bellBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
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
