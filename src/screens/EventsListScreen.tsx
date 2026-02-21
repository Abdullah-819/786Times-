import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { getEvents, deleteEvent } from '../storage/eventStore'
import { useState, useEffect } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown, Layout } from 'react-native-reanimated'
import { Event } from '../types/Event'

export default function EventsListScreen({ navigation }: any) {
    const [events, setEvents] = useState<Event[]>([])

    const loadEvents = async () => {
        const data = await getEvents()
        setEvents(data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadEvents)
        return unsubscribe
    }, [navigation])

    const handleDelete = (id: string) => {
        Alert.alert('Delete Event', 'Are you sure you want to remove this event?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await deleteEvent(id)
                    loadEvents()
                }
            }
        ])
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'midterm': return 'document-text-outline'
            case 'assignment': return 'create-outline'
            case 'quiz': return 'help-circle-outline'
            default: return 'bookmark-outline'
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={theme.colors.gradients.professional} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <Text style={styles.title}>Your Events</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <Animated.View
                            key={event.id}
                            entering={FadeInDown.delay(index * 100)}
                            layout={Layout.springify()}
                            style={styles.cardWrapper}
                        >
                            <BlurView intensity={20} tint="light" style={styles.card}>
                                <View style={styles.cardInfo}>
                                    <View style={styles.iconBox}>
                                        <Ionicons name={getIcon(event.type)} size={24} color="#818CF8" />
                                    </View>
                                    <View style={styles.textDetails}>
                                        <Text style={styles.eventTitle}>{event.title}</Text>
                                        <Text style={styles.eventDate}>
                                            <Ionicons name="calendar-outline" size={12} color="#94A3B8" /> {event.date}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => handleDelete(event.id)} style={styles.deleteBtn}>
                                    <Ionicons name="trash-outline" size={20} color="#F87171" />
                                </TouchableOpacity>
                            </BlurView>
                        </Animated.View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="calendar-outline" size={60} color="rgba(255,255,255,0.05)" />
                        <Text style={styles.emptyText}>No events yet. Start by adding one!</Text>
                    </View>
                )}
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
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: theme.colors.white,
        letterSpacing: -1,
    },
    content: {
        padding: theme.spacing.lg,
    },
    cardWrapper: {
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    card: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flex: 1,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDetails: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.white,
        marginBottom: 4,
    },
    eventDate: {
        fontSize: 12,
        fontWeight: '600',
        color: '#94A3B8',
    },
    deleteBtn: {
        padding: 8,
    },
    emptyState: {
        paddingTop: 100,
        alignItems: 'center',
        gap: 20,
    },
    emptyText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.2)',
        fontWeight: '600',
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 64,
        height: 64,
        borderRadius: 32,
        elevation: 10,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    fabGradient: {
        flex: 1,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
