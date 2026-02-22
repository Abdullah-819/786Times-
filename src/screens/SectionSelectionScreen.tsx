import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
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
    withDelay,
    interpolate,
    interpolateColor
} from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { INTRO_AYATS, Quote } from '../data/quotes'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
            <LinearGradient colors={theme.colors.gradients.professional} style={StyleSheet.absoluteFill} />

            <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={styles.content}
            >
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Choose Your Path</Text>
                    <Text style={styles.tagline}>Select your academic section to continue</Text>
                </View>

                <View style={styles.grid}>
                    <SectionCard
                        title="Software Engineering"
                        sub="SP25-BSE-3-B"
                        icon="code-working"
                        color="#6366F1"
                        onPress={() => handleSelect(SECTIONS.BSE)}
                        index={0}
                        fullWidth
                    />
                    <SectionCard
                        title="Computer Science (E)"
                        sub="FA24-BCS-4-E"
                        icon="terminal"
                        color="#EC4899"
                        onPress={() => handleSelect(SECTIONS.BCS)}
                        index={1}
                        fullWidth
                    />
                    <SectionCard
                        title="Computer Science (F)"
                        sub="FA24-BCS-4-F"
                        icon="laptop"
                        color="#22C55E"
                        onPress={() => handleSelect(SECTIONS.BCS_ALT)}
                        index={2}
                        fullWidth
                    />
                </View>

                {/* Navigation to Slot Explorer */}
                <Animated.View
                    entering={FadeInUp.delay(1000).springify()}
                    style={styles.viewSlotsWrapper}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('SlotViewing')}
                        style={styles.exploreBtn}
                    >
                        <BlurView intensity={20} tint="light" style={styles.exploreBtnContent}>
                            <View style={styles.exploreIconBox}>
                                <Ionicons name="grid-outline" size={24} color="#EAB308" />
                            </View>
                            <View>
                                <Text style={styles.exploreTitle}>University Slot Explorer</Text>
                                <Text style={styles.exploreSub}>View free & booked venues</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.4)" style={{ marginLeft: 'auto' }} />
                        </BlurView>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            <Animated.View
                entering={FadeInUp.delay(1200)}
                style={styles.footer}
            >
                <Text style={styles.footerText}>786Times • Built by Abdullah Imran</Text>
            </Animated.View>
        </View>
    )
}

function SectionCard({ title, sub, icon, color, onPress, index, fullWidth }: any) {
    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }))

    const handlePressIn = () => { scale.value = withSpring(0.96) }
    const handlePressOut = () => { scale.value = withSpring(1) }

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 150 + 400).springify().damping(12)}
            style={[
                styles.cardWrapper,
                animatedStyle,
                fullWidth ? styles.fullWidth : styles.halfWidth
            ]}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
            >
                <BlurView intensity={30} tint="light" style={styles.card}>
                    <LinearGradient
                        colors={[`${color}40`, 'transparent']}
                        style={StyleSheet.absoluteFill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    />

                    <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
                        <Ionicons name={icon} size={30} color={color} />
                    </View>

                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <Text style={styles.cardSub}>{sub}</Text>
                    </View>

                    <View style={styles.arrowBox}>
                        <Ionicons name="arrow-forward" size={20} color={color} />
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
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: height * 0.08,
    },
    header: {
        marginBottom: 32,
    },
    welcomeText: {
        fontSize: 44,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -1.5,
        lineHeight: 48,
        marginBottom: 8,
    },
    tagline: {
        fontSize: 18,
        color: '#A5B4FC',
        fontWeight: '600',
        opacity: 0.9,
    },
    grid: {
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    fullWidth: {
        width: '100%',
    },
    halfWidth: {
        flex: 1,
    },
    cardWrapper: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.15)',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    iconBox: {
        width: 60,
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    cardHeader: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 4,
    },
    cardSub: {
        fontSize: 14,
        fontWeight: '700',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    arrowBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewSlotsWrapper: {
        marginTop: 32,
    },
    exploreBtn: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(234, 179, 8, 0.3)', // Gold border
    },
    exploreBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(234, 179, 8, 0.05)',
    },
    exploreIconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    exploreTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
    },
    exploreSub: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        fontWeight: '600',
    },
    footer: {
        paddingBottom: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.3)',
        fontWeight: '700',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
})
