import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInDown, FadeInUp, useSharedValue, useAnimatedStyle, withSpring, interpolateColor, interpolate } from 'react-native-reanimated'
import { theme } from '../theme'
import { VENUE_OCCUPANCY } from '../data/venues'

const { width, height } = Dimensions.get('window')
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as const

export default function SlotViewingScreen({ navigation }: any) {
    const [selectedDay, setSelectedDay] = useState<string>('monday')
    const [mode, setMode] = useState<'free' | 'booked'>('free')
    const [expandedSlot, setExpandedSlot] = useState<number | null>(null)

    const toggleValue = useSharedValue(0)

    const toggleMode = () => {
        const newMode = mode === 'free' ? 'booked' : 'free'
        setMode(newMode)
        toggleValue.value = withSpring(newMode === 'free' ? 0 : 1, { damping: 15 })
    }

    const toggleThumbStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: interpolate(toggleValue.value, [0, 1], [4, 32]) }],
        backgroundColor: interpolateColor(toggleValue.value, [0, 1], ['#22C55E', '#EF4444'])
    }))

    const toggleBgStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(toggleValue.value, [0, 1], ['rgba(34, 197, 94, 0.1)', 'rgba(239, 68, 68, 0.1)']),
        borderColor: interpolateColor(toggleValue.value, [0, 1], ['rgba(34, 197, 94, 0.4)', 'rgba(239, 68, 68, 0.4)'])
    }))

    return (
        <View style={styles.container}>
            <LinearGradient colors={theme.colors.gradients.professional} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>University Slots</Text>
                    <Text style={styles.headerSub}>Venue Explorer</Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={toggleMode}
                    style={styles.modeToggle}
                >
                    <Animated.View style={[styles.toggleTrack, toggleBgStyle]}>
                        <Animated.View style={[styles.toggleThumb, toggleThumbStyle]}>
                            <Ionicons name={mode === 'free' ? 'eye' : 'eye-off'} size={14} color="#fff" />
                        </Animated.View>
                    </Animated.View>
                    <Text style={[styles.modeLabel, { color: mode === 'free' ? '#22C55E' : '#EF4444' }]}>
                        {mode.toUpperCase()}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.daySelectorWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daySelector}>
                    {DAYS.map((day) => (
                        <TouchableOpacity
                            key={day}
                            onPress={() => {
                                setSelectedDay(day)
                                setExpandedSlot(null)
                            }}
                            style={[styles.dayItem, selectedDay === day && styles.dayItemActive]}
                        >
                            <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>
                                {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {VENUE_OCCUPANCY[selectedDay]?.map((slotData, index) => (
                    <SlotCard
                        key={index}
                        data={slotData}
                        mode={mode}
                        expanded={expandedSlot === index}
                        onToggle={() => setExpandedSlot(expandedSlot === index ? null : index)}
                        index={index}
                    />
                ))}
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    )
}

function SlotCard({ data, mode, expanded, onToggle, index }: any) {
    const venues = mode === 'free' ? data.free : data.booked
    const color = mode === 'free' ? '#22C55E' : '#EF4444'

    return (
        <Animated.View entering={FadeInDown.delay(index * 100).springify().damping(12)}>
            <TouchableOpacity activeOpacity={0.9} onPress={onToggle} style={styles.cardWrapper}>
                <BlurView intensity={20} tint="light" style={styles.card}>
                    <View style={styles.cardInfo}>
                        <View style={[styles.slotBadge, { backgroundColor: `${color}20`, borderColor: `${color}40` }]}>
                            <Text style={[styles.slotBadgeText, { color }]}>{data.slot}</Text>
                        </View>
                        <Text style={styles.timeText}>{data.time}</Text>
                    </View>

                    <View style={styles.stats}>
                        <Text style={styles.countText}>{venues.length}</Text>
                        <Text style={styles.countLabel}>Venues</Text>
                    </View>

                    <Ionicons
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="rgba(255,255,255,0.3)"
                    />
                </BlurView>

                {expanded && (
                    <Animated.View entering={FadeInUp.duration(300)} style={styles.expandedContent}>
                        <View style={styles.venueGrid}>
                            {venues.map((v: string) => (
                                <View key={v} style={styles.venueBadge}>
                                    <Text style={styles.venueText}>{v}</Text>
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                )}
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff',
    },
    headerSub: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    modeToggle: {
        marginLeft: 'auto',
        alignItems: 'center',
    },
    toggleTrack: {
        width: 64,
        height: 36,
        borderRadius: 18,
        borderWidth: 1.5,
        padding: 2,
    },
    toggleThumb: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    modeLabel: {
        fontSize: 10,
        fontWeight: '900',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    daySelectorWrapper: {
        paddingVertical: 10,
    },
    daySelector: {
        paddingHorizontal: 24,
        gap: 12,
    },
    dayItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    dayItemActive: {
        backgroundColor: '#EAB308',
        borderColor: '#EAB308',
    },
    dayText: {
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '800',
        fontSize: 14,
    },
    dayTextActive: {
        color: '#002E5D',
    },
    content: {
        padding: 24,
        gap: 16,
    },
    cardWrapper: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    cardInfo: {
        flex: 1,
    },
    slotBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 6,
    },
    slotBadgeText: {
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    timeText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#fff',
    },
    stats: {
        alignItems: 'center',
        marginRight: 20,
    },
    countText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff',
    },
    countLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
        fontWeight: '700',
    },
    expandedContent: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    venueGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    venueBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        minWidth: 50,
        alignItems: 'center',
    },
    venueText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
})
