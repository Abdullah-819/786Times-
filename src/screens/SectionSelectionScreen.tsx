import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Platform, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../theme'
import { saveSection } from '../storage/sectionStore'
import { SECTIONS, Section } from '../data/timetable'
import { useEffect, useState } from 'react'
import Animated, {
    FadeIn,
    FadeOut,
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { INTRO_AYATS, Quote } from '../data/quotes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as WebBrowser from 'expo-web-browser'

const { width, height } = Dimensions.get('window')

export default function SectionSelectionScreen({ navigation }: any) {
    const [showIntro, setShowIntro] = useState(true)
    const [currentAyat, setCurrentAyat] = useState<Quote>(INTRO_AYATS[0])

    useEffect(() => {
        const prepareIntro = async () => {
            try {
                const lastIndexStr = await AsyncStorage.getItem('@intro_index')
                let nextIndex = 0
                if (lastIndexStr !== null) {
                    nextIndex = (parseInt(lastIndexStr) + 1) % INTRO_AYATS.length
                }
                setCurrentAyat(INTRO_AYATS[nextIndex])
                await AsyncStorage.setItem('@intro_index', nextIndex.toString())
            } catch (e) {
                console.error("Error cycling intro ayats", e)
            }
        }

        prepareIntro()

        const timer = setTimeout(() => {
            setShowIntro(false)
        }, 3500)
        return () => clearTimeout(timer)
    }, [])

    const handleSelect = async (section: Section) => {
        await saveSection(section)
        navigation.replace('Main')
    }

    if (showIntro) {
        return (
            <View style={styles.introContainer}>
                <LinearGradient colors={['#0F172A', '#1E1B4B', '#0F172A']} style={StyleSheet.absoluteFill} />

                <Animated.View
                    entering={FadeIn.duration(1000)}
                    exiting={FadeOut.duration(800)}
                    style={styles.introContent}
                >
                    <Text style={styles.arabicAyat}>{currentAyat.arabic}</Text>
                    <Animated.Text
                        entering={FadeInUp.delay(500).duration(1000)}
                        style={styles.introTranslation}
                    >
                        "{currentAyat.translation}"
                    </Animated.Text>
                    <Animated.View
                        entering={FadeIn.delay(1200)}
                        style={styles.introBadge}
                    >
                        <Text style={styles.introBadgeText}>{currentAyat.reference}</Text>
                    </Animated.View>
                </Animated.View>

                <View style={styles.loaderContainer}>
                    <Animated.View
                        entering={FadeIn.delay(1500)}
                        style={styles.loadingLine}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={theme.colors.gradients.professional} style={StyleSheet.absoluteFill} />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View
                    entering={FadeInDown.duration(800)}
                    style={styles.header}
                >
                    <Text style={styles.headerTitle}>Academic Hub</Text>
                    <Text style={styles.headerSub}>Select your destination to proceed</Text>
                </Animated.View>

                <View style={styles.cardContainer}>
                    <DashboardCard
                        title="Software Engineering (3B)"
                        sub="SP25-BSE-3-B • Timetable"
                        icon="code-slash-outline"
                        color="#3B82F6"
                        onPress={() => handleSelect(SECTIONS.BSE)}
                        index={0}
                    />
                    <DashboardCard
                        title="Computer Science (4E)"
                        sub="FA24-BCS-4-E • Timetable"
                        icon="terminal-outline"
                        color="#EF4444"
                        onPress={() => handleSelect(SECTIONS.BCS)}
                        index={1}
                    />
                    <DashboardCard
                        title="Computer Science (4F)"
                        sub="FA24-BCS-4-F • Timetable"
                        icon="laptop-outline"
                        color="#22C55E"
                        onPress={() => handleSelect(SECTIONS.BCS_ALT)}
                        index={2}
                    />
                    <DashboardCard
                        title="Computer Science (6E)"
                        sub="FA23-BCS-6-E • Timetable"
                        icon="rocket-outline"
                        color="#EC4899"
                        onPress={() => handleSelect(SECTIONS.BCS_6E)}
                        index={3}
                    />
                    <DashboardCard
                        title="Student Portal"
                        sub="CUI SAHIWAL"
                        icon="globe-outline"
                        color="#F59E0B"
                        onPress={() => WebBrowser.openBrowserAsync('https://swl-sis.comsats.edu.pk/Login')}
                        index={4}
                    />
                    <DashboardCard
                        title="Slot Explorer"
                        sub="Find free & booked venues"
                        icon="grid-outline"
                        color="#8B5CF6"
                        onPress={() => navigation.navigate('SlotViewing')}
                        index={5}
                    />
                    <DashboardCard
                        title="About 786 Times"
                        sub="The Team & The Mission"
                        icon="people-outline"
                        color="#64748B"
                        onPress={() => navigation.navigate('About')}
                        index={6}
                    />
                </View>

                <Text style={styles.footerText}>786Times • Built by Abdullah Imran</Text>
            </ScrollView>
        </View>
    )
}

function DashboardCard({ title, sub, icon, color, onPress, index }: any) {
    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }))

    const handlePressIn = () => { scale.value = withSpring(0.95) }
    const handlePressOut = () => { scale.value = withSpring(1) }

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100 + 400).springify()}
            style={[styles.cardWrapper, animatedStyle]}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={[styles.card, { backgroundColor: color }]}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardSub}>{sub}</Text>
                </View>

                <View style={styles.cardIconWrapper}>
                    <Ionicons name={icon} size={84} color="rgba(255,255,255,0.2)" />
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 80 : 60,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 32,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    headerSub: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '600',
        marginTop: 4,
    },
    cardContainer: {
        gap: 16,
    },
    cardWrapper: {
        width: '100%',
        height: 120,
        borderRadius: 24,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    card: {
        flex: 1,
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    cardContent: {
        flex: 1,
        zIndex: 1,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: -0.2,
    },
    cardSub: {
        fontSize: 13,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.85)',
        marginTop: 4,
    },
    cardIconWrapper: {
        position: 'absolute',
        right: -10,
        bottom: -20,
    },
    introContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    introContent: {
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    arabicAyat: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 50,
    },
    introTranslation: {
        fontSize: 16,
        color: '#94A3B8',
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 24,
    },
    introBadge: {
        marginTop: 30,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.2)',
    },
    introBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#818CF8',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    loaderContainer: {
        position: 'absolute',
        bottom: 100,
        width: width * 0.4,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 1,
        overflow: 'hidden',
    },
    loadingLine: {
        width: '100%',
        height: '100%',
        backgroundColor: '#6366F1',
    },
    footerText: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '700',
        letterSpacing: 2,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 40,
    },
});
