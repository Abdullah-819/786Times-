import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

export default function AboutScreen({ navigation }: any) {
    const openLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err))
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1E1B4B', '#111827']} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <Text style={styles.title}>Developer</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.delay(100).springify()}>
                    <BlurView intensity={20} tint="light" style={styles.card}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.1)', 'transparent']}
                            style={StyleSheet.absoluteFill}
                        />

                        <View style={styles.avatarContainer}>
                            <LinearGradient colors={['#6366F1', '#A855F7']} style={styles.avatarGradient}>
                                <Text style={styles.avatarText}>AI</Text>
                            </LinearGradient>
                        </View>

                        <Text style={styles.name}>Abdullah Imran</Text>
                        <Text style={styles.tagline}>CS Student & Software Architect</Text>

                        <View style={styles.divider} />

                        <Text style={styles.sectionTitle}>ABOUT ME</Text>
                        <Text style={styles.description}>
                            I’m Abdullah Imran, a Computer Science student working on real,
                            semester-grade software projects with a strong focus on correctness,
                            architecture, and long-term maintainability.
                        </Text>

                        <View style={styles.divider} />

                        <Text style={styles.sectionTitle}>ABOUT 786TIMES</Text>
                        <Text style={styles.description}>
                            786Times is a spiritually grounded academic assistant designed to
                            streamline your university life. It combines high-performance
                            scheduling with daily spiritual reminders to help you maintain balance.
                        </Text>
                        <Text style={[styles.description, { marginTop: 12 }]}>
                            Built with React Native and Reanimated, it features ultra-realistic
                            timetable management, real-time metrics, and a dynamic Quranic intro
                            system to keep you inspired every day.
                        </Text>

                        <View style={styles.divider} />

                        <Text style={styles.sectionTitle}>CONNECT</Text>
                        <View style={styles.linkGrid}>
                            <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/in/abdullah-imran-835483327/')} style={styles.linkBtn}>
                                <Ionicons name="logo-linkedin" size={20} color="#0077B5" />
                                <Text style={styles.linkText}>LinkedIn</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => openLink('https://github.com/Abdullah-819')} style={styles.linkBtn}>
                                <Ionicons name="logo-github" size={20} color="#fff" />
                                <Text style={styles.linkText}>GitHub</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => openLink('mailto:ranaabdullah228.ar1@gmail.com')} style={styles.linkBtn}>
                                <Ionicons name="mail-outline" size={20} color="#EF4444" />
                                <Text style={styles.linkText}>Email</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </Animated.View>
                <View style={{ height: 40 }} />
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
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: theme.colors.white,
        letterSpacing: -1,
    },
    scrollContent: {
        padding: theme.spacing.lg,
    },
    card: {
        padding: 30,
        borderRadius: 35,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
    },
    avatarContainer: {
        marginBottom: 20,
        elevation: 10,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
    },
    avatarGradient: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '900',
    },
    name: {
        fontSize: 26,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    tagline: {
        fontSize: 14,
        fontWeight: '700',
        color: '#818CF8',
        marginBottom: 24,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    divider: {
        width: width * 0.5,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#CBD5E1',
        letterSpacing: 2,
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    description: {
        fontSize: 15,
        fontWeight: '600',
        color: '#94A3B8',
        lineHeight: 22,
        alignSelf: 'flex-start',
    },
    linkGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
    },
    linkBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    linkText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '700',
    }
})
